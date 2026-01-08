import { db } from "../shared/db";
import {
  users,
  sessions,
  activityLogs,
  type User,
  type SafeUser,
} from "../shared/schema";
import { eq } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// ===== PASSWORD HASHING =====
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(
  password: string,
  hashedPassword: string
): boolean {
  const [salt, hash] = hashedPassword.split(":");
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === verifyHash;
}

// ===== SESSION MANAGEMENT =====
export function generateSessionId(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: string): Promise<string> {
  const sessionId = generateSessionId();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });

  return sessionId;
}

export async function getSessionUser(
  sessionId: string
): Promise<SafeUser | null> {
  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId));

  if (!user || !user.isActive) {
    return null;
  }

  // Return user without password
  const { password, ...safeUser } = user;
  return safeUser as SafeUser;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

// ===== ACTIVITY LOGGING =====
export async function logActivity(
  userId: string,
  action: string,
  entityType?: string,
  entityId?: string,
  details?: any,
  req?: Request
) {
  await db.insert(activityLogs).values({
    userId,
    action,
    entityType,
    entityId,
    details: details ? JSON.stringify(details) : null,
    ipAddress: req?.ip || null,
    userAgent: req?.get("user-agent") || null,
  });
}

// ===== MIDDLEWARE =====
// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
      sessionId?: string;
    }
  }
}

// Authentication middleware
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.cookies?.sessionId || req.headers["x-session-id"];

  if (!sessionId) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const user = await getSessionUser(sessionId);

  if (!user) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }

  req.user = user;
  req.sessionId = sessionId;
  next();
}

// Admin-only middleware
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
}

// Optional auth (user data if available, but not required)
export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.cookies?.sessionId || req.headers["x-session-id"];

  if (sessionId) {
    const user = await getSessionUser(sessionId);
    if (user) {
      req.user = user;
      req.sessionId = sessionId;
    }
  }

  next();
}

// ===== USER UTILITIES =====
export function sanitizeUser(user: User): SafeUser {
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  return user || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user || null;
}

export async function updateLastLogin(userId: string): Promise<void> {
  await db
    .update(users)
    .set({ lastLogin: new Date() })
    .where(eq(users.id, userId));
}

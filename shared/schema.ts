import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ===== USERS TABLE (Enhanced with roles) =====
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(), // Will be hashed
  email: text("email").unique(),
  fullName: text("full_name"),
  role: text("role").notNull().default("user"), // "admin" | "user"
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users, {
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  email: z.string().email().optional(),
});

export const selectUserSchema = createSelectSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Omit password when returning user data
export type SafeUser = Omit<User, 'password'>;

// ===== SESSIONS TABLE =====
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSessionSchema = createInsertSchema(sessions);
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// ===== PONDS TABLE (with user ownership) =====
export const ponds = pgTable("ponds", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  area: text("area"),
  depth: text("depth"),
  volume: text("volume"),
  location: text("location"),
  status: text("status").default("active"), // active, inactive, maintenance
  imageUrl: text("image_url"), // For pond images
  userId: varchar("user_id").references(() => users.id).notNull(), // Owner
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPondSchema = createInsertSchema(ponds);
export const selectPondSchema = createSelectSchema(ponds);
export type InsertPond = z.infer<typeof insertPondSchema>;
export type Pond = typeof ponds.$inferSelect;

// ===== FISH TABLE =====
export const fish = pgTable("fish", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  pondId: integer("pond_id").references(() => ponds.id, { onDelete: "cascade" }).notNull(),
  species: text("species").notNull(),
  quantity: integer("quantity").notNull(),
  averageWeight: text("average_weight"),
  stockingDate: timestamp("stocking_date").notNull(),
  expectedHarvestDate: timestamp("expected_harvest_date"),
  status: text("status").default("growing"), // growing, ready, harvested
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFishSchema = createInsertSchema(fish);
export const selectFishSchema = createSelectSchema(fish);
export type InsertFish = z.infer<typeof insertFishSchema>;
export type Fish = typeof fish.$inferSelect;

// ===== WATER QUALITY TABLE =====
export const waterQuality = pgTable("water_quality", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  pondId: integer("pond_id").references(() => ponds.id, { onDelete: "cascade" }).notNull(),
  temperature: text("temperature"),
  ph: text("ph"),
  dissolvedOxygen: text("dissolved_oxygen"),
  ammonia: text("ammonia"),
  nitrite: text("nitrite"),
  nitrate: text("nitrate"),
  salinity: text("salinity"),
  turbidity: text("turbidity"),
  measurementDate: timestamp("measurement_date").defaultNow(),
  notes: text("notes"),
  recordedBy: varchar("recorded_by").references(() => users.id), // Who recorded it
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWaterQualitySchema = createInsertSchema(waterQuality);
export const selectWaterQualitySchema = createSelectSchema(waterQuality);
export type InsertWaterQuality = z.infer<typeof insertWaterQualitySchema>;
export type WaterQuality = typeof waterQuality.$inferSelect;

// ===== FEED LOGS TABLE =====
export const feedLogs = pgTable("feed_logs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  pondId: integer("pond_id").references(() => ponds.id, { onDelete: "cascade" }).notNull(),
  feedType: text("feed_type").notNull(),
  quantity: text("quantity").notNull(),
  feedingTime: timestamp("feeding_time").notNull(),
  cost: text("cost"),
  notes: text("notes"),
  userId: varchar("user_id").references(() => users.id), // Who fed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFeedLogSchema = createInsertSchema(feedLogs);
export const selectFeedLogSchema = createSelectSchema(feedLogs);
export type InsertFeedLog = z.infer<typeof insertFeedLogSchema>;
export type FeedLog = typeof feedLogs.$inferSelect;

// ===== HARVESTS TABLE =====
export const harvests = pgTable("harvests", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  pondId: integer("pond_id").references(() => ponds.id, { onDelete: "cascade" }).notNull(),
  fishId: integer("fish_id").references(() => fish.id),
  harvestDate: timestamp("harvest_date").notNull(),
  quantity: integer("quantity").notNull(),
  totalWeight: text("total_weight"),
  averageWeight: text("average_weight"),
  price: text("price"),
  totalRevenue: text("total_revenue"),
  buyer: text("buyer"),
  notes: text("notes"),
  harvestedBy: varchar("harvested_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHarvestSchema = createInsertSchema(harvests);
export const selectHarvestSchema = createSelectSchema(harvests);
export type InsertHarvest = z.infer<typeof insertHarvestSchema>;
export type Harvest = typeof harvests.$inferSelect;

// ===== ALERTS TABLE =====
export const alerts = pgTable("alerts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  pondId: integer("pond_id").references(() => ponds.id, { onDelete: "cascade" }),
  userId: varchar("user_id").references(() => users.id), // Alert for which user
  type: text("type").notNull(), // water_quality, feed, disease, weather, system
  severity: text("severity").notNull(), // low, medium, high, critical
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  isResolved: boolean("is_resolved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  resolvedBy: varchar("resolved_by").references(() => users.id),
});

export const insertAlertSchema = createInsertSchema(alerts);
export const selectAlertSchema = createSelectSchema(alerts);
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;

// ===== ACTIVITY LOGS TABLE (Audit trail) =====
export const activityLogs = pgTable("activity_logs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  action: text("action").notNull(), // login, logout, create_pond, update_fish, etc.
  entityType: text("entity_type"), // pond, fish, feed, etc.
  entityId: text("entity_id"),
  details: text("details"), // JSON string with additional info
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs);
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;

// ===== WEATHER DATA TABLE =====
export const weatherData = pgTable("weather_data", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  location: text("location").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
  temperature: text("temperature"),
  humidity: text("humidity"),
  rainfall: text("rainfall"),
  windSpeed: text("wind_speed"),
  condition: text("condition"),
  description: text("description"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

export const insertWeatherDataSchema = createInsertSchema(weatherData);
export const selectWeatherDataSchema = createSelectSchema(weatherData);
export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
export type WeatherData = typeof weatherData.$inferSelect;
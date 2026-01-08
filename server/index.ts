import dotenv from "dotenv";
dotenv.config(); // ⚠️ PHẢI ĐẶT TRƯỚC TIÊN!

import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

console.log(
  "🔑 API Key:",
  process.env.OPENWEATHERMAP_API_KEY ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "💾 Database:",
  process.env.DATABASE_URL ? "✅ Connected" : "❌ Missing"
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("❌ Error:", err);
    res.status(status).json({ message });
  });

  // Setup Vite or serve static files
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = process.env.PORT || 8080;

  server.listen(port, () => {
    console.log(`
🚀 Server running on http://localhost:${port}
📊 Environment: ${process.env.NODE_ENV || "development"}
🌐 Frontend proxy: http://localhost:5174 → http://localhost:${port}
    `);
  });
})();

import type { Express } from "express";
import { createServer } from "http";
import type { Server } from "http";
import crypto from "crypto";
import { db } from "../shared/db";
import cookieParser from "cookie-parser";
import {
  ponds,
  fish,
  feedLogs,
  waterQuality,
  harvests,
  alerts,
  users
} from "../shared/schema";
import { eq, desc } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // ===== HEALTH CHECK =====
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ===== WEATHER API =====
  app.get("/api/weather", async (req, res) => {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res
          .status(400)
          .json({ error: "Latitude and longitude are required" });
      }

      const apiKey = process.env.OPENWEATHERMAP_API_KEY;
      if (!apiKey) {
        return res
          .status(500)
          .json({ error: "Weather API key not configured" });
      }

      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`
      );

      if (!currentWeatherResponse.ok) {
        throw new Error(`Weather API error: ${currentWeatherResponse.status}`);
      }

      const currentWeather = await currentWeatherResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`
      );

      if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.status}`);
      }

      const forecast = await forecastResponse.json();

      res.json({
        current: currentWeather,
        forecast: forecast,
      });
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // ===== PONDS CRUD =====
  app.get("/api/ponds", async (req, res) => {
    try {
      const allPonds = await db
        .select()
        .from(ponds)
        .orderBy(desc(ponds.createdAt));
      res.json(allPonds);
    } catch (error) {
      console.error("Error fetching ponds:", error);
      res.status(500).json({ error: "Failed to fetch ponds" });
    }
  });

  app.post("/api/ponds", async (req, res) => {
    try {
      const [newPond] = await db.insert(ponds).values(req.body).returning();
      res.status(201).json(newPond);
    } catch (error) {
      console.error("Error creating pond:", error);
      res.status(400).json({ error: "Invalid pond data" });
    }
  });

  app.get("/api/ponds/:id", async (req, res) => {
    try {
      const [pond] = await db
        .select()
        .from(ponds)
        .where(eq(ponds.id, parseInt(req.params.id)));
      if (!pond) {
        return res.status(404).json({ error: "Pond not found" });
      }
      res.json(pond);
    } catch (error) {
      console.error("Error fetching pond:", error);
      res.status(500).json({ error: "Failed to fetch pond" });
    }
  });

  app.put("/api/ponds/:id", async (req, res) => {
    try {
      const [updatedPond] = await db
        .update(ponds)
        .set({ ...req.body, updatedAt: new Date() })
        .where(eq(ponds.id, parseInt(req.params.id)))
        .returning();

      if (!updatedPond) {
        return res.status(404).json({ error: "Pond not found" });
      }
      res.json(updatedPond);
    } catch (error) {
      console.error("Error updating pond:", error);
      res.status(400).json({ error: "Failed to update pond" });
    }
  });

  app.delete("/api/ponds/:id", async (req, res) => {
    try {
      await db.delete(ponds).where(eq(ponds.id, parseInt(req.params.id)));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting pond:", error);
      res.status(500).json({ error: "Failed to delete pond" });
    }
  });

  // ===== FISH CRUD =====
  app.get("/api/fish", async (req, res) => {
    try {
      const { pondId } = req.query;
      let query = db.select().from(fish);

      if (pondId) {
        query = query.where(eq(fish.pondId, parseInt(pondId as string)));
      }

      const allFish = await query.orderBy(desc(fish.createdAt));
      res.json(allFish);
    } catch (error) {
      console.error("Error fetching fish:", error);
      res.status(500).json({ error: "Failed to fetch fish" });
    }
  });

  app.post("/api/fish", async (req, res) => {
    try {
      const [newFish] = await db.insert(fish).values(req.body).returning();
      res.status(201).json(newFish);
    } catch (error) {
      console.error("Error creating fish:", error);
      res.status(400).json({ error: "Invalid fish data" });
    }
  });

  app.put("/api/fish/:id", async (req, res) => {
    try {
      const [updatedFish] = await db
        .update(fish)
        .set({ ...req.body, updatedAt: new Date() })
        .where(eq(fish.id, parseInt(req.params.id)))
        .returning();

      if (!updatedFish) {
        return res.status(404).json({ error: "Fish not found" });
      }
      res.json(updatedFish);
    } catch (error) {
      console.error("Error updating fish:", error);
      res.status(400).json({ error: "Failed to update fish" });
    }
  });

  app.delete("/api/fish/:id", async (req, res) => {
    try {
      await db.delete(fish).where(eq(fish.id, parseInt(req.params.id)));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting fish:", error);
      res.status(500).json({ error: "Failed to delete fish" });
    }
  });

  // ===== FEED LOGS CRUD =====
  app.get("/api/feed-logs", async (req, res) => {
    try {
      const { pondId } = req.query;
      let query = db.select().from(feedLogs);

      if (pondId) {
        query = query.where(eq(feedLogs.pondId, parseInt(pondId as string)));
      }

      const logs = await query.orderBy(desc(feedLogs.feedingTime));
      res.json(logs);
    } catch (error) {
      console.error("Error fetching feed logs:", error);
      res.status(500).json({ error: "Failed to fetch feed logs" });
    }
  });

  app.post("/api/feed-logs", async (req, res) => {
    try {
      const [newLog] = await db.insert(feedLogs).values(req.body).returning();
      res.status(201).json(newLog);
    } catch (error) {
      console.error("Error creating feed log:", error);
      res.status(400).json({ error: "Invalid feed log data" });
    }
  });

  app.delete("/api/feed-logs/:id", async (req, res) => {
    try {
      await db.delete(feedLogs).where(eq(feedLogs.id, parseInt(req.params.id)));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting feed log:", error);
      res.status(500).json({ error: "Failed to delete feed log" });
    }
  });

  // ===== WATER QUALITY CRUD =====
  app.get("/api/water-quality", async (req, res) => {
    try {
      const { pondId } = req.query;
      let query = db.select().from(waterQuality);

      if (pondId) {
        query = query.where(
          eq(waterQuality.pondId, parseInt(pondId as string))
        );
      }

      const measurements = await query.orderBy(
        desc(waterQuality.measurementDate)
      );
      res.json(measurements);
    } catch (error) {
      console.error("Error fetching water quality:", error);
      res.status(500).json({ error: "Failed to fetch water quality data" });
    }
  });

  app.post("/api/water-quality", async (req, res) => {
    try {
      const [newMeasurement] = await db
        .insert(waterQuality)
        .values(req.body)
        .returning();
      res.status(201).json(newMeasurement);
    } catch (error) {
      console.error("Error creating water quality measurement:", error);
      res.status(400).json({ error: "Invalid water quality data" });
    }
  });

  app.delete("/api/water-quality/:id", async (req, res) => {
    try {
      await db
        .delete(waterQuality)
        .where(eq(waterQuality.id, parseInt(req.params.id)));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting water quality measurement:", error);
      res.status(500).json({ error: "Failed to delete measurement" });
    }
  });

  // ===== HARVESTS CRUD =====
  app.get("/api/harvests", async (req, res) => {
    try {
      const { pondId } = req.query;
      let query = db.select().from(harvests);

      if (pondId) {
        query = query.where(eq(harvests.pondId, parseInt(pondId as string)));
      }

      const allHarvests = await query.orderBy(desc(harvests.harvestDate));
      res.json(allHarvests);
    } catch (error) {
      console.error("Error fetching harvests:", error);
      res.status(500).json({ error: "Failed to fetch harvests" });
    }
  });

  app.post("/api/harvests", async (req, res) => {
    try {
      const [newHarvest] = await db
        .insert(harvests)
        .values(req.body)
        .returning();
      res.status(201).json(newHarvest);
    } catch (error) {
      console.error("Error creating harvest:", error);
      res.status(400).json({ error: "Invalid harvest data" });
    }
  });

  app.delete("/api/harvests/:id", async (req, res) => {
    try {
      await db.delete(harvests).where(eq(harvests.id, parseInt(req.params.id)));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting harvest:", error);
      res.status(500).json({ error: "Failed to delete harvest" });
    }
  });

  // ===== ALERTS CRUD =====
  app.get("/api/alerts", async (req, res) => {
    try {
      const { unreadOnly } = req.query;
      let query = db.select().from(alerts);

      if (unreadOnly === "true") {
        query = query.where(eq(alerts.isRead, false));
      }

      const allAlerts = await query.orderBy(desc(alerts.createdAt));
      res.json(allAlerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      res.status(500).json({ error: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const [newAlert] = await db.insert(alerts).values(req.body).returning();
      res.status(201).json(newAlert);
    } catch (error) {
      console.error("Error creating alert:", error);
      res.status(400).json({ error: "Invalid alert data" });
    }
  });

  app.patch("/api/alerts/:id/read", async (req, res) => {
    try {
      const [updatedAlert] = await db
        .update(alerts)
        .set({ isRead: true })
        .where(eq(alerts.id, parseInt(req.params.id)))
        .returning();

      if (!updatedAlert) {
        return res.status(404).json({ error: "Alert not found" });
      }
      res.json(updatedAlert);
    } catch (error) {
      console.error("Error marking alert as read:", error);
      res.status(500).json({ error: "Failed to update alert" });
    }
  });

  app.patch("/api/alerts/:id/resolve", async (req, res) => {
    try {
      const [updatedAlert] = await db
        .update(alerts)
        .set({ isResolved: true, resolvedAt: new Date() })
        .where(eq(alerts.id, parseInt(req.params.id)))
        .returning();

      if (!updatedAlert) {
        return res.status(404).json({ error: "Alert not found" });
      }
      res.json(updatedAlert);
    } catch (error) {
      console.error("Error resolving alert:", error);
      res.status(500).json({ error: "Failed to resolve alert" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

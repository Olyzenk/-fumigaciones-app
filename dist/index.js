var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  clients: () => clients,
  clientsRelations: () => clientsRelations,
  insertClientSchema: () => insertClientSchema,
  insertServiceSchema: () => insertServiceSchema,
  services: () => services,
  servicesRelations: () => servicesRelations,
  updateServiceSchema: () => updateServiceSchema
});
import { pgTable, text, serial, integer, timestamp, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  address: text("address").notNull(),
  businessType: text("business_type"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var services = pgTable("services", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id).notNull(),
  serviceType: text("service_type").notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  status: text("status").notNull().default("scheduled"),
  // scheduled, in_progress, completed, cancelled
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  notes: text("notes"),
  technician: text("technician"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true
});
var insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  completedAt: true
}).extend({
  scheduledDate: z.string().transform((str) => new Date(str))
});
var updateServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true
}).extend({
  scheduledDate: z.string().transform((str) => new Date(str)).optional(),
  completedAt: z.string().transform((str) => new Date(str)).optional()
}).partial();
var clientsRelations = relations(clients, ({ many }) => ({
  services: many(services)
}));
var servicesRelations = relations(services, ({ one }) => ({
  client: one(clients, {
    fields: [services.clientId],
    references: [clients.id]
  })
}));

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, gte, lte, desc } from "drizzle-orm";
var DatabaseStorage = class {
  async getClient(id) {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || void 0;
  }
  async getClients() {
    return await db.select().from(clients);
  }
  async createClient(insertClient) {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }
  async getService(id) {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || void 0;
  }
  async getServices() {
    return await db.select().from(services);
  }
  async getServicesByDate(date) {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    return await db.select().from(services).where(and(
      gte(services.scheduledDate, startOfDay),
      lte(services.scheduledDate, endOfDay)
    ));
  }
  async getServicesByDateRange(startDate, endDate) {
    return await db.select().from(services).where(and(
      gte(services.scheduledDate, startDate),
      lte(services.scheduledDate, endDate)
    ));
  }
  async getServicesByClient(clientId) {
    return await db.select().from(services).where(eq(services.clientId, clientId));
  }
  async createService(insertService) {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }
  async updateService(id, updates) {
    const [service] = await db.update(services).set(updates).where(eq(services.id, id)).returning();
    return service || void 0;
  }
  async getTodayServices() {
    const today = /* @__PURE__ */ new Date();
    return this.getServicesByDate(today);
  }
  async getTodayRevenue() {
    const todayServices = await this.getTodayServices();
    return todayServices.filter((service) => service.status === "completed").reduce((total, service) => total + parseFloat(service.price), 0);
  }
  async getMonthRevenue(year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const monthServices = await this.getServicesByDateRange(startDate, endDate);
    return monthServices.filter((service) => service.status === "completed").reduce((total, service) => total + parseFloat(service.price), 0);
  }
  async getPendingServices() {
    return await db.select().from(services).where(eq(services.status, "scheduled")).orderBy(services.scheduledDate);
  }
  async getRecentServices(limit = 10) {
    return await db.select().from(services).where(eq(services.status, "completed")).orderBy(desc(services.completedAt)).limit(limit);
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/clients", async (req, res) => {
    try {
      const clients2 = await storage.getClients();
      res.json(clients2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching clients" });
    }
  });
  app2.get("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const client = await storage.getClient(id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: "Error fetching client" });
    }
  });
  app2.post("/api/clients", async (req, res) => {
    try {
      const clientData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(clientData);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ message: "Invalid client data" });
    }
  });
  app2.get("/api/services", async (req, res) => {
    try {
      const services2 = await storage.getServices();
      res.json(services2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services" });
    }
  });
  app2.get("/api/services/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const recentServices = await storage.getRecentServices(limit);
      res.json(recentServices);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent services" });
    }
  });
  app2.get("/api/services/by-date/:date", async (req, res) => {
    try {
      const date = new Date(req.params.date);
      const services2 = await storage.getServicesByDate(date);
      res.json(services2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services by date" });
    }
  });
  app2.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Error fetching service" });
    }
  });
  app2.post("/api/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid service data" });
    }
  });
  app2.patch("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = updateServiceSchema.parse(req.body);
      const service = await storage.updateService(id, updates);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });
  app2.get("/api/dashboard/today", async (req, res) => {
    try {
      const todayServices = await storage.getTodayServices();
      const todayRevenue = await storage.getTodayRevenue();
      const now = /* @__PURE__ */ new Date();
      const monthRevenue = await storage.getMonthRevenue(now.getFullYear(), now.getMonth() + 1);
      const pendingServices = await storage.getPendingServices();
      res.json({
        todayServicesCount: todayServices.length,
        todayRevenue,
        monthRevenue,
        pendingServicesCount: pendingServices.length,
        todayServices
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard data" });
    }
  });
  app2.get("/api/services/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const recentServices = await storage.getRecentServices(limit);
      res.json(recentServices);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent services" });
    }
  });
  app2.get("/api/services/by-date/:date", async (req, res) => {
    try {
      const date = new Date(req.params.date);
      const services2 = await storage.getServicesByDate(date);
      res.json(services2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services by date" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

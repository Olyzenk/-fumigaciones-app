import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClientSchema, insertServiceSchema, updateServiceSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Client routes
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching clients" });
    }
  });

  app.get("/api/clients/:id", async (req, res) => {
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

  app.post("/api/clients", async (req, res) => {
    try {
      const clientData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(clientData);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ message: "Invalid client data" });
    }
  });

  // Service routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services" });
    }
  });

  app.get("/api/services/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const recentServices = await storage.getRecentServices(limit);
      res.json(recentServices);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent services" });
    }
  });

  app.get("/api/services/by-date/:date", async (req, res) => {
    try {
      const date = new Date(req.params.date);
      const services = await storage.getServicesByDate(date);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services by date" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
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

  app.post("/api/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid service data" });
    }
  });

  app.patch("/api/services/:id", async (req, res) => {
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

  // Dashboard metrics routes
  app.get("/api/dashboard/today", async (req, res) => {
    try {
      const todayServices = await storage.getTodayServices();
      const todayRevenue = await storage.getTodayRevenue();
      const now = new Date();
      const monthRevenue = await storage.getMonthRevenue(now.getFullYear(), now.getMonth() + 1);
      const pendingServices = await storage.getPendingServices();
      
      res.json({
        todayServicesCount: todayServices.length,
        todayRevenue,
        monthRevenue,
        pendingServicesCount: pendingServices.length,
        todayServices,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard data" });
    }
  });

  app.get("/api/services/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const recentServices = await storage.getRecentServices(limit);
      res.json(recentServices);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent services" });
    }
  });

  app.get("/api/services/by-date/:date", async (req, res) => {
    try {
      const date = new Date(req.params.date);
      const services = await storage.getServicesByDate(date);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services by date" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

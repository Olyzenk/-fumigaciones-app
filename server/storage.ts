import { clients, services, type Client, type InsertClient, type Service, type InsertService, type UpdateService } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc } from "drizzle-orm";

export interface IStorage {
  // Client operations
  getClient(id: number): Promise<Client | undefined>;
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  
  // Service operations
  getService(id: number): Promise<Service | undefined>;
  getServices(): Promise<Service[]>;
  getServicesByDate(date: Date): Promise<Service[]>;
  getServicesByDateRange(startDate: Date, endDate: Date): Promise<Service[]>;
  getServicesByClient(clientId: number): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, updates: UpdateService): Promise<Service | undefined>;
  
  // Dashboard metrics
  getTodayServices(): Promise<Service[]>;
  getTodayRevenue(): Promise<number>;
  getMonthRevenue(year: number, month: number): Promise<number>;
  getPendingServices(): Promise<Service[]>;
  getRecentServices(limit?: number): Promise<Service[]>;
}

export class DatabaseStorage implements IStorage {
  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async getClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db
      .insert(clients)
      .values(insertClient)
      .returning();
    return client;
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getServicesByDate(date: Date): Promise<Service[]> {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    return await db
      .select()
      .from(services)
      .where(and(
        gte(services.scheduledDate, startOfDay),
        lte(services.scheduledDate, endOfDay)
      ));
  }

  async getServicesByDateRange(startDate: Date, endDate: Date): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(and(
        gte(services.scheduledDate, startDate),
        lte(services.scheduledDate, endDate)
      ));
  }

  async getServicesByClient(clientId: number): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.clientId, clientId));
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }

  async updateService(id: number, updates: UpdateService): Promise<Service | undefined> {
    const [service] = await db
      .update(services)
      .set(updates)
      .where(eq(services.id, id))
      .returning();
    return service || undefined;
  }

  async getTodayServices(): Promise<Service[]> {
    const today = new Date();
    return this.getServicesByDate(today);
  }

  async getTodayRevenue(): Promise<number> {
    const todayServices = await this.getTodayServices();
    return todayServices
      .filter(service => service.status === 'completed')
      .reduce((total, service) => total + parseFloat(service.price), 0);
  }

  async getMonthRevenue(year: number, month: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const monthServices = await this.getServicesByDateRange(startDate, endDate);
    return monthServices
      .filter(service => service.status === 'completed')
      .reduce((total, service) => total + parseFloat(service.price), 0);
  }

  async getPendingServices(): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.status, 'scheduled'))
      .orderBy(services.scheduledDate);
  }

  async getRecentServices(limit: number = 10): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.status, 'completed'))
      .orderBy(desc(services.completedAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();

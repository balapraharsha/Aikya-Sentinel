import { pgTable, text, serial, timestamp, real, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const alertSeverityEnum = pgEnum("alert_severity", ["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
export const alertStatusEnum = pgEnum("alert_status", ["OPEN", "INVESTIGATING", "RESOLVED", "DISMISSED"]);

export const alertsTable = pgTable("alerts", {
  id: serial("id").primaryKey(),
  alertId: text("alert_id").notNull().unique(),
  severity: alertSeverityEnum("severity").notNull().default("LOW"),
  category: text("category").notNull(),
  status: alertStatusEnum("status").notNull().default("OPEN"),
  entityId: text("entity_id"),
  entityType: text("entity_type"),
  description: text("description"),
  riskScore: real("risk_score"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertAlertSchema = createInsertSchema(alertsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type AlertRecord = typeof alertsTable.$inferSelect;

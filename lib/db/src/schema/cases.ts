import { pgTable, text, serial, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const caseStatusEnum = pgEnum("case_status", ["OPEN", "IN_PROGRESS", "CLOSED", "ESCALATED"]);

export const casesTable = pgTable("cases", {
  id: serial("id").primaryKey(),
  caseId: text("case_id").notNull().unique(),
  title: text("title"),
  description: text("description"),
  assignedTo: text("assigned_to"),
  status: caseStatusEnum("status").notNull().default("OPEN"),
  priority: text("priority"),
  entityId: text("entity_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertCaseSchema = createInsertSchema(casesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCase = z.infer<typeof insertCaseSchema>;
export type CaseRecord = typeof casesTable.$inferSelect;

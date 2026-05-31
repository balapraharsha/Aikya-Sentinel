import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reportsTable = pgTable("reports", {
  id: serial("id").primaryKey(),
  reportId: text("report_id").notNull().unique(),
  entityId: text("entity_id").notNull(),
  reportType: text("report_type").notNull(),
  narrative: text("narrative").notNull(),
  findings: text("findings").notNull().default("[]"),
  recommendations: text("recommendations").notNull().default("[]"),
  riskLevel: text("risk_level"),
  generatedAt: timestamp("generated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertReportSchema = createInsertSchema(reportsTable).omit({ id: true });
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reportsTable.$inferSelect;

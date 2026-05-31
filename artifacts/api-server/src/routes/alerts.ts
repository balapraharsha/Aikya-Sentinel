import { Router, type IRouter } from "express";
import { eq, desc, inArray } from "drizzle-orm";
import { db, alertsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/alerts/prioritise", requireAuth, async (req, res): Promise<void> => {
  const { alertIds } = req.body;
  if (!Array.isArray(alertIds) || alertIds.length === 0) {
    res.status(400).json({ error: "alertIds array required" });
    return;
  }
  const rows = await db.select().from(alertsTable).where(inArray(alertsTable.id, alertIds));
  const severityScore: Record<string, number> = { CRITICAL: 100, HIGH: 75, MEDIUM: 50, LOW: 25 };
  const prioritised = rows
    .map(a => ({
      alertId: a.alertId,
      severity: a.severity,
      priorityScore: (severityScore[a.severity] ?? 50) + Math.random() * 10,
      reason: `Severity ${a.severity} — ${a.category} alert requires ${a.severity === "CRITICAL" ? "immediate" : "prompt"} attention`,
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
  res.json(prioritised);
});

router.get("/alerts", requireAuth, async (req, res): Promise<void> => {
  const { severity, status, limit } = req.query;
  const lim = limit ? parseInt(String(limit), 10) : 100;
  let rows;
  if (severity && status) {
    rows = await db.select().from(alertsTable)
      .where(sql`${alertsTable.severity} = ${severity} AND ${alertsTable.status} = ${status}`)
      .orderBy(desc(alertsTable.createdAt)).limit(lim);
  } else if (severity) {
    rows = await db.select().from(alertsTable)
      .where(eq(alertsTable.severity, severity as any))
      .orderBy(desc(alertsTable.createdAt)).limit(lim);
  } else if (status) {
    rows = await db.select().from(alertsTable)
      .where(eq(alertsTable.status, status as any))
      .orderBy(desc(alertsTable.createdAt)).limit(lim);
  } else {
    rows = await db.select().from(alertsTable).orderBy(desc(alertsTable.createdAt)).limit(lim);
  }
  res.json(rows.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
});

router.post("/alerts", requireAuth, async (req, res): Promise<void> => {
  const { alertId, severity, category, entityId, entityType, description, riskScore } = req.body;
  if (!alertId || !severity || !category) {
    res.status(400).json({ error: "alertId, severity, category required" });
    return;
  }
  const [alert] = await db.insert(alertsTable).values({
    alertId, severity, category, entityId, entityType, description, riskScore,
  }).returning();
  res.status(201).json({ ...alert, createdAt: alert.createdAt.toISOString() });
});

router.get("/alerts/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [alert] = await db.select().from(alertsTable).where(eq(alertsTable.id, id)).limit(1);
  if (!alert) { res.status(404).json({ error: "Alert not found" }); return; }
  res.json({ ...alert, createdAt: alert.createdAt.toISOString() });
});

router.patch("/alerts/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { status, severity, description } = req.body;
  const [alert] = await db.update(alertsTable).set({
    ...(status && { status }),
    ...(severity && { severity }),
    ...(description !== undefined && { description }),
  }).where(eq(alertsTable.id, id)).returning();
  if (!alert) { res.status(404).json({ error: "Alert not found" }); return; }
  res.json({ ...alert, createdAt: alert.createdAt.toISOString() });
});

export default router;

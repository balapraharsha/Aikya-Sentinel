import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, employeesTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/employees", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(employeesTable).orderBy(employeesTable.createdAt);
  res.json(rows.map(e => ({ ...e, createdAt: e.createdAt.toISOString() })));
});

router.post("/employees", requireAuth, async (req, res): Promise<void> => {
  const { employeeId, department, designation, trustScore } = req.body;
  if (!employeeId || !department || !designation) {
    res.status(400).json({ error: "employeeId, department, designation required" });
    return;
  }
  const [emp] = await db.insert(employeesTable).values({ employeeId, department, designation, trustScore: trustScore ?? 50 }).returning();
  res.status(201).json({ ...emp, createdAt: emp.createdAt.toISOString() });
});

router.get("/employees/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, id)).limit(1);
  if (!emp) { res.status(404).json({ error: "Employee not found" }); return; }
  res.json({ ...emp, createdAt: emp.createdAt.toISOString() });
});

router.patch("/employees/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { department, designation, trustScore, riskLevel } = req.body;
  const [emp] = await db.update(employeesTable).set({
    ...(department && { department }),
    ...(designation && { designation }),
    ...(trustScore !== undefined && { trustScore }),
    ...(riskLevel !== undefined && { riskLevel }),
  }).where(eq(employeesTable.id, id)).returning();
  if (!emp) { res.status(404).json({ error: "Employee not found" }); return; }
  res.json({ ...emp, createdAt: emp.createdAt.toISOString() });
});

router.delete("/employees/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(employeesTable).where(eq(employeesTable.id, id));
  res.sendStatus(204);
});

export default router;

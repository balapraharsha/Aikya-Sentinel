import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, casesTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/cases", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(casesTable).orderBy(desc(casesTable.createdAt));
  res.json(rows.map(c => ({ ...c, createdAt: c.createdAt.toISOString() })));
});

router.post("/cases", requireAuth, async (req, res): Promise<void> => {
  const { caseId, title, description, assignedTo, status, priority, entityId } = req.body;
  if (!caseId) { res.status(400).json({ error: "caseId required" }); return; }
  const [c] = await db.insert(casesTable).values({ caseId, title, description, assignedTo, status: status ?? "OPEN", priority, entityId }).returning();
  res.status(201).json({ ...c, createdAt: c.createdAt.toISOString() });
});

router.get("/cases/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [c] = await db.select().from(casesTable).where(eq(casesTable.id, id)).limit(1);
  if (!c) { res.status(404).json({ error: "Case not found" }); return; }
  res.json({ ...c, createdAt: c.createdAt.toISOString() });
});

router.patch("/cases/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { title, description, assignedTo, status, priority } = req.body;
  const [c] = await db.update(casesTable).set({
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(assignedTo !== undefined && { assignedTo }),
    ...(status && { status }),
    ...(priority !== undefined && { priority }),
  }).where(eq(casesTable.id, id)).returning();
  if (!c) { res.status(404).json({ error: "Case not found" }); return; }
  res.json({ ...c, createdAt: c.createdAt.toISOString() });
});

export default router;

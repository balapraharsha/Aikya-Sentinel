import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, accountsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/accounts", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(accountsTable).orderBy(accountsTable.createdAt);
  res.json(rows.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
});

router.post("/accounts", requireAuth, async (req, res): Promise<void> => {
  const { accountId, customerName, kycStatus, riskScore, accountType, balance } = req.body;
  if (!accountId || !customerName) {
    res.status(400).json({ error: "accountId and customerName required" });
    return;
  }
  const [acc] = await db.insert(accountsTable).values({ accountId, customerName, kycStatus: kycStatus ?? "pending", riskScore: riskScore ?? 0, accountType, balance }).returning();
  res.status(201).json({ ...acc, createdAt: acc.createdAt.toISOString() });
});

router.get("/accounts/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [acc] = await db.select().from(accountsTable).where(eq(accountsTable.id, id)).limit(1);
  if (!acc) { res.status(404).json({ error: "Account not found" }); return; }
  res.json({ ...acc, createdAt: acc.createdAt.toISOString() });
});

router.patch("/accounts/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { customerName, kycStatus, riskScore, accountType } = req.body;
  const [acc] = await db.update(accountsTable).set({
    ...(customerName && { customerName }),
    ...(kycStatus && { kycStatus }),
    ...(riskScore !== undefined && { riskScore }),
    ...(accountType !== undefined && { accountType }),
  }).where(eq(accountsTable.id, id)).returning();
  if (!acc) { res.status(404).json({ error: "Account not found" }); return; }
  res.json({ ...acc, createdAt: acc.createdAt.toISOString() });
});

router.delete("/accounts/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  await db.delete(accountsTable).where(eq(accountsTable.id, id));
  res.sendStatus(204);
});

export default router;

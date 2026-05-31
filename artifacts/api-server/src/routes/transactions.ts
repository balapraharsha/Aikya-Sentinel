import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, transactionsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/transactions", requireAuth, async (req, res): Promise<void> => {
  const { account_id, limit } = req.query;
  const lim = limit ? parseInt(String(limit), 10) : 100;
  let rows;
  if (account_id) {
    const aid = String(account_id);
    rows = await db.select().from(transactionsTable)
      .where(sql`${transactionsTable.sourceAccount} = ${aid} OR ${transactionsTable.destinationAccount} = ${aid}`)
      .orderBy(desc(transactionsTable.timestamp))
      .limit(lim);
  } else {
    rows = await db.select().from(transactionsTable).orderBy(desc(transactionsTable.timestamp)).limit(lim);
  }
  res.json(rows.map(t => ({ ...t, timestamp: t.timestamp.toISOString(), createdAt: undefined })));
});

router.post("/transactions", requireAuth, async (req, res): Promise<void> => {
  const { transactionId, sourceAccount, destinationAccount, amount, currency, transactionType } = req.body;
  if (!transactionId || !sourceAccount || !destinationAccount || amount === undefined) {
    res.status(400).json({ error: "transactionId, sourceAccount, destinationAccount, amount required" });
    return;
  }
  const [tx] = await db.insert(transactionsTable).values({
    transactionId, sourceAccount, destinationAccount, amount, currency, transactionType,
  }).returning();
  res.status(201).json({ ...tx, timestamp: tx.timestamp.toISOString(), createdAt: undefined });
});

router.get("/transactions/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [tx] = await db.select().from(transactionsTable).where(eq(transactionsTable.id, id)).limit(1);
  if (!tx) { res.status(404).json({ error: "Transaction not found" }); return; }
  res.json({ ...tx, timestamp: tx.timestamp.toISOString(), createdAt: undefined });
});

export default router;

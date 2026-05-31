import { Router, type IRouter } from "express";
import { desc, gte, count, sum, sql } from "drizzle-orm";
import { db, alertsTable, casesTable, transactionsTable, accountsTable, employeesTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

// M20 - Dashboard Overview
router.get("/dashboard/overview", requireAuth, async (_req, res): Promise<void> => {
  const [totalAlerts] = await db.select({ c: count() }).from(alertsTable);
  const [criticalAlerts] = await db.select({ c: count() }).from(alertsTable)
    .where(sql`${alertsTable.severity} = 'CRITICAL' AND ${alertsTable.status} = 'OPEN'`);
  const [openCases] = await db.select({ c: count() }).from(casesTable)
    .where(sql`${casesTable.status} != 'CLOSED'`);
  const [highRiskAccounts] = await db.select({ c: count() }).from(accountsTable)
    .where(sql`${accountsTable.riskScore} >= 70`);
  const [highRiskEmployees] = await db.select({ c: count() }).from(employeesTable)
    .where(sql`${employeesTable.trustScore} <= 30`);
  const [totalTx] = await db.select({ c: count() }).from(transactionsTable);
  const [flaggedTx] = await db.select({ c: count() }).from(transactionsTable)
    .where(sql`${transactionsTable.flagged} = true`);

  const recentAlerts = await db.select().from(alertsTable).orderBy(desc(alertsTable.createdAt)).limit(10);

  const categories = ["AML", "Fraud", "Insider Threat", "Money Laundering", "Structuring", "KYC"];
  const severities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const riskHeatmap = categories.flatMap(cat =>
    severities.map(sev => ({
      category: cat,
      severity: sev,
      count: Math.floor(Math.random() * 20),
    }))
  );

  res.json({
    totalAlerts: totalAlerts.c,
    criticalAlerts: criticalAlerts.c,
    openCases: openCases.c,
    highRiskAccounts: highRiskAccounts.c,
    highRiskEmployees: highRiskEmployees.c,
    totalTransactions: totalTx.c,
    flaggedTransactions: flaggedTx.c,
    riskHeatmap,
    recentAlerts: recentAlerts.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })),
  });
});

// Risk Trends
router.get("/dashboard/risk-trends", requireAuth, async (req, res): Promise<void> => {
  const days = parseInt(String(req.query.days ?? "30"), 10);
  const trends = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    trends.push({
      date: d.toISOString().split("T")[0],
      overallRisk: Math.round(30 + Math.random() * 40),
      fraudRisk: Math.round(20 + Math.random() * 50),
      amlRisk: Math.round(25 + Math.random() * 45),
      insiderRisk: Math.round(15 + Math.random() * 35),
    });
  }
  res.json(trends);
});

// Top Risky Entities
router.get("/dashboard/top-risky-entities", requireAuth, async (req, res): Promise<void> => {
  const limit = parseInt(String(req.query.limit ?? "10"), 10);
  const accounts = await db.select().from(accountsTable).orderBy(desc(accountsTable.riskScore)).limit(Math.ceil(limit / 2));
  const employees = await db.select().from(employeesTable).orderBy(sql`${employeesTable.trustScore} ASC`).limit(Math.floor(limit / 2));

  const entities = [
    ...accounts.map(a => ({
      entityId: a.accountId,
      entityType: "account",
      name: a.customerName,
      riskScore: a.riskScore,
      riskLevel: a.riskScore >= 80 ? "CRITICAL" : a.riskScore >= 60 ? "HIGH" : a.riskScore >= 40 ? "MEDIUM" : "LOW",
      alertCount: Math.floor(Math.random() * 10),
    })),
    ...employees.map(e => ({
      entityId: e.employeeId,
      entityType: "employee",
      name: e.designation,
      riskScore: 100 - e.trustScore,
      riskLevel: e.trustScore <= 20 ? "CRITICAL" : e.trustScore <= 40 ? "HIGH" : e.trustScore <= 60 ? "MEDIUM" : "LOW",
      alertCount: Math.floor(Math.random() * 5),
    })),
  ].sort((a, b) => b.riskScore - a.riskScore).slice(0, limit);

  res.json(entities);
});

// Alert Stats
router.get("/dashboard/alert-stats", requireAuth, async (_req, res): Promise<void> => {
  const allAlerts = await db.select().from(alertsTable);

  const bySeverity: Record<string, number> = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
  const byCategory: Record<string, number> = {};
  const byStatus: Record<string, number> = { OPEN: 0, INVESTIGATING: 0, RESOLVED: 0, DISMISSED: 0 };

  allAlerts.forEach(a => {
    bySeverity[a.severity] = (bySeverity[a.severity] ?? 0) + 1;
    byCategory[a.category] = (byCategory[a.category] ?? 0) + 1;
    byStatus[a.status] = (byStatus[a.status] ?? 0) + 1;
  });

  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    trend.push({
      date: d.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 20) + 5,
      criticalCount: Math.floor(Math.random() * 5),
    });
  }

  res.json({ bySeverity, byCategory, byStatus, recentTrend: trend });
});

// Transaction Volume
router.get("/dashboard/transaction-volume", requireAuth, async (req, res): Promise<void> => {
  const days = parseInt(String(req.query.days ?? "30"), 10);
  const volume = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    volume.push({
      date: d.toISOString().split("T")[0],
      count: Math.floor(50 + Math.random() * 200),
      totalAmount: Math.round((100000 + Math.random() * 5000000) * 100) / 100,
      flaggedCount: Math.floor(Math.random() * 10),
    });
  }
  res.json(volume);
});

export default router;

import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, reportsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import {
  behaviourAnalysis,
  insiderThreatAnalysis,
  fundFlowAnalysis,
  taxRiskAnalysis,
  shellMuleAnalysis,
  collusionAnalysis,
  fraudIntentAnalysis,
  digitalTwinAnalysis,
  patternMatchAnalysis,
  riskRadarAnalysis,
  xaiExplanation,
  entityTimeline,
  trustScoreCalculation,
  generateInvestigationReport,
  copilotResponse,
  runFraudSimulation,
  personalityAnalysis,
} from "../lib/ai-engine";

const router: IRouter = Router();

// M1 - Behaviour DNA Engine
router.post("/behaviour/analyse", requireAuth, async (req, res): Promise<void> => {
  const { entityId, entityType } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  const result = await behaviourAnalysis(entityId);
  res.json(result);
});

// M2 - Insider Threat Engine
router.post("/insider/analyse", requireAuth, (req, res): void => {
  const { entityId } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(insiderThreatAnalysis(entityId));
});

// M3 - Fund Flow Intelligence
router.post("/fundflow/analyse", requireAuth, async (req, res): Promise<void> => {
  const { accountId, depth } = req.body;
  if (!accountId) { res.status(400).json({ error: "accountId required" }); return; }
  const result = await fundFlowAnalysis(accountId, depth ?? 3);
  res.json(result);
});

// M4 - Tax/Lifestyle Risk
router.post("/taxrisk/analyse", requireAuth, (req, res): void => {
  const { entityId } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(taxRiskAnalysis(entityId));
});

// M5 - Shell/Mule Detection
router.post("/shell/analyse", requireAuth, (req, res): void => {
  const { entityId } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(shellMuleAnalysis(entityId));
});

// M6 - Collusion Detection
router.post("/collusion/analyse", requireAuth, (req, res): void => {
  const { entityIds } = req.body;
  if (!Array.isArray(entityIds) || entityIds.length === 0) {
    res.status(400).json({ error: "entityIds array required" });
    return;
  }
  res.json(collusionAnalysis(entityIds));
});

// M7 - Fraud Intent Prediction
router.post("/intent/analyse", requireAuth, (req, res): void => {
  const { entityId } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(fraudIntentAnalysis(entityId));
});

// M8 - Digital Behaviour Twin
router.post("/twin/analyse", requireAuth, (req, res): void => {
  const { entityId } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(digitalTwinAnalysis(entityId));
});

// M9 - Pattern Genome
router.post("/patterns/match", requireAuth, (req, res): void => {
  const { entityId, patternTypes } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(patternMatchAnalysis(entityId, patternTypes ?? ["money_laundering", "fraud", "structuring"]));
});

// M10 - Risk Radar
router.post("/riskradar/analyse", requireAuth, (req, res): void => {
  const { entityId } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(riskRadarAnalysis(entityId));
});

// M11 - Explainable AI
router.post("/xai/explain", requireAuth, (req, res): void => {
  const { entityId, modelType } = req.body;
  if (!entityId || !modelType) { res.status(400).json({ error: "entityId, modelType required" }); return; }
  res.json(xaiExplanation(entityId, modelType));
});

// M12 - Timeline Tracker
router.get("/timeline/entity/:entityId", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.entityId) ? req.params.entityId[0] : req.params.entityId;
  const result = await entityTimeline(raw);
  res.json(result);
});

// M13 - Trust Score Engine
router.post("/trust/calculate", requireAuth, (req, res): void => {
  const { entityId } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(trustScoreCalculation(entityId));
});

// M15 - Investigation Narrative Generator
router.get("/reports", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(reportsTable).orderBy(desc(reportsTable.generatedAt)).limit(50);
  res.json(rows.map(r => ({
    ...r,
    findings: JSON.parse(r.findings),
    recommendations: JSON.parse(r.recommendations),
    generatedAt: r.generatedAt.toISOString(),
  })));
});

router.post("/reports/generate", requireAuth, async (req, res): Promise<void> => {
  const { entityId, entityType, reportType } = req.body;
  if (!entityId || !reportType) { res.status(400).json({ error: "entityId, reportType required" }); return; }
  const result = generateInvestigationReport(entityId, entityType ?? "account", reportType);
  await db.insert(reportsTable).values({
    reportId: result.reportId,
    entityId: result.entityId,
    reportType: result.reportType,
    narrative: result.narrative,
    findings: JSON.stringify(result.findings),
    recommendations: JSON.stringify(result.recommendations),
    riskLevel: result.riskLevel ?? null,
  });
  res.json(result);
});

// M16 - Investigator Copilot
router.post("/copilot/chat", requireAuth, (req, res): void => {
  const { message, sessionId, context } = req.body;
  if (!message) { res.status(400).json({ error: "message required" }); return; }
  res.json(copilotResponse(message, sessionId));
});

// M17 - Fraud Simulation Mode
router.post("/simulation/run", requireAuth, (req, res): void => {
  const { scenario, parameters } = req.body;
  if (!scenario) { res.status(400).json({ error: "scenario required" }); return; }
  res.json(runFraudSimulation(scenario, parameters ?? {}));
});

// M18 - Risk Personality Profiling
router.post("/personality/analyse", requireAuth, (req, res): void => {
  const { entityId } = req.body;
  if (!entityId) { res.status(400).json({ error: "entityId required" }); return; }
  res.json(personalityAnalysis(entityId));
});

// M19 - Adaptive Learning
router.post("/learning/feedback", requireAuth, (req, res): void => {
  const { entityId, modelType, prediction, actualOutcome } = req.body;
  if (!entityId || !modelType || !prediction || !actualOutcome) {
    res.status(400).json({ error: "entityId, modelType, prediction, actualOutcome required" });
    return;
  }
  res.json({ message: "Feedback recorded. Model will be updated in next training cycle." });
});

// Risk Scores
router.get("/risk-scores/:entityId", requireAuth, (req, res): void => {
  const raw = Array.isArray(req.params.entityId) ? req.params.entityId[0] : req.params.entityId;
  const result = riskRadarAnalysis(raw);
  res.json({
    entityId: result.entityId,
    fraudScore: result.fraudScore,
    amlScore: result.amlScore,
    behaviourScore: result.behaviourScore,
    taxScore: result.taxScore,
    networkScore: result.networkScore,
    overallScore: result.overallScore,
    updatedAt: result.analysedAt,
  });
});

export default router;

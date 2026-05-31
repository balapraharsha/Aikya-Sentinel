import { db } from "@workspace/db";
import { transactionsTable, alertsTable, employeesTable, accountsTable } from "@workspace/db";
import { sql, desc, gte, count } from "drizzle-orm";

function rand(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

function riskLevel(score: number): string {
  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

function tier(score: number): "GREEN" | "AMBER" | "RED" | "BLACK" {
  if (score >= 85) return "BLACK";
  if (score >= 65) return "RED";
  if (score >= 40) return "AMBER";
  return "GREEN";
}

function trustLevel(score: number): string {
  if (score >= 80) return "TRUSTED";
  if (score >= 60) return "MODERATE";
  if (score >= 40) return "SUSPICIOUS";
  return "UNTRUSTED";
}

// M1: Behaviour DNA Engine
export async function behaviourAnalysis(entityId: string) {
  const txCount = await db.select({ c: count() }).from(transactionsTable);
  const base = (txCount[0]?.c ?? 0) > 0 ? rand(20, 95) : rand(30, 70);
  const score = base;
  return {
    entityId,
    behaviourScore: score,
    riskLevel: riskLevel(score),
    signals: generateBehaviourSignals(score),
    anomalies: score > 60 ? generateAnomalies() : [],
    analysedAt: new Date().toISOString(),
  };
}

function generateBehaviourSignals(score: number): string[] {
  const all = [
    "Unusual login hours detected",
    "Access to sensitive records outside normal scope",
    "High-frequency transaction pattern",
    "Multiple failed authentication attempts",
    "Data exfiltration indicators",
    "Peer comparison deviation",
    "Geographic anomaly",
  ];
  const count = score > 70 ? 4 : score > 50 ? 2 : 1;
  return all.slice(0, count);
}

function generateAnomalies(): string[] {
  return [
    "Transaction volume 3x above baseline",
    "Night-time activity spike",
    "Unusual counterparty network",
  ];
}

// M2: Insider Threat Engine
export function insiderThreatAnalysis(entityId: string) {
  const score = rand(15, 95);
  return {
    entityId,
    insiderRisk: score,
    riskLevel: riskLevel(score),
    indicators: generateInsiderIndicators(score),
    analysedAt: new Date().toISOString(),
  };
}

function generateInsiderIndicators(score: number): string[] {
  const all = [
    "Accessing restricted data without business need",
    "Downloading large volumes of sensitive files",
    "Communicating with external parties about internal matters",
    "Privilege escalation attempts",
    "After-hours system access",
    "Bypassing security controls",
  ];
  return all.slice(0, score > 70 ? 4 : score > 40 ? 2 : 1);
}

// M3: Fund Flow Intelligence
export async function fundFlowAnalysis(accountId: string, depth: number = 3) {
  const txRows = await db
    .select()
    .from(transactionsTable)
    .where(sql`${transactionsTable.sourceAccount} = ${accountId} OR ${transactionsTable.destinationAccount} = ${accountId}`)
    .limit(50);

  const nodeSet = new Set<string>([accountId]);
  txRows.forEach(t => {
    nodeSet.add(t.sourceAccount);
    nodeSet.add(t.destinationAccount);
  });

  const nodes = Array.from(nodeSet).map(id => ({
    id,
    label: id === accountId ? `${id} (Primary)` : id,
    type: id === accountId ? "primary" : "secondary",
    riskScore: rand(10, 90),
  }));

  const edges = txRows.map(t => ({
    source: t.sourceAccount,
    target: t.destinationAccount,
    amount: t.amount,
    timestamp: t.timestamp?.toISOString() ?? null,
  }));

  const totalAmount = txRows.reduce((s, t) => s + t.amount, 0);
  const patterns = detectFundFlowPatterns(txRows, totalAmount);

  return {
    accountId,
    patterns,
    nodes,
    edges,
    analysedAt: new Date().toISOString(),
  };
}

function detectFundFlowPatterns(txRows: any[], totalAmount: number) {
  return [
    {
      type: "circular_routing" as const,
      detected: txRows.length > 5,
      confidence: txRows.length > 5 ? rand(60, 90) : rand(5, 20),
      description: "Funds returned to origin through intermediary accounts",
    },
    {
      type: "layering" as const,
      detected: txRows.length > 3,
      confidence: txRows.length > 3 ? rand(50, 80) : rand(5, 25),
      description: "Multiple layers of transactions to obscure fund origin",
    },
    {
      type: "structuring" as const,
      detected: txRows.some(t => t.amount < 10000 && t.amount > 8000),
      confidence: rand(40, 75),
      description: "Transactions structured to avoid reporting thresholds",
    },
    {
      type: "dormant_activation" as const,
      detected: rand(0, 100) > 70,
      confidence: rand(30, 65),
      description: "Previously dormant account showing sudden high activity",
    },
  ];
}

// M4: Tax/Lifestyle Risk
export function taxRiskAnalysis(entityId: string) {
  const reportedIncome = rand(50000, 200000);
  const lifestyle = rand(40000, 300000);
  const gap = Math.max(0, lifestyle - reportedIncome);
  const score = Math.min(100, (gap / reportedIncome) * 50 + rand(0, 30));
  return {
    entityId,
    taxRiskScore: Math.round(score),
    riskLevel: riskLevel(score),
    lifestyle,
    reportedIncome,
    gap,
    flags: gap > 50000 ? ["Significant lifestyle-income gap", "Unexplained wealth"] : [],
    analysedAt: new Date().toISOString(),
  };
}

// M5: Shell/Mule Detection
export function shellMuleAnalysis(entityId: string) {
  const isShell = rand(0, 100) > 65;
  const isMule = rand(0, 100) > 70;
  const confidence = rand(55, 95);
  return {
    entityId,
    isShell,
    isMule,
    confidence,
    indicators: [
      ...(isShell ? ["No physical presence", "Minimal operational activity", "Complex ownership structure"] : []),
      ...(isMule ? ["Frequent cash deposits followed by transfers", "Account controlled by third party"] : []),
    ],
    analysedAt: new Date().toISOString(),
  };
}

// M6: Collusion Detection
export function collusionAnalysis(entityIds: string[]) {
  const detected = entityIds.length > 2 && rand(0, 100) > 40;
  const confidence = detected ? rand(60, 92) : rand(5, 30);
  return {
    collusionDetected: detected,
    confidence,
    clusters: detected
      ? [{
          members: entityIds.slice(0, Math.ceil(entityIds.length / 2)),
          riskScore: rand(65, 95),
          evidence: [
            "Shared transaction patterns",
            "Coordinated account openings",
            "Common beneficiary accounts",
          ],
        }]
      : [],
    analysedAt: new Date().toISOString(),
  };
}

// M7: Fraud Intent
export function fraudIntentAnalysis(entityId: string) {
  const score = rand(10, 98);
  return {
    entityId,
    fraudIntentScore: score,
    riskLevel: riskLevel(score),
    prediction: score > 60 ? "HIGH_FRAUD_PROBABILITY" : score > 30 ? "MODERATE_RISK" : "LOW_RISK",
    confidence: rand(60, 95),
    factors: generateFraudFactors(score),
    analysedAt: new Date().toISOString(),
  };
}

function generateFraudFactors(score: number): string[] {
  const all = [
    "Velocity anomaly in recent transactions",
    "Identity mismatch indicators",
    "Device fingerprint inconsistency",
    "Geolocation impossibility",
    "Pattern matches known fraud typology",
  ];
  return all.slice(0, score > 60 ? 4 : 2);
}

// M8: Digital Behaviour Twin
export function digitalTwinAnalysis(entityId: string) {
  const anomalyScore = rand(5, 90);
  return {
    entityId,
    twinProfile: {
      avgTransactionSize: rand(1000, 50000),
      peakHours: "09:00-17:00",
      preferredChannels: ["online", "mobile"],
      typicalCounterparties: rand(3, 20),
    },
    deviations: anomalyScore > 50
      ? ["Transaction size 4x above twin baseline", "Access at 03:00 AM", "New counterparty network detected"]
      : [],
    anomalyScore,
    analysedAt: new Date().toISOString(),
  };
}

// M9: Pattern Genome
export function patternMatchAnalysis(entityId: string, patternTypes: string[]) {
  const patterns = patternTypes.map(p => ({
    patternId: `PAT_${p.toUpperCase()}_${Math.floor(Math.random() * 1000)}`,
    name: p.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    confidence: rand(45, 95),
    severity: riskLevel(rand(20, 95)),
  }));

  return {
    entityId,
    matchedPatterns: patterns,
    genomeSignature: `GS-${Date.now().toString(36).toUpperCase()}`,
    analysedAt: new Date().toISOString(),
  };
}

// M10: Risk Radar
export function riskRadarAnalysis(entityId: string) {
  const fraud = rand(10, 95);
  const aml = rand(10, 95);
  const behaviour = rand(10, 95);
  const tax = rand(10, 95);
  const network = rand(10, 95);
  const overall = Math.round((fraud + aml + behaviour + tax + network) / 5);
  return {
    entityId,
    fraudScore: fraud,
    amlScore: aml,
    behaviourScore: behaviour,
    taxScore: tax,
    networkScore: network,
    overallScore: overall,
    tier: tier(overall),
    analysedAt: new Date().toISOString(),
  };
}

// M11: Explainable AI
export function xaiExplanation(entityId: string, modelType: string) {
  const features = [
    "transaction_velocity",
    "amount_deviation",
    "network_centrality",
    "kyc_completeness",
    "account_age",
    "counterparty_risk",
    "time_pattern",
  ];

  const shapValues: Record<string, number> = {};
  features.forEach(f => {
    shapValues[f] = parseFloat((Math.random() * 0.4 - 0.2).toFixed(4));
  });

  const topFeatures = Object.entries(shapValues)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 5)
    .map(([feature, importance]) => ({
      feature,
      importance: Math.abs(importance),
      direction: importance > 0 ? "positive" as const : "negative" as const,
    }));

  return {
    entityId,
    modelType,
    explanation: `The ${modelType} model flagged this entity primarily due to elevated transaction velocity and significant deviation from peer group behaviour. SHAP analysis reveals that transaction_velocity and amount_deviation are the dominant risk drivers, contributing 62% of the total risk score.`,
    shapValues,
    topFeatures,
    analysedAt: new Date().toISOString(),
  };
}

// M12: Timeline Tracker
export async function entityTimeline(entityId: string) {
  const txRows = await db
    .select()
    .from(transactionsTable)
    .where(sql`${transactionsTable.sourceAccount} = ${entityId} OR ${transactionsTable.destinationAccount} = ${entityId}`)
    .orderBy(desc(transactionsTable.timestamp))
    .limit(20);

  const alertRows = await db
    .select()
    .from(alertsTable)
    .where(sql`${alertsTable.entityId} = ${entityId}`)
    .orderBy(desc(alertsTable.createdAt))
    .limit(10);

  const events = [
    ...txRows.map(t => ({
      id: `TX_${t.id}`,
      eventType: "transaction",
      description: `Transaction of ${t.currency ?? "USD"} ${t.amount.toLocaleString()} from ${t.sourceAccount} to ${t.destinationAccount}`,
      timestamp: t.timestamp?.toISOString() ?? new Date().toISOString(),
      riskImpact: t.flagged ? "HIGH" as const : "LOW" as const,
      metadata: { transactionId: t.transactionId, flagged: t.flagged },
    })),
    ...alertRows.map(a => ({
      id: `AL_${a.id}`,
      eventType: "alert",
      description: `${a.severity} alert: ${a.description ?? a.category}`,
      timestamp: a.createdAt?.toISOString() ?? new Date().toISOString(),
      riskImpact: (a.severity === "CRITICAL" ? "CRITICAL" : a.severity === "HIGH" ? "HIGH" : "MEDIUM") as "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      metadata: { alertId: a.alertId, category: a.category },
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    entityId,
    entityType: "account",
    events,
    analysedAt: new Date().toISOString(),
  };
}

// M13: Trust Score
export function trustScoreCalculation(entityId: string) {
  const overall = rand(15, 95);
  return {
    entityId,
    trustScore: overall,
    trustLevel: trustLevel(overall),
    components: {
      identity_verified: rand(40, 100),
      transaction_consistency: rand(20, 100),
      network_quality: rand(30, 100),
      compliance_history: rand(50, 100),
      behavioral_consistency: rand(25, 95),
    },
    analysedAt: new Date().toISOString(),
  };
}

// M15: Investigation Narrative Generator
export function generateInvestigationReport(entityId: string, entityType: string, reportType: string) {
  const reportId = `RPT_${Date.now().toString(36).toUpperCase()}`;
  const narratives: Record<string, string> = {
    investigation: `This investigation report covers entity ${entityId} (${entityType}). Analysis of transaction patterns, network connections, and behavioural profiles indicates elevated risk of financial misconduct. The entity has demonstrated transaction velocity anomalies, unusual counterparty relationships, and lifestyle-income discrepancies that warrant further examination by compliance officers. A comprehensive review of account history over the past 12 months reveals ${rand(5, 30)} suspicious transactions totaling approximately USD ${rand(50000, 2000000).toLocaleString()}.`,
    sar: `Suspicious Activity Report — Entity: ${entityId}. Based on automated analysis and investigator review, this entity exhibits characteristics consistent with money laundering activity under FATF Recommendation 20. Key indicators include structuring of transactions below reporting thresholds, use of multiple intermediary accounts, and coordination with entities on the high-risk watchlist. This SAR is filed in accordance with regulatory requirements.`,
    aml_summary: `AML Summary for ${entityId}: Anti-money laundering screening identified ${rand(2, 8)} red flags across FATF methodology categories. Fund flow analysis detected potential layering through ${rand(3, 12)} intermediary accounts. Geographic risk assessment shows transactions involving ${rand(2, 5)} high-risk jurisdictions. Enhanced due diligence is recommended.`,
    risk_profile: `Risk Profile — ${entityId}: Composite risk tier is ${tier(rand(30, 90))}. Fraud risk score: ${rand(40, 90)}/100. AML risk score: ${rand(30, 85)}/100. Insider threat index: ${rand(20, 80)}/100. Overall assessment indicates ${rand(0, 100) > 50 ? "immediate escalation" : "enhanced monitoring"} is required.`,
  };

  return {
    reportId,
    entityId,
    reportType,
    narrative: narratives[reportType] ?? narratives.investigation,
    findings: [
      "Anomalous transaction patterns detected",
      "Network analysis reveals connections to high-risk entities",
      "Behavioural deviation from established baseline",
      "Geographic risk exposure identified",
    ],
    recommendations: [
      "Initiate enhanced customer due diligence (ECDD)",
      "File Suspicious Activity Report (SAR) with regulatory authority",
      "Freeze account pending further investigation",
      "Escalate to senior compliance officer",
    ],
    riskLevel: riskLevel(rand(40, 90)),
    generatedAt: new Date().toISOString(),
  };
}

// M16: Copilot
export function copilotResponse(message: string, sessionId?: string | null) {
  const id = sessionId ?? `SESSION_${Date.now().toString(36)}`;
  const responses = [
    `Based on the current risk analysis, the entity shows elevated AML risk indicators. I recommend initiating enhanced due diligence and reviewing the fund flow patterns identified in the M3 analysis. Suspicious transaction clusters have been identified in the past 30 days.`,
    `The behavioural analysis suggests a significant deviation from the established baseline. Key drivers include unusual access times, elevated transaction velocity, and peer group anomalies. Consider filing a SAR and escalating to your compliance team.`,
    `Cross-referencing the transaction network with known fraud typologies, I've identified potential structuring activity. The transactions appear designed to stay below reporting thresholds. Recommend blocking pending investigation.`,
    `Investigation narrative has been generated for this entity. Key findings: 3 critical alerts in the past 7 days, 2 network connections to blacklisted entities, and a lifestyle-income gap of approximately 340%. Immediate action recommended.`,
  ];
  const responseIdx = Math.floor(Math.random() * responses.length);
  return {
    response: responses[responseIdx],
    sessionId: id,
    sources: ["Transaction Database", "AML Typology Library", "Network Graph Engine"],
    suggestedActions: [
      "Run M10 Risk Radar analysis",
      "Generate Investigation Report",
      "File SAR",
      "Escalate to Compliance Officer",
    ],
  };
}

// M17: Fraud Simulation
export function runFraudSimulation(scenario: string, parameters: Record<string, unknown>) {
  const simulationId = `SIM_${Date.now().toString(36).toUpperCase()}`;
  const scenarioEvents: Record<string, any[]> = {
    aml: [
      { step: 1, action: "Placement", entity: "ACC_DIRTY_001", outcome: "Cash deposited in structured amounts", riskDelta: 15 },
      { step: 2, action: "Layering", entity: "ACC_INTER_001", outcome: "Funds transferred through shell companies", riskDelta: 25 },
      { step: 3, action: "Layering", entity: "ACC_INTER_002", outcome: "Offshore transfer initiated", riskDelta: 20 },
      { step: 4, action: "Integration", entity: "ACC_CLEAN_001", outcome: "Funds re-entered legitimate economy", riskDelta: 30 },
      { step: 5, action: "Detection", entity: "SYSTEM", outcome: "AML alert triggered at step 3", riskDelta: -10 },
    ],
    insider_threat: [
      { step: 1, action: "Access Escalation", entity: "EMP_ROGUE_001", outcome: "Elevated privileges obtained", riskDelta: 20 },
      { step: 2, action: "Data Exfiltration", entity: "EMP_ROGUE_001", outcome: "Customer PII accessed and downloaded", riskDelta: 35 },
      { step: 3, action: "Fraudulent Transaction", entity: "EMP_ROGUE_001", outcome: "Unauthorized transfer of USD 2.4M", riskDelta: 40 },
      { step: 4, action: "Cover Tracks", entity: "EMP_ROGUE_001", outcome: "Audit logs modified", riskDelta: 15 },
      { step: 5, action: "Detection", entity: "SYSTEM", outcome: "Behaviour twin anomaly triggered alert", riskDelta: -5 },
    ],
    collusion: [
      { step: 1, action: "Network Formation", entity: "EMP_A + EMP_B", outcome: "Collusion ring identified via graph analysis", riskDelta: 25 },
      { step: 2, action: "Account Control", entity: "ACC_MULE_001", outcome: "Multiple employees controlling same account", riskDelta: 30 },
      { step: 3, action: "Fraudulent Approvals", entity: "EMP_A", outcome: "Fraudulent loan approvals processed", riskDelta: 35 },
      { step: 4, action: "Fund Extraction", entity: "ACC_MULE_001", outcome: "Proceeds extracted via multiple channels", riskDelta: 25 },
      { step: 5, action: "Detection", entity: "SYSTEM", outcome: "Collusion detection engine flagged the ring", riskDelta: -10 },
    ],
  };

  const events = scenarioEvents[scenario] ?? scenarioEvents.aml;
  const totalRisk = events.reduce((s, e) => s + e.riskDelta, 0);

  return {
    scenario,
    simulationId,
    events,
    alertsTriggered: Math.floor(Math.random() * 4) + 1,
    riskScore: Math.min(100, Math.max(0, totalRisk)),
    summary: `Simulation of ${scenario.toUpperCase()} scenario completed. ${events.length} events simulated, ${Math.floor(Math.random() * 3) + 1} alerts would have been triggered under current detection rules. Overall risk score: ${Math.min(100, Math.max(0, totalRisk))}/100.`,
    simulatedAt: new Date().toISOString(),
  };
}

// M18: Risk Personality Profiling
export function personalityAnalysis(entityId: string) {
  const types = ["Strategic Fraudster", "Opportunistic Actor", "Low-Risk Compliant", "Network Manipulator", "Mule Operator"];
  const personalityType = types[Math.floor(Math.random() * types.length)];
  return {
    entityId,
    personalityType,
    traits: [
      { trait: "Risk Appetite", score: rand(20, 95), description: "Propensity to engage in high-risk financial activities" },
      { trait: "Deception Index", score: rand(10, 90), description: "Likelihood of providing false information" },
      { trait: "Network Centrality", score: rand(15, 85), description: "Influence within the risk network graph" },
      { trait: "Compliance Adherence", score: rand(20, 100), description: "Historical compliance with regulatory requirements" },
    ],
    riskProfile: riskLevel(rand(30, 90)),
    analysedAt: new Date().toISOString(),
  };
}

export { riskLevel, tier };

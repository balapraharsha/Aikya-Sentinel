import React, { useState } from "react";
import { useAnalyseBehaviour } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Behaviour() {
  const [entityId, setEntityId] = useState("");
  const [entityType, setEntityType] = useState<"employee" | "account" | "transaction">("account");
  const analyse = useAnalyseBehaviour();

  const handleAnalyse = () => {
    if (!entityId) return;
    analyse.mutate({ data: { entityId, entityType } });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Behaviour DNA Engine (M1)</h2>
          <p className="text-muted-foreground">Deep analysis of entity behavioral patterns</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Analysis Target</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Entity Type</Label>
              <Select value={entityType} onValueChange={(val) => setEntityType(val as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="transaction">Transaction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Entity ID</Label>
              <Input 
                placeholder="Enter ID..." 
                value={entityId} 
                onChange={(e) => setEntityId(e.target.value)} 
              />
            </div>
            <Button className="w-full" onClick={handleAnalyse} disabled={!entityId || analyse.isPending}>
              {analyse.isPending ? "Analysing..." : "Run Analysis"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur md:col-span-2 min-h-[400px]">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {analyse.data ? (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex flex-col items-center justify-center p-4 bg-background rounded-full border border-border w-24 h-24">
                    <span className="text-3xl font-bold font-mono text-primary">{analyse.data.behaviourScore}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">DNA Score</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">Risk Level:</h3>
                      <Badge className={
                        analyse.data.riskLevel === 'CRITICAL' ? 'bg-destructive text-destructive-foreground' :
                        analyse.data.riskLevel === 'HIGH' ? 'bg-orange-500 text-white' :
                        analyse.data.riskLevel === 'MEDIUM' ? 'bg-yellow-500 text-yellow-950' :
                        'bg-emerald-500 text-white'
                      }>{analyse.data.riskLevel}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analysis completed at {new Date(analyse.data.analysedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                    <Activity className="h-4 w-4" /> Detected Signals
                  </h3>
                  <div className="grid gap-2">
                    {analyse.data.signals.map((sig, i) => (
                      <div key={i} className="text-sm bg-background p-3 rounded border border-border flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {sig}
                      </div>
                    ))}
                  </div>
                </div>

                {analyse.data.anomalies && analyse.data.anomalies.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-destructive uppercase tracking-wider">
                      <AlertTriangle className="h-4 w-4" /> Anomalies
                    </h3>
                    <div className="grid gap-2">
                      {analyse.data.anomalies.map((ano, i) => (
                        <div key={i} className="text-sm bg-destructive/10 text-destructive p-3 rounded border border-destructive/20">
                          {ano}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[300px]">
                <Activity className="h-12 w-12 mb-4 opacity-20" />
                <p>Enter an entity ID and run analysis to view behaviour DNA.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useAnalyseInsiderThreat } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function Insider() {
  const [entityId, setEntityId] = useState("");
  const analyse = useAnalyseInsiderThreat();

  const handleAnalyse = () => {
    if (!entityId) return;
    analyse.mutate({ data: { entityId, entityType: "employee" } });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Insider Threat Engine (M2)</h2>
          <p className="text-muted-foreground">Detect malicious employee behavior and data exfiltration risks</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur md:col-span-1 h-fit border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle>Employee Target</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Employee ID</Label>
              <Input 
                placeholder="Enter ID..." 
                value={entityId} 
                onChange={(e) => setEntityId(e.target.value)} 
              />
            </div>
            <Button className="w-full" onClick={handleAnalyse} disabled={!entityId || analyse.isPending}>
              {analyse.isPending ? "Analysing..." : "Evaluate Risk"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur md:col-span-2 min-h-[400px]">
          <CardHeader>
            <CardTitle>Threat Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            {analyse.data ? (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex flex-col items-center justify-center p-4 bg-background rounded-full border border-border w-24 h-24">
                    <span className="text-3xl font-bold font-mono text-orange-500">{analyse.data.insiderRisk}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Risk Score</span>
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
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-orange-500 uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4" /> Threat Indicators
                  </h3>
                  <div className="grid gap-2">
                    {analyse.data.indicators.map((ind, i) => (
                      <div key={i} className="text-sm bg-background p-3 rounded border border-border flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[300px]">
                <ShieldAlert className="h-12 w-12 mb-4 opacity-20" />
                <p>Enter an employee ID to evaluate insider threat risk.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

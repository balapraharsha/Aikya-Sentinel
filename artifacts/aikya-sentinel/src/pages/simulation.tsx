import React, { useState } from "react";
import { useRunSimulation } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlaySquare, AlertCircle, ShieldAlert } from "lucide-react";

export default function Simulation() {
  const [scenario, setScenario] = useState<"aml" | "insider_threat" | "collusion">("aml");
  const sim = useRunSimulation();

  const handleRun = () => {
    sim.mutate({ data: { scenario } });
  };

  return (
    <div className="p-8 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fraud Simulation Mode (M17)</h2>
          <p className="text-muted-foreground">War-game specific threat scenarios against the system</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4 flex-1">
        <Card className="bg-card/50 backdrop-blur md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Scenario Config</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Threat Scenario</Label>
              <Select value={scenario} onValueChange={(val) => setScenario(val as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aml">AML/Structuring</SelectItem>
                  <SelectItem value="insider_threat">Insider Threat</SelectItem>
                  <SelectItem value="collusion">Multi-party Collusion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 bg-muted/50 rounded text-sm text-muted-foreground border border-border">
              Simulates a complex sequence of events to test detection thresholds and alert generation.
            </div>

            <Button className="w-full" onClick={handleRun} disabled={sim.isPending} variant="destructive">
              {sim.isPending ? "Simulating..." : "Launch Simulation"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur md:col-span-3 min-h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle>Simulation Telemetry</CardTitle>
            <CardDescription>Real-time event log and detection status</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {sim.data ? (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-background border border-border rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Scenario</div>
                    <div className="font-medium capitalize">{sim.data.scenario.replace('_', ' ')}</div>
                  </div>
                  <div className="p-4 bg-background border border-border rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Alerts Triggered</div>
                    <div className="text-2xl font-bold text-destructive flex items-center justify-center gap-2">
                      {sim.data.alertsTriggered} <ShieldAlert className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 bg-background border border-border rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Final Risk Score</div>
                    <div className="text-2xl font-mono text-orange-500">{sim.data.riskScore}</div>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 border border-border rounded-lg">
                  <p className="text-sm">{sim.data.summary}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Event Log</h3>
                  <div className="space-y-2">
                    {sim.data.events.map((ev, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 bg-background rounded border border-border text-sm">
                        <Badge variant="outline" className="font-mono bg-muted shrink-0">STEP {ev.step}</Badge>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{ev.action}</span>
                            {ev.riskDelta && (
                              <span className="text-xs font-mono text-destructive">+{ev.riskDelta} Risk</span>
                            )}
                          </div>
                          <div className="text-muted-foreground text-xs flex justify-between">
                            <span>Entity: {ev.entity}</span>
                            <span>{ev.outcome}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[400px]">
                <PlaySquare className="h-12 w-12 mb-4 opacity-20" />
                <p>Select a scenario and launch simulation to generate telemetry.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

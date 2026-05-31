import React, { useState } from "react";
import { useExplainDecision } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function XAI() {
  const [entityId, setEntityId] = useState("");
  const [modelType, setModelType] = useState("fraud_intent");
  const explain = useExplainDecision();

  const handleExplain = () => {
    if (!entityId) return;
    explain.mutate({ data: { entityId, modelType } });
  };

  const chartData = explain.data?.topFeatures.map(f => ({
    name: f.feature,
    value: f.importance,
    direction: f.direction
  })) || [];

  return (
    <div className="p-8 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Explainable AI (M11)</h2>
          <p className="text-muted-foreground">Model transparency and decision feature importance</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4 flex-1">
        <Card className="bg-card/50 backdrop-blur md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Explanation Target</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Model Type</Label>
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fraud_intent">Fraud Intent</SelectItem>
                  <SelectItem value="behaviour_dna">Behaviour DNA</SelectItem>
                  <SelectItem value="insider_threat">Insider Threat</SelectItem>
                  <SelectItem value="tax_risk">Tax Risk</SelectItem>
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
            <Button className="w-full" onClick={handleExplain} disabled={!entityId || explain.isPending}>
              {explain.isPending ? "Generating..." : "Explain Decision"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur md:col-span-3 min-h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle>SHAP Feature Importance</CardTitle>
            <CardDescription>Top features driving the model prediction</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {explain.data ? (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="p-4 bg-muted/50 rounded-lg border border-border flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm leading-relaxed">{explain.data.explanation}</p>
                </div>

                <div className="flex-1 min-h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={90} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}
                        cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.direction === 'positive' ? 'hsl(var(--destructive))' : 'hsl(var(--chart-2))'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-sm" /> Drives risk higher
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-chart-2 rounded-sm" /> Mitigates risk
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                <BrainCircuit className="h-12 w-12 mb-4 opacity-20" />
                <p>Request an explanation to view model internals.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useAnalyseRiskRadar } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Radar as RadarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RiskRadarView() {
  const [entityId, setEntityId] = useState("");
  const [entityType, setEntityType] = useState<"employee" | "account" | "transaction">("account");
  const analyse = useAnalyseRiskRadar();

  const handleAnalyse = () => {
    if (!entityId) return;
    analyse.mutate({ data: { entityId, entityType } });
  };

  const radarData = analyse.data ? [
    { subject: 'Fraud', A: analyse.data.fraudScore, fullMark: 100 },
    { subject: 'AML', A: analyse.data.amlScore, fullMark: 100 },
    { subject: 'Behaviour', A: analyse.data.behaviourScore, fullMark: 100 },
    { subject: 'Tax', A: analyse.data.taxScore, fullMark: 100 },
    { subject: 'Network', A: analyse.data.networkScore, fullMark: 100 },
  ] : [];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'BLACK': return 'bg-red-900 text-white border-red-900';
      case 'RED': return 'bg-red-600 text-white border-red-600';
      case 'AMBER': return 'bg-amber-500 text-amber-950 border-amber-500';
      case 'GREEN': return 'bg-emerald-500 text-white border-emerald-500';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Risk Radar (M10)</h2>
          <p className="text-muted-foreground">Aggregated multidimensional entity risk assessment</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Target Selection</CardTitle>
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
              {analyse.isPending ? "Scanning..." : "Scan Entity"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur md:col-span-2 min-h-[500px]">
          <CardHeader>
            <CardTitle>Multidimensional Risk Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {analyse.data ? (
              <div className="grid grid-cols-2 gap-8 items-center">
                <div className="h-[400px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Radar name="Risk" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                  
                  {/* Center Score Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 backdrop-blur ${getTierColor(analyse.data.tier).split(' ')[2]}`}>
                      <span className="text-2xl font-bold font-mono">{analyse.data.overallScore}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Overall Assessment</h3>
                    <div className={`px-4 py-3 rounded-lg border flex items-center justify-between ${getTierColor(analyse.data.tier)}`}>
                      <span className="font-bold">TIER {analyse.data.tier} RISK</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Vector Scores</h3>
                    {radarData.map((d) => (
                      <div key={d.subject} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{d.subject}</span>
                          <span className="font-mono">{d.A}/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${d.A > 75 ? 'bg-destructive' : d.A > 50 ? 'bg-orange-500' : 'bg-primary'}`} 
                            style={{ width: `${d.A}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[400px]">
                <RadarIcon className="h-16 w-16 mb-4 opacity-20" />
                <p>Run a radar scan to build the multidimensional risk profile.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

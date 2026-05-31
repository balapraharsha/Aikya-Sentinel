import React, { useState } from "react";
import { useGenerateReport, useListReports } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function Reports() {
  const [entityId, setEntityId] = useState("");
  const [entityType, setEntityType] = useState("account");
  const [reportType, setReportType] = useState<"investigation" | "sar" | "aml_summary" | "risk_profile">("investigation");
  
  const generate = useGenerateReport();
  const { data: pastReports, refetch } = useListReports();

  const handleGenerate = () => {
    if (!entityId) return;
    generate.mutate(
      { data: { entityId, entityType, reportType } },
      { onSuccess: () => refetch() }
    );
  };

  return (
    <div className="p-8 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Narrative Generator (M15)</h2>
          <p className="text-muted-foreground">Automated generation of SARs and investigation reports</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4 flex-1">
        <Card className="bg-card/50 backdrop-blur md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Generator Config</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={(val) => setReportType(val as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investigation">Investigation Report</SelectItem>
                  <SelectItem value="sar">Suspicious Activity (SAR)</SelectItem>
                  <SelectItem value="aml_summary">AML Summary</SelectItem>
                  <SelectItem value="risk_profile">Risk Profile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Entity Type</Label>
              <Select value={entityType} onValueChange={setEntityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity type" />
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
            <Button className="w-full" onClick={handleGenerate} disabled={!entityId || generate.isPending}>
              {generate.isPending ? "Generating..." : "Generate Narrative"}
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-6 flex flex-col">
          {generate.data && (
            <Card className="bg-card/50 backdrop-blur border-primary">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" /> Report Generated
                  </CardTitle>
                  <CardDescription className="font-mono text-xs mt-1">ID: {generate.data.reportId}</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Export PDF
                </Button>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Executive Narrative</h4>
                  <p className="text-sm leading-relaxed p-4 bg-muted/50 rounded border border-border">
                    {generate.data.narrative}
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Key Findings</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1 text-foreground">
                      {generate.data.findings.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recommendations</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1 text-foreground">
                      {generate.data.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card/50 backdrop-blur flex-1">
            <CardHeader>
              <CardTitle>Report Archive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pastReports?.map((r) => (
                  <div key={r.reportId} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-sm capitalize">{r.reportType.replace('_', ' ')}: {r.entityId}</div>
                        <div className="text-xs text-muted-foreground font-mono">{r.reportId}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {r.riskLevel && (
                        <Badge variant="outline" className={r.riskLevel === 'CRITICAL' ? 'text-destructive border-destructive' : ''}>
                          {r.riskLevel}
                        </Badge>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(r.generatedAt), "MMM d, yyyy HH:mm")}
                      </div>
                    </div>
                  </div>
                ))}
                {pastReports?.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No past reports found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

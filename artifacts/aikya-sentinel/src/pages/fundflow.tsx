import React, { useState } from "react";
import { useAnalyseFundFlow } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GitMerge, Map as MapIcon } from "lucide-react";

export default function FundFlow() {
  const [accountId, setAccountId] = useState("");
  const [depth, setDepth] = useState("3");
  const analyse = useAnalyseFundFlow();

  const handleAnalyse = () => {
    if (!accountId) return;
    analyse.mutate({ data: { accountId, depth: parseInt(depth) } });
  };

  return (
    <div className="p-8 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fund Flow Intelligence (M3)</h2>
          <p className="text-muted-foreground">Detect money laundering typologies and trace transaction networks</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4 flex-1">
        <Card className="bg-card/50 backdrop-blur md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Trace Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Source Account ID</Label>
              <Input 
                placeholder="Enter ID..." 
                value={accountId} 
                onChange={(e) => setAccountId(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>Trace Depth (hops)</Label>
              <Input 
                type="number"
                min="1"
                max="10"
                value={depth} 
                onChange={(e) => setDepth(e.target.value)} 
              />
            </div>
            <Button className="w-full" onClick={handleAnalyse} disabled={!accountId || analyse.isPending}>
              {analyse.isPending ? "Tracing..." : "Start Trace"}
            </Button>

            {analyse.data && (
              <div className="mt-8 space-y-4 border-t border-border pt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Detected Typologies</h4>
                <div className="space-y-2">
                  {analyse.data.patterns.map((p, i) => (
                    <div key={i} className="p-3 bg-muted/50 rounded border border-border text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground capitalize">{p.type.replace('_', ' ')}</span>
                        <Badge variant={p.detected ? "destructive" : "outline"} className={p.detected ? "" : "opacity-50"}>
                          {(p.confidence * 100).toFixed(0)}% Match
                        </Badge>
                      </div>
                      {p.detected && p.description && (
                        <p className="text-xs text-muted-foreground mt-2">{p.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur md:col-span-3 min-h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>Network Topology</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative">
            {analyse.data ? (
              <div className="absolute inset-0 m-6 border border-border rounded-lg bg-black/40 overflow-hidden flex items-center justify-center">
                {/* Placeholder for actual graph visualization */}
                <div className="text-center space-y-4 text-muted-foreground">
                  <MapIcon className="w-16 h-16 mx-auto opacity-20" />
                  <p>Graph Visualization</p>
                  <p className="text-sm font-mono">
                    {analyse.data.nodes.length} Nodes • {analyse.data.edges.length} Edges
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <GitMerge className="h-12 w-12 mb-4 opacity-20" />
                <p>Run a trace to visualize the fund flow network.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

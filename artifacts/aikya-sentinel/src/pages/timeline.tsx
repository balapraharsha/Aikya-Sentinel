import React, { useState } from "react";
import { useFetchEntityTimeline } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { History, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function Timeline() {
  const [entityId, setEntityId] = useState("");
  const { data: timeline, isLoading, refetch } = useFetchEntityTimeline(entityId, { query: { enabled: false } });

  const handleFetch = () => {
    if (entityId) refetch();
  };

  return (
    <div className="p-8 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Timeline Tracker (M12)</h2>
          <p className="text-muted-foreground">Chronological audit trail of entity activities</p>
        </div>
      </div>
      
      <Card className="bg-card/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex items-end gap-4 max-w-2xl">
            <div className="space-y-2 flex-1">
              <Label>Entity ID</Label>
              <Input 
                placeholder="Enter ID to fetch timeline..." 
                value={entityId} 
                onChange={(e) => setEntityId(e.target.value)} 
              />
            </div>
            <Button onClick={handleFetch} disabled={!entityId || isLoading}>
              {isLoading ? "Fetching..." : "Fetch Timeline"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Event History</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          {timeline ? (
            <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {timeline.events.map((event, i) => (
                <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-background bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className={`w-2 h-2 rounded-full ${
                      event.riskImpact === 'CRITICAL' ? 'bg-destructive' :
                      event.riskImpact === 'HIGH' ? 'bg-orange-500' :
                      event.riskImpact === 'MEDIUM' ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`} />
                  </div>
                  
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-border bg-background shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm text-foreground flex items-center gap-2">
                        {event.eventType}
                      </div>
                      <time className="text-xs font-mono text-muted-foreground">{format(new Date(event.timestamp), "MMM d, HH:mm")}</time>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">{event.description}</div>
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${
                      event.riskImpact === 'CRITICAL' ? 'text-destructive border-destructive/30 bg-destructive/10' :
                      event.riskImpact === 'HIGH' ? 'text-orange-500 border-orange-500/30 bg-orange-500/10' :
                      event.riskImpact === 'MEDIUM' ? 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10' : 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10'
                    }`}>
                      {event.riskImpact} IMPACT
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[300px]">
              <History className="h-12 w-12 mb-4 opacity-20" />
              <p>Enter an entity ID to reconstruct timeline.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

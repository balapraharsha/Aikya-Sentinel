import React from "react";
import { useListAlerts } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ShieldAlert, Info, AlertTriangle, Flame } from "lucide-react";

const severityConfig = {
  CRITICAL: { color: "bg-destructive text-destructive-foreground", icon: Flame },
  HIGH: { color: "bg-orange-500 text-white", icon: AlertTriangle },
  MEDIUM: { color: "bg-yellow-500 text-yellow-950", icon: ShieldAlert },
  LOW: { color: "bg-emerald-500 text-white", icon: Info },
};

export default function Alerts() {
  const { data: alerts, isLoading } = useListAlerts();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Alert Management</h2>
        <Button variant="default">Generate Report</Button>
      </div>
      
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts?.map((alert) => {
                  const SevIcon = severityConfig[alert.severity as keyof typeof severityConfig]?.icon || Info;
                  return (
                    <TableRow key={alert.id} className="border-border">
                      <TableCell className="font-mono text-xs">{alert.alertId}</TableCell>
                      <TableCell>
                        <Badge className={`${severityConfig[alert.severity as keyof typeof severityConfig]?.color} flex w-fit items-center gap-1`}>
                          <SevIcon className="w-3 h-3" />
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.category}</TableCell>
                      <TableCell>{alert.entityType} ({alert.entityId})</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${alert.riskScore && alert.riskScore > 80 ? 'bg-destructive' : 'bg-primary'}`} 
                              style={{ width: `${alert.riskScore || 0}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono">{alert.riskScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(alert.createdAt), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Investigate</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {alerts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No active alerts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

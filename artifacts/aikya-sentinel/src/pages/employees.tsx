import React from "react";
import { useListEmployees } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Employees() {
  const { data: employees, isLoading } = useListEmployees();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Employee Risk View</h2>
      </div>
      
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Monitored Employees</CardTitle>
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
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees?.map((emp) => (
                  <TableRow key={emp.id} className="border-border">
                    <TableCell className="font-mono text-xs">{emp.employeeId}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${emp.trustScore && emp.trustScore < 50 ? 'bg-destructive' : 'bg-emerald-500'}`} 
                            style={{ width: `${emp.trustScore || 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono">{emp.trustScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        emp.riskLevel === 'CRITICAL' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                        emp.riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-500 border-orange-500/30' :
                        emp.riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                        'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                      }>
                        {emp.riskLevel || 'LOW'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Investigate</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {employees?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No employees found
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

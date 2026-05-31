import React, { useState } from "react";
import { useListCases, useCreateCase, useUpdateCase } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Briefcase, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const statusConfig = {
  OPEN: { color: "bg-blue-500/20 text-blue-500 border-blue-500/30", icon: AlertCircle },
  IN_PROGRESS: { color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30", icon: Clock },
  CLOSED: { color: "bg-green-500/20 text-green-500 border-green-500/30", icon: CheckCircle2 },
  ESCALATED: { color: "bg-red-500/20 text-red-500 border-red-500/30", icon: AlertCircle },
};

export default function Cases() {
  const { data: cases, isLoading } = useListCases();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Case Management</h2>
        <Button variant="default">Create Case</Button>
      </div>
      
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Active Investigations</CardTitle>
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
                  <TableHead>Case ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases?.map((c) => {
                  const StatIcon = statusConfig[c.status as keyof typeof statusConfig]?.icon || Briefcase;
                  return (
                    <TableRow key={c.id} className="border-border">
                      <TableCell className="font-mono text-xs">{c.caseId}</TableCell>
                      <TableCell className="font-medium">{c.title || "Untitled Case"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${statusConfig[c.status as keyof typeof statusConfig]?.color} flex w-fit items-center gap-1`}>
                          <StatIcon className="w-3 h-3" />
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                          {c.priority || "NORMAL"}
                        </Badge>
                      </TableCell>
                      <TableCell>{c.assignedTo || "Unassigned"}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(c.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {cases?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No cases found
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

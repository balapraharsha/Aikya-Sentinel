import React from "react";
import { useListAccounts } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Accounts() {
  const { data: accounts, isLoading } = useListAccounts();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Account Risk View</h2>
      </div>
      
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Monitored Accounts</CardTitle>
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
                  <TableHead>Account ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts?.map((acc) => (
                  <TableRow key={acc.id} className="border-border">
                    <TableCell className="font-mono text-xs">{acc.accountId}</TableCell>
                    <TableCell className="font-medium">{acc.customerName}</TableCell>
                    <TableCell>{acc.accountType}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={acc.kycStatus === 'VERIFIED' ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10' : 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10'}>
                        {acc.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${acc.riskScore && acc.riskScore > 80 ? 'bg-destructive' : 'bg-primary'}`} 
                            style={{ width: `${acc.riskScore || 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono">{acc.riskScore}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">
                      {acc.balance !== undefined && acc.balance !== null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(acc.balance) : '-'}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View Risk Profile</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {accounts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No accounts found
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

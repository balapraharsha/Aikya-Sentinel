import React from "react";
import { useListUsers, useGetMe } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

export default function Settings() {
  const { data: users, isLoading } = useListUsers();
  const { data: me } = useGetMe();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Current Operator</CardTitle>
            <CardDescription>Your session details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center space-y-4 pt-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarFallback className="text-xl bg-muted text-foreground">
                {me?.name?.substring(0, 2).toUpperCase() || "OP"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">{me?.name || "Loading..."}</h3>
              <p className="text-sm text-muted-foreground">{me?.email}</p>
              <div className="pt-2">
                <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-xs">
                  {me?.role?.replace("_", " ")}
                </Badge>
              </div>
            </div>
            {me && (
              <div className="w-full mt-4 p-3 bg-muted/30 rounded border border-border text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operator ID</span>
                  <span className="font-mono">{me.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Clearance</span>
                  <span className="font-mono">Level {me.role === 'admin' ? '5' : '3'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Started</span>
                  <span className="font-mono">{format(new Date(), "HH:mm:ss")}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur md:col-span-2">
          <CardHeader>
            <CardTitle>Platform Access Log</CardTitle>
            <CardDescription>Registered system operators</CardDescription>
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
                    <TableHead>Operator</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell className="font-medium flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {user.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-muted-foreground/30 text-xs">
                          {user.role.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm font-mono">
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

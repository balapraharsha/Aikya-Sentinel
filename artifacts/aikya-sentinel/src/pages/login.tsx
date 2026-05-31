import { useState } from "react";
import { useLogin } from "@workspace/api-client-react";
import { saveAuth, type AuthUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2, AlertCircle } from "lucide-react";

interface LoginProps {
  onLogin: (user: AuthUser) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("admin@aikya.io");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);

  const login = useLogin({
    mutation: {
      onSuccess: (data: any) => {
        saveAuth(data.accessToken, data.user);
        onLogin(data.user);
      },
      onError: () => {
        setError("Invalid email or password. Use admin@aikya.io / password123");
      },
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    login.mutate({ data: { email, password } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background" data-testid="login-page">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Aikya Sentinel</h1>
              <p className="text-xs text-muted-foreground">Financial Intelligence Platform</p>
            </div>
          </div>
        </div>

        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Sign in to your workspace</CardTitle>
            <CardDescription>
              Enter your credentials to access the Sentinel dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="analyst@institution.com"
                  autoComplete="email"
                  data-testid="input-email"
                  className="bg-muted/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  data-testid="input-password"
                  className="bg-muted/30"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-xs text-destructive" data-testid="login-error">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={login.isPending}
                data-testid="button-login"
              >
                {login.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Authenticating...</>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-5 pt-4 border-t border-border/40">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Demo accounts:</p>
              <div className="space-y-1 text-xs text-muted-foreground font-mono">
                <div className="flex justify-between"><span>admin@aikya.io</span><span className="text-muted-foreground/60">admin</span></div>
                <div className="flex justify-between"><span>sarah.chen@aikya.io</span><span className="text-muted-foreground/60">compliance_officer</span></div>
                <div className="flex justify-between"><span>marcus.webb@aikya.io</span><span className="text-muted-foreground/60">investigator</span></div>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-2">All accounts use password: <span className="font-mono">password123</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

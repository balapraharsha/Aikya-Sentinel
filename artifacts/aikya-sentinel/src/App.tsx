import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import { getStoredUser, initAuthTokenGetter, type AuthUser } from "@/lib/auth";

import Dashboard from "@/pages/dashboard";
import Alerts from "@/pages/alerts";
import Cases from "@/pages/cases";
import Transactions from "@/pages/transactions";
import Accounts from "@/pages/accounts";
import Employees from "@/pages/employees";
import Settings from "@/pages/settings";
import Behaviour from "@/pages/behaviour";
import Insider from "@/pages/insider";
import FundFlow from "@/pages/fundflow";
import RiskRadar from "@/pages/riskradar";
import XAI from "@/pages/xai";
import Timeline from "@/pages/timeline";
import Copilot from "@/pages/copilot";
import Simulation from "@/pages/simulation";
import Reports from "@/pages/reports";

initAuthTokenGetter();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.status === 401) return false;
        return failureCount < 2;
      },
    },
  },
});

function Router({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  return (
    <AppLayout user={user} onLogout={onLogout}>
      <Switch>
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/cases" component={Cases} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/employees" component={Employees} />
        <Route path="/settings" component={Settings} />
        <Route path="/ai/behaviour" component={Behaviour} />
        <Route path="/ai/insider" component={Insider} />
        <Route path="/ai/fundflow" component={FundFlow} />
        <Route path="/ai/riskradar" component={RiskRadar} />
        <Route path="/ai/xai" component={XAI} />
        <Route path="/ai/timeline" component={Timeline} />
        <Route path="/ai/copilot" component={Copilot} />
        <Route path="/ai/simulation" component={Simulation} />
        <Route path="/ai/reports" component={Reports} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  function handleLogin(u: AuthUser) {
    setUser(u);
    queryClient.clear();
  }

  function handleLogout() {
    import("@/lib/auth").then(({ clearAuth }) => clearAuth());
    setUser(null);
    queryClient.clear();
  }

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <Login onLogin={handleLogin} />
        <Toaster />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router user={user} onLogout={handleLogout} />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

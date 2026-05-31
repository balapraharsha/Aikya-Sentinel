import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarInset
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BellRing,
  Briefcase,
  ArrowLeftRight,
  Users,
  UserSquare2,
  Activity,
  ShieldAlert,
  GitMerge,
  Radar,
  BrainCircuit,
  History,
  Bot,
  PlaySquare,
  FileText,
  Settings,
  ShieldCheck,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { AuthUser } from "@/lib/auth";

const navItems = [
  { group: "CORE", items: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Alerts", url: "/alerts", icon: BellRing },
    { title: "Cases", url: "/cases", icon: Briefcase },
    { title: "Transactions", url: "/transactions", icon: ArrowLeftRight },
    { title: "Accounts", url: "/accounts", icon: Users },
    { title: "Employees", url: "/employees", icon: UserSquare2 },
  ]},
  { group: "AI ENGINES", items: [
    { title: "Behaviour DNA", url: "/ai/behaviour", icon: Activity },
    { title: "Insider Threat", url: "/ai/insider", icon: ShieldAlert },
    { title: "Fund Flow", url: "/ai/fundflow", icon: GitMerge },
    { title: "Risk Radar", url: "/ai/riskradar", icon: Radar },
    { title: "Explainable AI", url: "/ai/xai", icon: BrainCircuit },
    { title: "Timeline Tracker", url: "/ai/timeline", icon: History },
  ]},
  { group: "TOOLS", items: [
    { title: "Copilot", url: "/ai/copilot", icon: Bot },
    { title: "Simulation", url: "/ai/simulation", icon: PlaySquare },
    { title: "Reports", url: "/ai/reports", icon: FileText },
    { title: "Settings", url: "/settings", icon: Settings },
  ]}
];

interface AppLayoutProps {
  children: React.ReactNode;
  user: AuthUser;
  onLogout: () => void;
}

export function AppLayout({ children, user, onLogout }: AppLayoutProps) {
  const [location] = useLocation();

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "OP";

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border bg-sidebar">
        <SidebarHeader className="flex flex-row items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">Aikya Sentinel</span>
            <span className="text-xs text-muted-foreground leading-tight">Financial Intelligence</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {navItems.map((group) => (
            <SidebarGroup key={group.group}>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground tracking-wider px-2">
                {group.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location === item.url || (item.url !== "/dashboard" && location.startsWith(item.url))}
                        tooltip={item.title}
                      >
                        <Link href={item.url} className="flex items-center gap-2" data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <div className="mt-auto border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-sidebar-border shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-medium truncate">{user.name}</span>
              <span className="text-xs text-muted-foreground truncate">{user.role.replace(/_/g, " ")}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={onLogout}
              data-testid="button-logout"
              title="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="flex-1 bg-background">
        <main className="h-full flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

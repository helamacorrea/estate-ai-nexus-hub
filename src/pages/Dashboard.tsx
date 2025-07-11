
import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent, 
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { 
  Settings, 
  Calendar, 
  Link as LinkIcon, 
  User, 
  MessageSquare, 
  BarChart3, 
  Users,
  LogOut,
  Bell,
  Search
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  
  useEffect(() => {
    // Set page title based on current route
    const path = location.pathname.split("/").pop() || "";
    setPageTitle(
      path === "dashboard" ? "Dashboard" :
      path === "connections" ? "Conexões de API" :
      path === "bot-settings" ? "Configurações do Bot" :
      path === "account" ? "Sua Conta" :
      path === "test-bot" ? "Testar Bot" :
      path === "results" ? "Resultados e Análises" :
      path === "customers" ? "Clientes" :
      path === "add-gabbi" ? "Adicionar Gabbi" : "Dashboard"
    );
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Resultados", path: "/dashboard/results", icon: BarChart3 },
    { name: "Conexões", path: "/dashboard/connections", icon: LinkIcon },
    { name: "Configurações do Bot", path: "/dashboard/bot-settings", icon: Settings },
    { name: "Testar Bot", path: "/dashboard/test-bot", icon: MessageSquare },
    { name: "Clientes", path: "/dashboard/customers", icon: Users },
    { name: "Adicionar Gabbi", path: "/dashboard/add-gabbi", icon: MessageSquare },
    { name: "Conta", path: "/dashboard/account", icon: User },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <div className="flex h-16 items-center border-b px-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0A1828]">
                <span className="text-lg font-bold text-[#0FFCBE]">G</span>
              </div>
              <span className="text-lg font-bold">GabbiAI</span>
            </div>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.path} 
                          className={({ isActive }) => 
                            isActive ? "text-sidebar-primary font-medium" : ""
                          }
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          <span>{item.name}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{user?.name || "Usuário"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "usuario@exemplo.com"}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{pageTitle}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-4 py-2 text-sm font-medium">Notificações</div>
                  <Separator />
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Novo lead capturado</span>
                      <span className="text-xs text-gray-500">5 minutos atrás</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Reunião agendada</span>
                      <span className="text-xs text-gray-500">1 hora atrás</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-medium">Resultados da campanha prontos</span>
                      <span className="text-xs text-gray-500">Ontem</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Separator orientation="vertical" className="h-8" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                      <div className="text-sm font-medium">{user?.name || "Usuário"}</div>
                      <div className="text-xs text-muted-foreground">{user?.company || "Imobiliária Pro"}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => navigate("/dashboard/account")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Conta</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/dashboard/bot-settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem onSelect={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

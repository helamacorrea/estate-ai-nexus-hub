
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalendarDays, Database, Lock, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Connection {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected";
  icon: React.ElementType;
  key?: string;
  webhookUrl?: string;
  calendars?: string[];
}

const Connections = () => {
  const [connections, setConnections] = useState<Connection[]>([
    { id: "1", name: "Salesforce CRM", type: "crm", status: "connected", icon: Database },
    { id: "2", name: "Google Calendar", type: "calendar", status: "connected", icon: CalendarDays, calendars: ["", "", "", "", ""] },
    { id: "3", name: "HubSpot", type: "crm", status: "disconnected", icon: Users },
    { id: "4", name: "Microsoft Calendar", type: "calendar", status: "disconnected", icon: CalendarDays },
    { id: "5", name: "Zoho CRM", type: "crm", status: "disconnected", icon: Database },
  ]);

  const [webhookUrl, setWebhookUrl] = useState<Record<string, string>>({});

  const handleConnectToggle = (id: string, currentStatus: "connected" | "disconnected") => {
    if (currentStatus === "connected") {
      // If already connected, just disconnect
      setConnections(connections.map(conn => 
        conn.id === id ? { ...conn, status: "disconnected" } : conn
      ));
      
      toast({
        title: "Desconectado",
        description: `Desconectado com sucesso da integração`,
      });
    } else {
      // If disconnected, update based on webhook URL
      if (!webhookUrl[id] && id !== "2") {
        toast({
          title: "Erro",
          description: "URL do webhook é necessária",
          variant: "destructive",
        });
        return;
      }
      
      setConnections(connections.map(conn => 
        conn.id === id ? { 
          ...conn, 
          status: "connected", 
          webhookUrl: webhookUrl[id]
        } : conn
      ));
      
      toast({
        title: "Conectado",
        description: `Conectado com sucesso a ${connections.find(c => c.id === id)?.name}`,
      });
    }
  };

  const handleSaveWebhook = (id: string) => {
    if (!webhookUrl[id]) {
      toast({
        title: "Erro",
        description: "URL do webhook é necessária",
        variant: "destructive",
      });
      return;
    }
    
    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, webhookUrl: webhookUrl[id] } : conn
    ));
    
    toast({
      title: "Webhook Salvo",
      description: `URL do webhook para ${connections.find(c => c.id === id)?.name} salva com sucesso`,
    });
  };

  const handleCalendarChange = (id: string, index: number, value: string) => {
    setConnections(connections.map(conn => 
      conn.id === id ? {
        ...conn,
        calendars: (conn.calendars || ["", "", "", "", ""]).map((cal, idx) => 
          idx === index ? value : cal
        )
      } : conn
    ));
  };

  const handleSaveCalendars = (id: string) => {
    const googleCalendar = connections.find(c => c.id === id);
    if (!googleCalendar || !googleCalendar.calendars || googleCalendar.calendars.every(cal => !cal)) {
      toast({
        title: "Erro",
        description: "Pelo menos um calendário deve ser adicionado",
        variant: "destructive",
      });
      return;
    }

    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, status: "connected" } : conn
    ));
    
    toast({
      title: "Calendários Salvos",
      description: `Calendários para ${googleCalendar.name} salvos com sucesso`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Conexões de API</h2>
        <p className="text-muted-foreground">
          Conecte seus sistemas de CRM e calendário para automatizar a gestão de leads e agendamentos
        </p>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="other">Outros</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {connections.map((connection) => (
              <Card key={connection.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <connection.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{connection.name}</CardTitle>
                      <CardDescription>
                        {connection.type === "crm" ? "Gestão de Relacionamento com Cliente" : "Integração de Calendário"}
                      </CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={connection.status === "connected"}
                    onCheckedChange={() => handleConnectToggle(connection.id, connection.status)}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <span className={`text-sm ${connection.status === "connected" ? "text-green-500" : "text-gray-500"}`}>
                      {connection.status === "connected" ? "Conectado" : "Desconectado"}
                    </span>
                    
                    {connection.id === "2" ? (
                      <div className="space-y-3">
                        <Label>Adicione até 5 Calendários do Google:</Label>
                        {connection.calendars?.map((cal, index) => (
                          <Input
                            key={index}
                            value={cal}
                            onChange={(e) => handleCalendarChange(connection.id, index, e.target.value)}
                            placeholder={`URL do Calendário ${index + 1}`}
                          />
                        ))}
                        <Button 
                          className="w-full mt-2" 
                          onClick={() => handleSaveCalendars(connection.id)}
                        >
                          Adicionar Calendários
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Label htmlFor={`webhook-${connection.id}`}>URL do Webhook:</Label>
                        <div className="flex">
                          <Input 
                            id={`webhook-${connection.id}`}
                            value={webhookUrl[connection.id] || ""}
                            onChange={(e) => setWebhookUrl({...webhookUrl, [connection.id]: e.target.value})}
                            placeholder="https://seu-webhook-url.com"
                            className="flex-1"
                          />
                          <Button variant="ghost" size="icon" className="ml-2">
                            <Lock className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleSaveWebhook(connection.id)}
                        >
                          Adicionar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="crm" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {connections.filter(conn => conn.type === "crm").map((connection) => (
              <Card key={connection.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <connection.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{connection.name}</CardTitle>
                      <CardDescription>Gestão de Relacionamento com Cliente</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={connection.status === "connected"}
                    onCheckedChange={() => handleConnectToggle(connection.id, connection.status)}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <span className={`text-sm ${connection.status === "connected" ? "text-green-500" : "text-gray-500"}`}>
                      {connection.status === "connected" ? "Conectado" : "Desconectado"}
                    </span>
                    
                    <div className="space-y-3">
                      <Label htmlFor={`webhook-${connection.id}`}>URL do Webhook:</Label>
                      <div className="flex">
                        <Input 
                          id={`webhook-${connection.id}`}
                          value={webhookUrl[connection.id] || ""}
                          onChange={(e) => setWebhookUrl({...webhookUrl, [connection.id]: e.target.value})}
                          placeholder="https://seu-webhook-url.com"
                          className="flex-1"
                        />
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Lock className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleSaveWebhook(connection.id)}
                      >
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="calendar" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {connections.filter(conn => conn.type === "calendar").map((connection) => (
              <Card key={connection.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <connection.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{connection.name}</CardTitle>
                      <CardDescription>Integração de Calendário</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={connection.status === "connected"}
                    onCheckedChange={() => handleConnectToggle(connection.id, connection.status)}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <span className={`text-sm ${connection.status === "connected" ? "text-green-500" : "text-gray-500"}`}>
                      {connection.status === "connected" ? "Conectado" : "Desconectado"}
                    </span>
                    
                    {connection.id === "2" ? (
                      <div className="space-y-3">
                        <Label>Adicione até 5 Calendários do Google:</Label>
                        {connection.calendars?.map((cal, index) => (
                          <Input
                            key={index}
                            value={cal}
                            onChange={(e) => handleCalendarChange(connection.id, index, e.target.value)}
                            placeholder={`URL do Calendário ${index + 1}`}
                          />
                        ))}
                        <Button 
                          className="w-full mt-2" 
                          onClick={() => handleSaveCalendars(connection.id)}
                        >
                          Adicionar Calendários
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Label htmlFor={`webhook-${connection.id}`}>URL do Webhook:</Label>
                        <div className="flex">
                          <Input 
                            id={`webhook-${connection.id}`}
                            value={webhookUrl[connection.id] || ""}
                            onChange={(e) => setWebhookUrl({...webhookUrl, [connection.id]: e.target.value})}
                            placeholder="https://seu-webhook-url.com"
                            className="flex-1"
                          />
                          <Button variant="ghost" size="icon" className="ml-2">
                            <Lock className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleSaveWebhook(connection.id)}
                        >
                          Adicionar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="other" className="mt-6">
          <div className="flex items-center justify-center p-8 text-center text-muted-foreground">
            <div>
              <p>Nenhuma outra integração disponível ainda.</p>
              <Button variant="outline" className="mt-4">Solicitar Integração</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Connections;

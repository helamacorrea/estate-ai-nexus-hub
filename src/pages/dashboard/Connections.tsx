
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalendarDays, Database, Lock, Settings, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Connection {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected";
  icon: React.ElementType;
  key?: string;
}

const Connections = () => {
  const [connections, setConnections] = useState<Connection[]>([
    { id: "1", name: "Salesforce CRM", type: "crm", status: "connected", icon: Database },
    { id: "2", name: "Google Calendar", type: "calendar", status: "connected", icon: CalendarDays },
    { id: "3", name: "HubSpot", type: "crm", status: "disconnected", icon: Users },
    { id: "4", name: "Microsoft Calendar", type: "calendar", status: "disconnected", icon: CalendarDays },
    { id: "5", name: "Zoho CRM", type: "crm", status: "disconnected", icon: Database },
  ]);

  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [isConfiguring, setIsConfiguring] = useState(false);

  const handleConnectToggle = (id: string, currentStatus: "connected" | "disconnected") => {
    if (currentStatus === "connected") {
      // If already connected, just disconnect
      setConnections(connections.map(conn => 
        conn.id === id ? { ...conn, status: "disconnected" } : conn
      ));
      
      toast({
        title: "Disconnected",
        description: `Successfully disconnected from integration`,
      });
    } else {
      // If disconnected, show the config panel
      const connection = connections.find(conn => conn.id === id);
      if (connection) {
        setSelectedConnection(connection);
        setIsConfiguring(true);
        setApiKey("");
      }
    }
  };

  const handleSaveConfig = () => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "API Key is required",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedConnection) {
      setConnections(connections.map(conn => 
        conn.id === selectedConnection.id ? { ...conn, status: "connected", key: apiKey } : conn
      ));
      
      setIsConfiguring(false);
      setSelectedConnection(null);
      
      toast({
        title: "Connected",
        description: `Successfully connected to ${selectedConnection.name}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">API Connections</h2>
        <p className="text-muted-foreground">
          Connect your CRM and calendar systems to automate lead management and scheduling
        </p>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
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
                        {connection.type === "crm" ? "Customer Relationship Management" : "Calendar Integration"}
                      </CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={connection.status === "connected"}
                    onCheckedChange={() => handleConnectToggle(connection.id, connection.status)}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${connection.status === "connected" ? "text-green-500" : "text-gray-500"}`}>
                      {connection.status === "connected" ? "Connected" : "Disconnected"}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setSelectedConnection(connection)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
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
                      <CardDescription>Customer Relationship Management</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={connection.status === "connected"}
                    onCheckedChange={() => handleConnectToggle(connection.id, connection.status)}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${connection.status === "connected" ? "text-green-500" : "text-gray-500"}`}>
                      {connection.status === "connected" ? "Connected" : "Disconnected"}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setSelectedConnection(connection)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
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
                      <CardDescription>Calendar Integration</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={connection.status === "connected"}
                    onCheckedChange={() => handleConnectToggle(connection.id, connection.status)}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${connection.status === "connected" ? "text-green-500" : "text-gray-500"}`}>
                      {connection.status === "connected" ? "Connected" : "Disconnected"}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => setSelectedConnection(connection)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="other" className="mt-6">
          <div className="flex items-center justify-center p-8 text-center text-muted-foreground">
            <div>
              <p>No other integrations available yet.</p>
              <Button variant="outline" className="mt-4">Request Integration</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {isConfiguring && selectedConnection && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Configure {selectedConnection.name}</CardTitle>
            <CardDescription>
              Enter your API credentials to connect this integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex">
                <Input 
                  id="apiKey" 
                  type="password" 
                  placeholder="Enter your API key" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="ml-2">
                  <Lock className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
              <Input id="webhookUrl" type="text" placeholder="https://your-webhook-url.com" />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch id="syncContacts" />
              <Label htmlFor="syncContacts">Sync contacts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="syncEvents" />
              <Label htmlFor="syncEvents">Sync calendar events</Label>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsConfiguring(false)}>Cancel</Button>
              <Button onClick={handleSaveConfig}>Save Configuration</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Connections;


// Update the customers page to add the modalities
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, MessageSquare, Calendar, User, Phone, Mail } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "hot" | "warm" | "cold";
  lastContact: string;
  avatar?: string;
  budget?: string;
  preferences?: {
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
    location?: string;
  };
  modality?: "agendamento" | "planta" | "temporada" | "captacao";
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@exemplo.com",
      phone: "(11) 98765-4321",
      status: "hot",
      lastContact: "Hoje",
      avatar: "https://i.pravatar.cc/150?img=1",
      budget: "R$ 500.000 - R$ 750.000",
      preferences: {
        bedrooms: 3,
        bathrooms: 2,
        propertyType: "Apartamento",
        location: "Zona Sul"
      },
      modality: "agendamento"
    },
    {
      id: "2",
      name: "Maria Oliveira",
      email: "maria@exemplo.com",
      phone: "(11) 91234-5678",
      status: "warm",
      lastContact: "Ontem",
      avatar: "https://i.pravatar.cc/150?img=5",
      budget: "R$ 300.000 - R$ 450.000",
      preferences: {
        bedrooms: 2,
        bathrooms: 1,
        propertyType: "Apartamento",
        location: "Centro"
      },
      modality: "planta"
    },
    {
      id: "3",
      name: "Carlos Mendes",
      email: "carlos@exemplo.com",
      phone: "(11) 99876-5432",
      status: "cold",
      lastContact: "3 dias atrás",
      avatar: "https://i.pravatar.cc/150?img=3",
      budget: "Até R$ 250.000",
      preferences: {
        bedrooms: 1,
        propertyType: "Studio",
        location: "Zona Oeste"
      },
      modality: "temporada"
    },
    {
      id: "4",
      name: "Ana Souza",
      email: "ana@exemplo.com",
      phone: "(11) 95678-1234",
      status: "hot",
      lastContact: "Hoje",
      budget: "R$ 800.000 - R$ 1.200.000",
      preferences: {
        bedrooms: 4,
        bathrooms: 3,
        propertyType: "Casa",
        location: "Alphaville"
      },
      modality: "captacao"
    },
    {
      id: "5",
      name: "Roberto Santos",
      email: "roberto@exemplo.com",
      phone: "(11) 93456-7890",
      status: "warm",
      lastContact: "2 dias atrás",
      avatar: "https://i.pravatar.cc/150?img=7",
      budget: "R$ 400.000 - R$ 550.000",
      preferences: {
        bedrooms: 2,
        bathrooms: 2,
        propertyType: "Apartamento",
        location: "Zona Norte"
      },
      modality: "agendamento"
    }
  ]);

  const [selectedTab, setSelectedTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot": return "bg-red-500";
      case "warm": return "bg-orange-500";
      case "cold": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "hot": return "Quente";
      case "warm": return "Morno";
      case "cold": return "Frio";
      default: return "Desconhecido";
    }
  };

  const getModalityText = (modality?: string) => {
    switch (modality) {
      case "agendamento": return "Agendamento";
      case "planta": return "Planta";
      case "temporada": return "Temporada";
      case "captacao": return "Captação";
      default: return "N/A";
    }
  };

  const getModalityColor = (modality?: string) => {
    switch (modality) {
      case "agendamento": return "bg-purple-500";
      case "planta": return "bg-green-500";
      case "temporada": return "bg-yellow-500";
      case "captacao": return "bg-pink-500";
      default: return "bg-gray-500";
    }
  };

  const filteredCustomers = selectedTab === "all" 
    ? customers 
    : customers.filter(customer => customer.modality === selectedTab);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Clientes</h2>
        <p className="text-muted-foreground">
          Gerencie os leads capturados pela Gabbi
        </p>
      </div>
      
      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="agendamento">Agendamento</TabsTrigger>
          <TabsTrigger value="planta">Planta</TabsTrigger>
          <TabsTrigger value="temporada">Temporada</TabsTrigger>
          <TabsTrigger value="captacao">Captação</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted p-6 flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-14 w-14 border-2 border-white">
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{customer.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            className={`${getStatusColor(customer.status)} text-white hover:${getStatusColor(customer.status)}`}
                          >
                            {getStatusText(customer.status)}
                          </Badge>
                          <Badge variant="outline">{getModalityText(customer.modality)}</Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar cliente</DropdownMenuItem>
                        <DropdownMenuItem>Ver histórico</DropdownMenuItem>
                        <DropdownMenuItem>Remover</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Orçamento:</p>
                        <p className="text-sm">{customer.budget || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Último Contato:</p>
                        <p className="text-sm">{customer.lastContact}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Preferências:</p>
                      <div className="flex flex-wrap gap-2">
                        {customer.preferences?.bedrooms && (
                          <Badge variant="outline">{customer.preferences.bedrooms} quartos</Badge>
                        )}
                        {customer.preferences?.bathrooms && (
                          <Badge variant="outline">{customer.preferences.bathrooms} banheiros</Badge>
                        )}
                        {customer.preferences?.propertyType && (
                          <Badge variant="outline">{customer.preferences.propertyType}</Badge>
                        )}
                        {customer.preferences?.location && (
                          <Badge variant="outline">{customer.preferences.location}</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between">
                      <div className="flex space-x-2">
                        <a href={`mailto:${customer.email}`}>
                          <Button variant="outline" size="icon" title="Enviar Email">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={`tel:${customer.phone}`}>
                          <Button variant="outline" size="icon" title="Ligar">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button variant="outline" size="icon" title="Chat">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button>Agendar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Customers;

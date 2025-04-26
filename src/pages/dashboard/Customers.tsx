import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MessageCircle, Phone, Edit } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  modality: "Aluguel" | "Compra" | "Informações";
  status: "Lead" | "Qualificado" | "Reunião" | "Contrato" | "Fechado";
  lastContact: string;
  budget: number;
  specifications: {
    bedrooms: number;
    bathrooms: number;
    parkingSpots: number;
  };
}

const customers: Customer[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    location: "Centro",
    modality: "Compra",
    status: "Qualificado",
    lastContact: "2023-04-20",
    budget: 500000,
    specifications: {
      bedrooms: 2,
      bathrooms: 1,
      parkingSpots: 1
    }
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    location: "Westside",
    modality: "Aluguel",
    status: "Lead",
    lastContact: "2023-04-22",
    budget: 300000,
    specifications: {
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 0
    }
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    phone: "(555) 456-7890",
    location: "Eastside",
    modality: "Compra",
    status: "Reunião",
    lastContact: "2023-04-18",
    budget: 750000,
    specifications: {
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2
    }
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 247-8901",
    location: "Suburbs",
    modality: "Informações",
    status: "Lead",
    lastContact: "2023-04-23",
    budget: 200000,
    specifications: {
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 1
    }
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "(555) 789-0123",
    location: "Downtown",
    modality: "Aluguel",
    status: "Contrato",
    lastContact: "2023-04-15",
    budget: 400000,
    specifications: {
      bedrooms: 2,
      bathrooms: 1,
      parkingSpots: 1
    }
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    phone: "(555) 234-5678",
    location: "Westside",
    modality: "Compra",
    status: "Fechado",
    lastContact: "2023-04-10",
    budget: 600000,
    specifications: {
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2
    }
  },
  {
    id: "7",
    name: "Robert Brown",
    email: "robert.b@example.com",
    phone: "(555) 345-6789",
    location: "Eastside",
    modality: "Aluguel",
    status: "Qualificado",
    lastContact: "2023-04-19",
    budget: 350000,
    specifications: {
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 0
    }
  },
  {
    id: "8",
    name: "Lisa Martinez",
    email: "lisa.m@example.com",
    phone: "(555) 456-7890",
    location: "Suburbs",
    modality: "Informações",
    status: "Lead",
    lastContact: "2023-04-21",
    budget: 250000,
    specifications: {
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 1
    }
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [modalityFilter, setModalityFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Lead":
        return "secondary";
      case "Qualificado":
        return "default";
      case "Reunião":
        return "outline";
      case "Contrato":
        return "destructive";
      case "Fechado":
        return "secondary";
      default:
        return "default";
    }
  };
  
  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "Aluguel":
        return "bg-blue-100 text-blue-800";
      case "Compra":
        return "bg-green-100 text-green-800";
      case "Informações":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // Search term filter
      const matchesSearch = searchTerm === "" || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);
      
      // Status filter
      const matchesStatus = !statusFilter || customer.status === statusFilter;
      
      // Modality filter
      const matchesModality = !modalityFilter || customer.modality === modalityFilter;
      
      // Location filter
      const matchesLocation = !locationFilter || customer.location === locationFilter;
      
      return matchesSearch && matchesStatus && matchesModality && matchesLocation;
    });
  }, [searchTerm, statusFilter, modalityFilter, locationFilter]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setModalityFilter(null);
    setLocationFilter(null);
  };
  
  const handleAction = (action: string, customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      toast({
        title: `${action} for ${customer.name}`,
        description: `Action ${action} has been initiated for this customer.`,
      });
    }
  };

  const locations = [...new Set(customers.map(customer => customer.location))];
  const modalities = [...new Set(customers.map(customer => customer.modality))];
  const statuses = [...new Set(customers.map(customer => customer.status))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Clientes</h2>
        <p className="text-muted-foreground">
          Gerencie e monitore seus leads e clientes
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <Select value={statusFilter || undefined} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={modalityFilter || undefined} onValueChange={(value) => setModalityFilter(value || null)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Modalidades</SelectItem>
              {modalities.map((modality) => (
                <SelectItem key={modality} value={modality}>{modality}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={locationFilter || undefined} onValueChange={(value) => setLocationFilter(value || null)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Localizações</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleResetFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Limpar
          </Button>
        </div>
      </div>

      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://avatar.vercel.sh/${customer.email}`} alt={customer.name} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <Badge variant={getBadgeVariant(customer.status) as any} className="mt-1">
                        {customer.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleAction("Mensagem", customer.id)}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction("Ligar", customer.id)}>
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction("Editar", customer.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Objetivo:</span>
                    <span className={`px-2 py-1 rounded ${getModalityColor(customer.modality)}`}>
                      {customer.modality}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Localização:</span>
                    <span>{customer.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Orçamento:</span>
                    <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(customer.budget)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Especificidades:</span>
                    <span>
                      {customer.specifications.bedrooms} quartos, {customer.specifications.bathrooms} banheiros, {customer.specifications.parkingSpots} vagas
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs mt-4">
                    Último contato: {new Date(customer.lastContact).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          Nenhum cliente encontrado com os critérios selecionados
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredCustomers.length} de {customers.length} clientes
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" disabled>Anterior</Button>
          <Button variant="outline">Próximo</Button>
        </div>
      </div>
    </div>
  );
};

export default Customers;

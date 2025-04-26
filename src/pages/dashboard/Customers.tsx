
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  modality: "Rent" | "Purchase" | "Information";
  status: "Lead" | "Qualified" | "Meeting" | "Contract" | "Closed";
  lastContact: string;
}

const customers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    location: "Downtown",
    modality: "Purchase",
    status: "Qualified",
    lastContact: "2023-04-20"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    location: "Westside",
    modality: "Rent",
    status: "Lead",
    lastContact: "2023-04-22"
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    phone: "(555) 456-7890",
    location: "Eastside",
    modality: "Purchase",
    status: "Meeting",
    lastContact: "2023-04-18"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 247-8901",
    location: "Suburbs",
    modality: "Information",
    status: "Lead",
    lastContact: "2023-04-23"
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "(555) 789-0123",
    location: "Downtown",
    modality: "Rent",
    status: "Contract",
    lastContact: "2023-04-15"
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    phone: "(555) 234-5678",
    location: "Westside",
    modality: "Purchase",
    status: "Closed",
    lastContact: "2023-04-10"
  },
  {
    id: "7",
    name: "Robert Brown",
    email: "robert.b@example.com",
    phone: "(555) 345-6789",
    location: "Eastside",
    modality: "Rent",
    status: "Qualified",
    lastContact: "2023-04-19"
  },
  {
    id: "8",
    name: "Lisa Martinez",
    email: "lisa.m@example.com",
    phone: "(555) 456-7890",
    location: "Suburbs",
    modality: "Information",
    status: "Lead",
    lastContact: "2023-04-21"
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
      case "Qualified":
        return "default";
      case "Meeting":
        return "outline";
      case "Contract":
        return "destructive";
      case "Closed":
        return "secondary";
      default:
        return "default";
    }
  };
  
  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "Rent":
        return "bg-blue-100 text-blue-800";
      case "Purchase":
        return "bg-green-100 text-green-800";
      case "Information":
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
        <h2 className="text-2xl font-bold mb-2">Customers</h2>
        <p className="text-muted-foreground">
          Manage and monitor your leads and customers
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={modalityFilter || undefined} onValueChange={(value) => setModalityFilter(value || null)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Modality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {modalities.map((modality) => (
                <SelectItem key={modality} value={modality}>{modality}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={locationFilter || undefined} onValueChange={(value) => setLocationFilter(value || null)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleResetFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Contact</th>
                  <th className="px-4 py-3 text-left font-medium">Location</th>
                  <th className="px-4 py-3 text-left font-medium">Modality</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Last Contact</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3">{customer.name}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <div>{customer.email}</div>
                          <div className="text-muted-foreground">{customer.phone}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{customer.location}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${getModalityColor(customer.modality)}`}>
                          {customer.modality}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={getBadgeVariant(customer.status) as any}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{new Date(customer.lastContact).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction("Contact", customer.id)}
                          >
                            Contact
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAction("Edit", customer.id)}
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                      No customers found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Customers;

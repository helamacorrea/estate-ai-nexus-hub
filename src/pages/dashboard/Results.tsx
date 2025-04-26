
// Update the results page to change Top Performing Behaviors to Status metrics
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const StatusMetrics = [
  { name: "Agendamentos", value: 35, color: "#4f46e5" },
  { name: "Captações", value: 28, color: "#10b981" },
  { name: "Plantas", value: 22, color: "#f59e0b" },
  { name: "Temporadas", value: 15, color: "#ef4444" },
];

const LeadsBySource = [
  {
    name: "Facebook",
    leads: 12,
  },
  {
    name: "Instagram",
    leads: 19,
  },
  {
    name: "Google",
    leads: 5,
  },
  {
    name: "Indicação",
    leads: 8,
  },
  {
    name: "Site",
    leads: 14,
  },
  {
    name: "WhatsApp",
    leads: 27,
  },
];

const ConversionData = [
  {
    name: "Visitas",
    leads: 70,
    conversions: 30,
  },
  {
    name: "Propostas",
    leads: 40,
    conversions: 15,
  },
  {
    name: "Vendas",
    leads: 15,
    conversions: 8,
  },
];

const Results = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Resultados e Análises</h2>
        <p className="text-muted-foreground">
          Métricas de desempenho e estatísticas da sua assistente virtual
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total de Leads</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">85</div>
                <p className="text-sm text-muted-foreground">+12% comparado ao mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Taxa de Conversão</CardTitle>
                <CardDescription>Leads para clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">24%</div>
                <p className="text-sm text-muted-foreground">+5% comparado ao mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Tempo de Resposta</CardTitle>
                <CardDescription>Média</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">45s</div>
                <p className="text-sm text-muted-foreground">-12s comparado ao mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Agendamentos</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">32</div>
                <p className="text-sm text-muted-foreground">+8% comparado ao mês anterior</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
                <CardDescription>Funil de vendas dos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={ConversionData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="leads" stackId="a" fill="#8884d8" name="Leads" />
                      <Bar dataKey="conversions" stackId="a" fill="#82ca9d" name="Conversões" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Status dos Atendimentos</CardTitle>
                <CardDescription>Distribuição atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={StatusMetrics}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {StatusMetrics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Origem dos Leads</CardTitle>
                <CardDescription>De onde seus leads estão vindo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={LeadsBySource}
                      layout="vertical"
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="leads" fill="#0FFCBE" name="Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Horários de Pico</CardTitle>
                <CardDescription>Quando seus leads estão mais ativos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { hour: "8-10h", leads: 12 },
                        { hour: "10-12h", leads: 18 },
                        { hour: "12-14h", leads: 5 },
                        { hour: "14-16h", leads: 8 },
                        { hour: "16-18h", leads: 16 },
                        { hour: "18-20h", leads: 22 },
                        { hour: "20-22h", leads: 14 },
                      ]}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="leads" fill="#0A1828" name="Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="leads" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leads Detalhados</CardTitle>
                <CardDescription>Análise completa de leads</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo detalhado sobre leads estará disponível em breve</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="conversations" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Conversas</CardTitle>
                <CardDescription>Insights detalhados sobre conversas</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Análise detalhada de conversas estará disponível em breve</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;


import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Upload, Undo, Redo } from "lucide-react";

type BehaviorKey = 'rental' | 'purchase' | 'scheduling' | 'floorPlan' | 'capture';

interface BotSettings {
  name: string;
  imageUrl: string;
  voice: string;
  companyName: string;
  companyDescription: string;
  behaviors: {
    rental: string;
    purchase: string;
    scheduling: string;
    floorPlan: string;
    capture: string;
  };
}

const defaultBehaviors: Record<BehaviorKey, string> = {
  rental: "Ressaltar comodidades, termos de contrato e características do bairro.",
  purchase: "Focar no potencial de investimento, características do imóvel e tendências de mercado.",
  scheduling: "Ser acolhedor mas direto, oferecendo horários específicos.",
  floorPlan: "Ser detalhado sobre dimensões, benefícios do layout e possíveis disposições de móveis.",
  capture: "Fazer perguntas qualificadoras sobre orçamento, cronograma e preferências."
};

const BotSettings = () => {
  const [selectedTab, setSelectedTab] = useState("general");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const defaultValues: BotSettings = {
    name: "Gabbi",
    imageUrl: "https://github.com/shadcn.png",
    voice: "female",
    companyName: "Imobiliária Pro",
    companyDescription: "Uma imobiliária líder especializada em imóveis residenciais e comerciais.",
    behaviors: { ...defaultBehaviors }
  };
  
  const form = useForm<BotSettings>({ defaultValues });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        form.setValue("imageUrl", reader.result as string);
        toast({
          title: "Imagem enviada",
          description: "Sua imagem de perfil foi atualizada com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleSaveBehavior = (field: BehaviorKey) => {
    toast({
      title: "Comportamento salvo",
      description: `O comportamento para ${getBehaviorTitle(field)} foi atualizado com sucesso.`,
    });
  };
  
  const resetBehavior = (field: BehaviorKey) => {
    form.setValue(`behaviors.${field}` as any, defaultBehaviors[field]);
    toast({
      title: "Comportamento restaurado",
      description: `O comportamento para ${getBehaviorTitle(field)} foi restaurado para o padrão.`,
    });
  };
  
  const getBehaviorTitle = (field: BehaviorKey) => {
    const titles: Record<BehaviorKey, string> = {
      rental: "Consultas de Aluguel",
      purchase: "Consultas de Compra",
      scheduling: "Agendamentos",
      floorPlan: "Plantas",
      capture: "Captação de Leads"
    };
    return titles[field];
  };

  const onSubmit = (data: BotSettings) => {
    console.log("Form submitted:", data);
    toast({
      title: "Configurações salvas",
      description: "As configurações do seu bot foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Configurações do Bot</h2>
        <p className="text-muted-foreground">
          Personalize a personalidade, comportamentos e aparência da sua assistente IA
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="behaviors">Comportamentos</TabsTrigger>
          <TabsTrigger value="company">Informações da Empresa</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>
                    Configure o nome, aparência e voz do seu bot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Bot</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Este é como seu bot se identificará para os usuários
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <Label>Foto de Perfil</Label>
                    <div className="flex items-center space-x-4">
                      <Controller
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <>
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={field.value} />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2 flex-1">
                              <div className="flex gap-2">
                                <Input 
                                  id="imageUrl"
                                  type="text"
                                  {...field}
                                  className="flex-1"
                                />
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  onClick={triggerFileUpload}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Enviar
                                </Button>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Insira a URL de uma imagem ou faça upload de uma nova
                              </p>
                            </div>
                          </>
                        )}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Voz</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma voz" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="female">Feminina</SelectItem>
                            <SelectItem value="male">Masculina</SelectItem>
                            <SelectItem value="neutral">Neutra</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Escolha a voz que sua IA usará ao falar
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="behaviors" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Padrões de Comportamento</CardTitle>
                  <CardDescription>
                    Personalize como sua IA responde em diferentes cenários
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(defaultBehaviors).map(([key, defaultValue]) => {
                    const fieldKey = key as BehaviorKey;
                    const behaviorTitle = getBehaviorTitle(fieldKey);
                    
                    return (
                      <div key={key} className="space-y-4">
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold">{behaviorTitle}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Descreva como sua IA deve responder a {behaviorTitle.toLowerCase()}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" type="button">
                              <Undo className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" type="button">
                              <Redo className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Controller
                            control={form.control}
                            name={`behaviors.${fieldKey}` as any}
                            render={({ field }) => (
                              <Textarea 
                                {...field} 
                                placeholder={`Como sua IA deve lidar com ${behaviorTitle.toLowerCase()}?`}
                                rows={3}
                                value={field.value as string}
                              />
                            )}
                          />
                          
                          <div className="flex justify-between items-center pt-1">
                            <Button
                              type="button"
                              variant="link"
                              className="p-0 h-auto text-sm"
                              onClick={() => resetBehavior(fieldKey)}
                            >
                              Restaurar padrão
                            </Button>
                            <Button
                              type="button"
                              onClick={() => handleSaveBehavior(fieldKey)}
                            >
                              Salvar
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="company" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Empresa</CardTitle>
                  <CardDescription>
                    Forneça detalhes sobre sua empresa para referência da IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Empresa</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="companyDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição da Empresa</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Breve descrição da sua empresa"
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Inclua as especialidades, áreas atendidas e diferenciais da sua empresa
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Horário de Atendimento</Label>
                        <Input placeholder="ex., Seg-Sex 9h-17h" />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefone de Contato</Label>
                        <Input placeholder="ex., (11) 99999-9999" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Endereço do Escritório</Label>
                        <Input placeholder="Endereço do escritório principal" />
                      </div>
                      <div className="space-y-2">
                        <Label>Website</Label>
                        <Input placeholder="ex., www.suaempresa.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Áreas Atendidas</Label>
                      <Input placeholder="ex., Grande São Paulo, Litoral Paulista, etc." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Serviços Oferecidos</Label>
                      <Textarea placeholder="Liste os principais serviços que sua empresa oferece" rows={2} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default BotSettings;


import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  MessageSquare, 
  Users, 
  Calendar,
  TrendingUp,
  Settings,
  Webhook,
  BarChart 
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-[#0A1828] shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0FFCBE]">
              <span className="text-lg font-bold text-[#0A1828]">G</span>
            </div>
            <span className="text-lg font-bold text-white">Gabbi AI</span>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <Link to="/" className="font-medium text-gray-200 hover:text-[#0FFCBE]">Início</Link>
            <Link to="/#features" className="font-medium text-gray-200 hover:text-[#0FFCBE]">Recursos</Link>
            <Link to="/#pricing" className="font-medium text-gray-200 hover:text-[#0FFCBE]">Preços</Link>
            <Link to="/#testimonials" className="font-medium text-gray-200 hover:text-[#0FFCBE]">Depoimentos</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-[#0FFCBE] text-[#0FFCBE] hover:bg-[#0FFCBE] hover:text-[#0A1828]">
                Entrar
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-[#0FFCBE] text-[#0A1828] hover:bg-[#0FFCBE]/90">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0A1828] py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="animate-reveal space-y-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white md:text-5xl lg:text-6xl">
                  Revolucione seu Negócio Imobiliário com <span className="text-[#0FFCBE]">Gabbi AI</span>
                </h1>
                <p className="text-lg text-gray-300">
                  Nossa assistente virtual trabalha 24/7, gerencia consultas, agenda visitas e nutre leads automaticamente para que você possa focar em fechar negócios.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link to="/login">
                    <Button size="lg" className="w-full bg-[#0FFCBE] text-[#0A1828] hover:bg-[#0FFCBE]/90 sm:w-auto">
                      Teste Grátis
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="w-full border-[#0FFCBE] text-[#0FFCBE] hover:bg-[#0FFCBE] hover:text-[#0A1828] sm:w-auto">
                    Ver Demo
                  </Button>
                </div>
              </div>
              <div className="relative animate-reveal">
                <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-[#0FFCBE]/20 blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                  alt="Dashboard Gabbi AI" 
                  className="relative z-10 rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#0A1828] md:text-4xl">
                Recursos Poderosos da Gabbi AI
              </h2>
              <p className="text-gray-600">
                Nossa plataforma com IA foi projetada especificamente para profissionais do mercado imobiliário automatizarem tarefas e aumentarem suas vendas.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Respostas Instantâneas",
                  description: "Atendimento automático via WhatsApp com respostas naturais e humanizadas 24/7.",
                  icon: MessageSquare,
                },
                {
                  title: "Qualificação de Leads",
                  description: "A IA analisa conversas para qualificar leads com base em intenção e orçamento.",
                  icon: Users,
                },
                {
                  title: "Agendamento Inteligente",
                  description: "Agenda automaticamente visitas aos imóveis sincronizando com seu calendário.",
                  icon: Calendar,
                },
                {
                  title: "Recomendações Personalizadas",
                  description: "Combina clientes com imóveis que atendem suas preferências e requisitos.",
                  icon: Settings,
                },
                {
                  title: "Integração com Canais",
                  description: "Conecta-se perfeitamente com seus canais de publicidade existentes.",
                  icon: Webhook,
                },
                {
                  title: "Análise de Desempenho",
                  description: "Métricas detalhadas e insights para otimizar sua geração de leads.",
                  icon: BarChart,
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card rounded-lg border p-6 transition-all hover:border-[#0FFCBE] hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#0FFCBE]/10">
                    <feature.icon className="feature-icon h-6 w-6 text-[#0A1828]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-[#0A1828]">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#0A1828] md:text-4xl">
                Preços Simples e Transparentes
              </h2>
              <p className="text-gray-600">
                Escolha o plano ideal para seu negócio. Todos os planos incluem teste grátis de 14 dias.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Inicial",
                  price: "R$249",
                  description: "Perfeito para agentes individuais",
                  features: [
                    "Assistente AI para consultas básicas",
                    "50 conversas AI/mês",
                    "Integração com calendário",
                    "Notificações por email",
                    "Análise básica"
                  ],
                  popular: false
                },
                {
                  name: "Profissional",
                  price: "R$499",
                  description: "Ideal para equipes em crescimento",
                  features: [
                    "Tudo do plano Inicial",
                    "Conversas AI ilimitadas",
                    "Integração completa de CRM",
                    "Score avançado de leads",
                    "Configuração personalizada da AI",
                    "Colaboração em equipe"
                  ],
                  popular: true
                },
                {
                  name: "Empresarial",
                  price: "R$999",
                  description: "Para imobiliárias e grandes equipes",
                  features: [
                    "Tudo do plano Profissional",
                    "Assistente AI com marca própria",
                    "Acesso à API",
                    "Personalização avançada",
                    "Suporte prioritário",
                    "Gerente de conta dedicado"
                  ],
                  popular: false
                }
              ].map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                    plan.popular ? "border-2 border-[#0FFCBE]" : "border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-[#0FFCBE] px-3 py-1 text-xs font-semibold text-[#0A1828]">
                      Mais Popular
                    </div>
                  )}
                  <h3 className="mb-2 text-xl font-semibold text-[#0A1828]">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#0A1828]">{plan.price}</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <p className="mb-6 text-gray-600">{plan.description}</p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4 text-[#0FFCBE]" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/login" className="w-full">
                    <Button 
                      variant={plan.popular ? "default" : "outline"} 
                      className={`w-full ${
                        plan.popular 
                          ? "bg-[#0FFCBE] text-[#0A1828] hover:bg-[#0FFCBE]/90" 
                          : "border-[#0A1828] text-[#0A1828] hover:bg-[#0A1828] hover:text-white"
                      }`}
                    >
                      Começar Agora
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#0A1828] md:text-4xl">O que Nossos Clientes Dizem</h2>
              <p className="text-gray-600">
                Profissionais do mercado imobiliário em todo o país estão transformando seus negócios com nossa assistente virtual.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Ana Silva",
                  role: "Corretora de Imóveis",
                  company: "Century 21",
                  testimonial: "A Gabbi é incrível! Estou capturando leads que antes perdia e meu tempo de resposta passou de horas para segundos.",
                  image: "https://randomuser.me/api/portraits/women/42.jpg"
                },
                {
                  name: "Ricardo Santos",
                  role: "Corretor",
                  company: "Keller Williams",
                  testimonial: "Vimos um aumento de 40% em leads qualificados desde que implementamos a Gabbi. A capacidade de personalizar o comportamento da IA é fantástica.",
                  image: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                  name: "Maria Costa",
                  role: "Líder de Equipe",
                  company: "RE/MAX",
                  testimonial: "As análises e insights que obtemos da plataforma nos ajudam a melhorar continuamente nosso processo de vendas e identificar oportunidades.",
                  image: "https://randomuser.me/api/portraits/women/68.jpg"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="rounded-lg border bg-white p-6 shadow transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="mr-4 h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-[#0A1828]">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="italic text-gray-700">"{testimonial.testimonial}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0A1828] py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Pronto para Transformar seu Negócio Imobiliário?
              </h2>
              <p className="mb-8 text-lg text-gray-300">
                Junte-se a milhares de profissionais do mercado imobiliário usando IA para automatizar tarefas, responder instantaneamente a consultas e fechar mais negócios.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/login">
                  <Button size="lg" className="w-full bg-[#0FFCBE] text-[#0A1828] hover:bg-[#0FFCBE]/90 sm:w-auto">
                    Começar Teste Grátis
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-[#0FFCBE] text-[#0FFCBE] hover:bg-[#0FFCBE] hover:text-[#0A1828] sm:w-auto"
                >
                  Agendar Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0A1828] py-12 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0FFCBE]">
                  <span className="text-lg font-bold text-[#0A1828]">G</span>
                </div>
                <span className="text-lg font-bold text-white">Gabbi AI</span>
              </div>
              <p className="mt-4 text-sm">
                Capacitando profissionais do mercado imobiliário com tecnologia de IA para automatizar tarefas e expandir seus negócios.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#0FFCBE]">Recursos</a></li>
                <li><a href="#" className="hover:text-[#0FFCBE]">Preços</a></li>
                <li><a href="#" className="hover:text-[#0FFCBE]">Integrações</a></li>
                <li><a href="#" className="hover:text-[#0FFCBE]">Atualizações</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#0FFCBE]">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-[#0FFCBE]">Carreiras</a></li>
                <li><a href="#" className="hover:text-[#0FFCBE]">Blog</a></li>
                <li><a href="#" className="hover:text-[#0FFCBE]">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#0FFCBE]">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-[#0FFCBE]">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-[#0FFCBE]">Política de Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Gabbi AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

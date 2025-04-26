
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Users, Search, Settings, BarChart } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-estate-primary">
              <span className="text-lg font-bold text-white">R</span>
            </div>
            <span className="text-lg font-bold">RealEstateAI</span>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <Link to="/" className="font-medium text-gray-700 hover:text-estate-primary">Home</Link>
            <Link to="/#features" className="font-medium text-gray-700 hover:text-estate-primary">Features</Link>
            <Link to="/#pricing" className="font-medium text-gray-700 hover:text-estate-primary">Pricing</Link>
            <Link to="/#testimonials" className="font-medium text-gray-700 hover:text-estate-primary">Testimonials</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="animate-reveal space-y-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                  Revolutionize Your <span className="text-estate-primary">Real Estate</span> Business with AI
                </h1>
                <p className="text-lg text-gray-600">
                  Our AI assistant handles inquiries, schedules viewings, and nurtures leads 24/7 so you can focus on closing deals.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link to="/login">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Free Trial
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="relative animate-reveal">
                <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-estate-accent opacity-50 blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                  alt="Real Estate AI Dashboard" 
                  className="relative z-10 rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful AI Features for Real Estate</h2>
              <p className="text-gray-600">
                Our AI-powered platform is designed specifically for real estate professionals to automate tasks, enhance customer engagement, and increase conversions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Smart Scheduling",
                  description: "Automatically schedule property viewings and meetings by syncing with your calendar.",
                  icon: Calendar,
                },
                {
                  title: "Lead Qualification",
                  description: "AI analyzes conversations to qualify leads based on intent, budget, and timeline.",
                  icon: Users,
                },
                {
                  title: "Property Matching",
                  description: "Match clients with properties that fit their preferences and requirements.",
                  icon: Search,
                },
                {
                  title: "Customizable AI",
                  description: "Adjust AI's behavior, voice, and approach to align with your brand and business goals.",
                  icon: Settings,
                },
                {
                  title: "Performance Analytics",
                  description: "Detailed metrics and insights to optimize your lead generation and conversion.",
                  icon: BarChart,
                },
                {
                  title: "CRM Integration",
                  description: "Seamlessly connect with your existing CRM and tools for a unified workflow.",
                  icon: Users,
                },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card rounded-lg border p-6 transition-all hover:border-estate-primary hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-estate-accent">
                    <feature.icon className="feature-icon h-6 w-6 text-estate-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
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
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
              <p className="text-gray-600">
                Choose the plan that's right for your business. All plans include a 14-day free trial.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$49",
                  description: "Perfect for individual agents",
                  features: [
                    "AI Assistant for basic inquiries",
                    "50 AI conversations/month",
                    "Calendar integration",
                    "Email notifications",
                    "Basic analytics"
                  ],
                  popular: false
                },
                {
                  name: "Professional",
                  price: "$99",
                  description: "Ideal for growing teams",
                  features: [
                    "Everything in Starter",
                    "Unlimited AI conversations",
                    "Full CRM integration",
                    "Advanced lead scoring",
                    "Custom AI configuration",
                    "Team collaboration"
                  ],
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "$199",
                  description: "For large brokerages & teams",
                  features: [
                    "Everything in Professional",
                    "White-labeled AI assistant",
                    "API access",
                    "Advanced customization",
                    "Priority support",
                    "Dedicated account manager"
                  ],
                  popular: false
                }
              ].map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                    plan.popular ? "border-estate-primary" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-estate-primary px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}
                  <h3 className="mb-2 text-xl font-semibold">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="mb-6 text-gray-600">{plan.description}</p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="mr-2 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/login" className="w-full">
                    <Button 
                      variant={plan.popular ? "default" : "outline"} 
                      className="w-full"
                    >
                      Get Started
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
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
              <p className="text-gray-600">
                Real estate professionals across the country are transforming their business with our AI assistant.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Real Estate Agent",
                  company: "Century 21",
                  testimonial: "The AI assistant has been a game-changer. I'm capturing leads I would have missed and my response time has gone from hours to seconds.",
                  image: "https://randomuser.me/api/portraits/women/42.jpg"
                },
                {
                  name: "Michael Rodriguez",
                  role: "Broker",
                  company: "Keller Williams",
                  testimonial: "We've seen a 40% increase in qualified leads since implementing this AI solution. The ability to customize the AI behavior is fantastic.",
                  image: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                  name: "Jennifer Smith",
                  role: "Team Lead",
                  company: "RE/MAX",
                  testimonial: "The analytics and insights we get from the platform help us continually improve our sales process and identify high-value opportunities.",
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
                      <h4 className="font-semibold">{testimonial.name}</h4>
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
        <section className="bg-estate-primary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform Your Real Estate Business?</h2>
              <p className="mb-8 text-lg">
                Join thousands of real estate professionals using AI to automate tasks, respond instantly to inquiries, and close more deals.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/login">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Start Your Free Trial
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-estate-primary">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                  <span className="text-lg font-bold text-estate-primary">R</span>
                </div>
                <span className="text-lg font-bold text-white">RealEstateAI</span>
              </div>
              <p className="mt-4 text-sm">
                Empowering real estate professionals with AI technology to automate tasks and grow their business.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} RealEstateAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

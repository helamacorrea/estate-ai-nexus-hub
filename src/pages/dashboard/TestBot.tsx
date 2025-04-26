
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Send, AlignRight, Download, Copy } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const TestBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your AI real estate assistant. How can I help you today? You can ask me about properties, scheduling a viewing, or any other real estate questions.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [testMode, setTestMode] = useState<"rent" | "buy" | "schedule">("rent");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(scrollToBottom, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate bot response based on test mode
    setTimeout(() => {
      setIsTyping(false);
      
      let response = "";
      if (testMode === "rent") {
        response = "Great! I'd be happy to help you find a rental property. Could you tell me what area you're interested in, your budget range, and any specific features you're looking for (like number of bedrooms or bathrooms)?";
      } else if (testMode === "buy") {
        response = "I'd be delighted to help you find a property to purchase! To better assist you, could you share your preferred location, budget range, and what kind of property you're looking for (condo, single-family home, etc.)?";
      } else if (testMode === "schedule") {
        response = "I'd be happy to schedule a viewing for you! I have availability tomorrow at 10 AM, 2 PM, or 4 PM. Would any of those times work for you? Or we can look at other days if you prefer.";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hi there! I'm your AI real estate assistant. How can I help you today? You can ask me about properties, scheduling a viewing, or any other real estate questions.",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Test Bot</h2>
        <p className="text-muted-foreground">
          Test your AI assistant in different scenarios
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <Card className="flex flex-col h-[600px]">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>RealtyBot</CardTitle>
                    <CardDescription>Online</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={clearChat}>
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-1 ${message.role === "user" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Input 
                  placeholder="Type your message..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="w-full md:w-1/4">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Test Settings</CardTitle>
              <CardDescription>Configure your test scenario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Test Scenario</label>
                <Select value={testMode} onValueChange={(value: "rent" | "buy" | "schedule") => setTestMode(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rental Inquiry</SelectItem>
                    <SelectItem value="buy">Purchase Inquiry</SelectItem>
                    <SelectItem value="schedule">Scheduling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sample Prompts</label>
                <div className="space-y-2">
                  {testMode === "rent" && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto py-2 px-4"
                        onClick={() => setInput("I'm looking for an apartment to rent in downtown with a budget of $2000/month.")}
                      >
                        I'm looking for an apartment to rent in downtown with a budget of $2000/month.
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto py-2 px-4"
                        onClick={() => setInput("Do you have any 2-bedroom apartments available near public transportation?")}
                      >
                        Do you have any 2-bedroom apartments available near public transportation?
                      </Button>
                    </>
                  )}
                  
                  {testMode === "buy" && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto py-2 px-4"
                        onClick={() => setInput("I'm interested in buying a 3-bedroom house in the suburbs under $500,000.")}
                      >
                        I'm interested in buying a 3-bedroom house in the suburbs under $500,000.
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto py-2 px-4"
                        onClick={() => setInput("What are the current mortgage rates for first-time homebuyers?")}
                      >
                        What are the current mortgage rates for first-time homebuyers?
                      </Button>
                    </>
                  )}
                  
                  {testMode === "schedule" && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto py-2 px-4"
                        onClick={() => setInput("I'd like to schedule a viewing for the property on 123 Main Street.")}
                      >
                        I'd like to schedule a viewing for the property on 123 Main Street.
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto py-2 px-4"
                        onClick={() => setInput("What are your available times for a house tour this weekend?")}
                      >
                        What are your available times for a house tour this weekend?
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 pt-6">
                <Button variant="outline" className="w-full" onClick={clearChat}>
                  Clear Conversation
                </Button>
                <Button variant="ghost" className="w-full">
                  <Copy className="mr-2 h-4 w-4" /> Copy Transcript
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestBot;

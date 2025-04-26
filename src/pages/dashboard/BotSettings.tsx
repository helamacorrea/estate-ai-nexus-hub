
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

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
  responseStyle: {
    friendliness: number;
    detail: number;
    formality: number;
  };
}

const BotSettings = () => {
  const [selectedTab, setSelectedTab] = useState("general");
  
  const defaultValues: BotSettings = {
    name: "RealtyBot",
    imageUrl: "https://github.com/shadcn.png",
    voice: "female",
    companyName: "Real Estate Pro",
    companyDescription: "A leading real estate company specializing in residential and commercial properties.",
    behaviors: {
      rental: "Highlight amenities, lease terms, and neighborhood features.",
      purchase: "Focus on investment potential, property features, and market trends.",
      scheduling: "Be accommodating but direct, offering specific time slots.",
      floorPlan: "Be detailed about dimensions, layout benefits, and potential furniture arrangements.",
      capture: "Ask qualifying questions about budget, timeline, and preferences."
    },
    responseStyle: {
      friendliness: 70,
      detail: 60,
      formality: 50
    }
  };
  
  const form = useForm<BotSettings>({ defaultValues });
  
  const onSubmit = (data: BotSettings) => {
    console.log("Form submitted:", data);
    toast({
      title: "Settings saved",
      description: "Your bot settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Bot Settings</h2>
        <p className="text-muted-foreground">
          Customize your AI assistant's personality, behaviors, and appearance
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="behaviors">Behaviors</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Set your bot's name, appearance, and voice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bot Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is how your bot will identify itself to users
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
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
                              <Input 
                                id="imageUrl"
                                type="text"
                                {...field}
                              />
                              <p className="text-xs text-muted-foreground">
                                Enter the URL of an image or upload a new one
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
                        <FormLabel>Voice Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a voice" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the voice your AI will use when speaking
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="behaviors" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Behavior Patterns</CardTitle>
                  <CardDescription>
                    Customize how your AI responds in different scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="behaviors.rental"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rental Inquiries</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="How should your AI handle rental inquiries?"
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe how your AI should respond to rental inquiries
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="behaviors.purchase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Inquiries</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="How should your AI handle purchase inquiries?"
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe how your AI should respond to purchase inquiries
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="behaviors.scheduling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scheduling</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="How should your AI handle scheduling requests?"
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe how your AI should handle appointment scheduling
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="behaviors.floorPlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Floor Plan Requests</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="How should your AI respond to floor plan questions?"
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe how your AI should discuss floor plans and layouts
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="behaviors.capture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lead Capture</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="How should your AI capture lead information?"
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Define how your AI should gather contact information and preferences
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="personality" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personality Traits</CardTitle>
                  <CardDescription>
                    Adjust sliders to fine-tune your bot's personality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Friendliness</Label>
                        <span className="text-sm text-muted-foreground">
                          {form.watch("responseStyle.friendliness")}%
                        </span>
                      </div>
                      <Controller
                        control={form.control}
                        name="responseStyle.friendliness"
                        render={({ field }) => (
                          <Slider
                            defaultValue={[field.value]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        )}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Professional</span>
                        <span>Friendly</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Detail Level</Label>
                        <span className="text-sm text-muted-foreground">
                          {form.watch("responseStyle.detail")}%
                        </span>
                      </div>
                      <Controller
                        control={form.control}
                        name="responseStyle.detail"
                        render={({ field }) => (
                          <Slider
                            defaultValue={[field.value]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        )}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Concise</span>
                        <span>Detailed</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Formality</Label>
                        <span className="text-sm text-muted-foreground">
                          {form.watch("responseStyle.formality")}%
                        </span>
                      </div>
                      <Controller
                        control={form.control}
                        name="responseStyle.formality"
                        render={({ field }) => (
                          <Slider
                            defaultValue={[field.value]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        )}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Casual</span>
                        <span>Formal</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="use-emojis" />
                      <Label htmlFor="use-emojis">Use emojis in responses</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="send-follow-ups" checked />
                      <Label htmlFor="send-follow-ups">Send follow-up messages after initial contact</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="use-client-name" checked />
                      <Label htmlFor="use-client-name">Address clients by name when available</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="company" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Provide details about your company for the AI to reference
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
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
                        <FormLabel>Company Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Brief description of your company"
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Include your company's specialties, areas served, and unique selling points
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Office Hours</Label>
                        <Input placeholder="e.g., Mon-Fri 9am-5pm" />
                      </div>
                      <div className="space-y-2">
                        <Label>Contact Phone</Label>
                        <Input placeholder="e.g., (555) 123-4567" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Office Address</Label>
                        <Input placeholder="Main office address" />
                      </div>
                      <div className="space-y-2">
                        <Label>Website</Label>
                        <Input placeholder="e.g., www.yourcompany.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Areas Served</Label>
                      <Input placeholder="e.g., Greater Boston Area, NYC Metro, etc." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Services Offered</Label>
                      <Textarea placeholder="List the main services your company offers" rows={2} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <CardFooter className="flex justify-end border-t p-6">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default BotSettings;

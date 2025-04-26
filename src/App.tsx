
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Connections from "./pages/dashboard/Connections";
import BotSettings from "./pages/dashboard/BotSettings";
import Account from "./pages/dashboard/Account";
import TestBot from "./pages/dashboard/TestBot";
import Results from "./pages/dashboard/Results";
import Customers from "./pages/dashboard/Customers";
import ProtectedRoute from "./components/ProtectedRoute";
import AddGabbi from "./pages/dashboard/AddGabbi";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<Results />} />
              <Route path="connections" element={<Connections />} />
              <Route path="add-gabbi" element={<AddGabbi />} />
              <Route path="bot-settings" element={<BotSettings />} />
              <Route path="account" element={<Account />} />
              <Route path="test-bot" element={<TestBot />} />
              <Route path="results" element={<Results />} />
              <Route path="customers" element={<Customers />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

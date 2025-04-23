import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import Test from "@/pages/test";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "@/hooks/use-language";
import { WhatsAppWidget } from "@/components/ui/whatsapp-widget";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/test" component={Test} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router />
        <WhatsAppWidget />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;

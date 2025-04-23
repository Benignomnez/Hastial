import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "@/hooks/use-language";
import { WhatsAppWidget } from "@/components/ui/whatsapp-widget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router />
      <WhatsAppWidget />
    </LanguageProvider>
  );
}

export default App;

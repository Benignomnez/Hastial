import { Switch, Route } from "wouter";
import Test from "@/pages/test";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "@/hooks/use-language";
import { WhatsAppWidget } from "@/components/ui/whatsapp-widget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Test} />
      <Route path="/test" component={Test} />
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

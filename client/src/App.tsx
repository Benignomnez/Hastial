import { Switch, Route } from "wouter";
import Test from "@/pages/test";
import { LanguageProvider } from "@/hooks/use-language";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Test} />
      <Route path="/test" component={Test} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  );
}

export default App;

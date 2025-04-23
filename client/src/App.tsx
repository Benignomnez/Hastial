import Test from "@/pages/test";
import { LanguageProvider } from "@/hooks/use-language";

function App() {
  return (
    <LanguageProvider>
      <Test />
    </LanguageProvider>
  );
}

export default App;

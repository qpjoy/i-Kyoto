import "./App.css";
import Roll from "./components/roll/Roll";
import { AppProvider } from "@/contexts/AppContext";

function App() {
  return (
    <AppProvider>
      <Roll />
    </AppProvider>
  );
}

export default App;

import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import Roll from "./components/roll/Roll.tsx";
import { AppProvider } from "./contexts/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider themes={["light", "dark"]}>
    <AppProvider>
      <Roll />
    </AppProvider>
  </Provider>
  // </StrictMode>
);

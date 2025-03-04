import { createContext, useState, ReactNode, useContext } from "react";

// Define types for the context value
interface AppContextType {
  comments: any;
  setComments: (comment: any) => void;
}

// Create a context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component that will wrap your app
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<any>([]);

  return <AppContext.Provider value={{ comments, setComments }}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

import { createContext, useContext, useState } from "react";

// ✅ Create Context
const FrameworkContext = createContext<{ state: { user: null }; setState: React.Dispatch<React.SetStateAction<{ user: null }>> } | null>(null);

// ✅ Create Provider
export function FrameworkProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState({ user: null });

    return (
        <FrameworkContext.Provider value={{ state, setState }}>
            {children}
        </FrameworkContext.Provider>
    );
}

// ✅ Create Hook to Access Context
export function useFrameworkContext() {
  const context = useContext(FrameworkContext);

  // 🚨 Throw error if used outside provider
  if (!context) {
    throw new Error("useFrameworkContext must be used within a FrameworkProvider");
  }

  return context;
}

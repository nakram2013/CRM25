import { createContext, useContext, useEffect, useState } from "react";
import type { z } from "zod";
import { profileService } from "~/api/profile-service";
import type { userSchema } from "~/users/data/user-schema";
type User = z.infer<typeof userSchema>;
type FrameworkContextType = {
  state: {
    user: User | null;
  };
  setState: React.Dispatch<React.SetStateAction<{ user: User | null }>>;
};
// ✅ Create Context
const FrameworkContext = createContext<FrameworkContextType | null>(null);
// const FrameworkContext = createContext<{ state: { user: null }; setState: React.Dispatch<React.SetStateAction<{ user: null }>> } | null>(null);

// ✅ Create Provider
export function FrameworkProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ user: User | null }>({ user: null });
  useEffect(() => {
    // Replace with your actual API endpoint
    if (state.user === null) {
      const fetchUser = async () => {
        try {
          const response = await profileService.Profile();
          setState({ user: response });
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      };

      fetchUser();
    }
  }, [state.user]);
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

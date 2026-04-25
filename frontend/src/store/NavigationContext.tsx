'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
  navigate: (route: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
    const [route, setRoute] = useState<string | null>(null)

  const navigate = (routeArg: string) => {
    setIsNavigating(true);
    setRoute(routeArg)
    router.push(routeArg);
  };

  useEffect(() => {
    if (isNavigating && pathname === route) {
      setIsNavigating(false);
    }
  }, [pathname, isNavigating, router, route]);

  return (
    <NavigationContext.Provider value={{ isNavigating, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
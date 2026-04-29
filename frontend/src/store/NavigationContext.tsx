'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
  isUploading: boolean;
  isResponding: boolean;
  navigate: (route: string) => void;
  pathname: string;
  setIsNavigating: (n: boolean) => void;
  setIsUploading: (b: boolean) => void;
  setIsResponding: (b: boolean) => void;
  targetPage?: number;
  setTargetPage: (page: number) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [targetPage, setTargetPage] = useState<number>(1);
  const [isResponding, setIsResponding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
    const [route, setRoute] = useState<string | null>(null)

  const navigate = (routeArg: string) => {
    setIsNavigating(true);
    setRoute(routeArg)
    router.push(routeArg);
  };

  console.log(pathname,route)
useEffect(() => {
  let strippedroute: string | null = null;

  if (route) {
    strippedroute = String(route).endsWith("/")
      ? route.slice(0, -1)
      : route;
  } else {
    strippedroute = route;
  }

  const strippedPathname = String(pathname).endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (strippedPathname === strippedroute) {
    console.log(pathname, route);
    setIsNavigating(false);
  }
}, [pathname, isNavigating, route]);
  return (
    <NavigationContext.Provider
  value={{
    targetPage,
    isNavigating,
    navigate,
    pathname,
    setIsNavigating,
    isUploading,
    setIsUploading,
    isResponding,
    setIsResponding,
    setTargetPage
  }}
>
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

"use client";
import { NavigationProvider } from "@/store/NavigationContext";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
export function Provider({ children }: { children: ReactNode }) {


const [queryClient] = useState(() => new QueryClient());

  return (

    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
      // disableTransitionOnChange
      >
          <NavigationProvider>

            {children}
          </NavigationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

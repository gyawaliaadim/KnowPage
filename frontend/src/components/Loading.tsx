"use client";
import { ReactNode, useState, useEffect } from "react";
import { useNavigation } from "@/store/NavigationContext";
import { useIsFetching } from "@tanstack/react-query";

export default function LoadingTemplate({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [delayedShow, setDelayedShow] = useState(false);
  const { isNavigating } = useNavigation();
  const isFetching = useIsFetching();

  const showOverlay = isNavigating || isFetching > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (showOverlay) {
      // Wait 1s before showing overlay
      timer = setTimeout(() => {
        setDelayedShow(true);
      }, 1);
    } else {
      // If things finish quickly, clear the timer and hide immediately
      setDelayedShow(false);
      if (timer) clearTimeout(timer);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showOverlay]);

  if (!mounted) return null;

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      {children}

      {delayedShow && (
        <div className="fixed inset-0 flex items-center justify-center transition-opacity duration-300 opacity-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
          <div className="relative flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 border-4 border-t-transparent border-r-transparent border-b-blue-500 border-l-blue-500 rounded-full animate-spin animation-duration-[1.5s] opacity-50"></div>
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/30 to-transparent rounded-full blur-md animate-pulse"></div>
            </div>
            <p className="mt-4 text-lg font-semibold text-blue-500 dark:text-blue-400 animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

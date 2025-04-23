"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading..." />
      </div>
    );
  }

  return <div className="animate-fade-in">{children}</div>;
};

export default PageTransition;

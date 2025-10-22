"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RouteLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Jab pathname change hota hai tab loader show kare
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600); // 0.6s delay for smoothness
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Loader2 className="animate-spin text-white w-10 h-10" />
    </div>
  );
}

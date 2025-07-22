
"use client";

import { ShutdownOverlay } from "@/components/shutdown-overlay";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function ShutdownProvider({ children }: { children: ReactNode }) {
  const [isShutdown, setIsShutdown] = useState(false);
  const [shutdownMessage, setShutdownMessage] = useState("");
  const [canRender, setCanRender] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shutdownStatus = localStorage.getItem("isSiteShutdown");
    const message = localStorage.getItem("shutdownMessage");
    setIsShutdown(shutdownStatus === "true");
    setShutdownMessage(message || "The site is temporarily unavailable.");
    // Only render after client-side state has been determined
    setCanRender(true);
  }, []);

  if (!canRender) {
    // Render nothing or a loading state until client-side check is complete
    return null;
  }

  const isRecoveryMode = searchParams.get("recover") === "true";
  const isAdminPage = pathname.startsWith('/admin');

  // If site is shutdown, and we are not in recovery mode or on an admin page, show the overlay.
  if (isShutdown && !isRecoveryMode && !isAdminPage) {
    return <ShutdownOverlay message={shutdownMessage} />;
  }
  
  // Otherwise, render the children
  return <>{children}</>;
}

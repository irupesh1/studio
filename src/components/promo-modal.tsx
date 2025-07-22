
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface PromoData {
  enabled: boolean;
  startDate?: string;
  endDate?: string;
  text?: string;
  media?: string;
}

export function PromoModal() {
  const [promoData, setPromoData] = useState<PromoData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("promoData");
      if (storedData) {
        const parsedData: PromoData = JSON.parse(storedData);
        setPromoData(parsedData);

        const now = new Date();
        const startDate = parsedData.startDate ? new Date(parsedData.startDate) : null;
        const endDate = parsedData.endDate ? new Date(parsedData.endDate) : null;

        // Set end of day for endDate
        if(endDate) {
            endDate.setHours(23, 59, 59, 999);
        }

        const isWithinDateRange = 
            (!startDate || now >= startDate) && 
            (!endDate || now <= endDate);

        if (parsedData.enabled && isWithinDateRange) {
          setIsVisible(true);
        }
      }
    } catch (e) {
      console.error("Failed to process promo data", e);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 15000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible || !promoData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in-50">
      <div className="relative bg-card rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 text-center">
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 rounded-full h-8 w-8"
            aria-label="Close promotion"
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="space-y-4">
            {promoData.media && (
                <div className="relative w-full aspect-video rounded-md overflow-hidden mx-auto">
                    <Image
                        src={promoData.media}
                        alt="Promotional media"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            )}
            {promoData.text && (
                <p className="text-card-foreground text-base leading-relaxed whitespace-pre-wrap">
                    {promoData.text}
                </p>
            )}
        </div>

      </div>
    </div>
  );
}

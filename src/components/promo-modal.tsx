
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
  closeButtonDelay?: number;
  allowOutsideClick?: boolean;
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
    if (isVisible && promoData) {
      const delay = (promoData.closeButtonDelay ?? 15) * 1000;
      const timer = setTimeout(() => {
        setShowCloseButton(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, promoData]);

  const handleClose = () => {
    setIsVisible(false);
  };
  
  const handleOverlayClick = () => {
    if (promoData?.allowOutsideClick) {
      handleClose();
    }
  };

  if (!isVisible || !promoData) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in-50"
        onClick={handleOverlayClick}
    >
      <div 
        className="relative bg-card rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 text-center"
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to the overlay
      >
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
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

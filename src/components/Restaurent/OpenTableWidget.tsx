"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NaraButton from "@/components/Restaurent/NaraButton";

interface OpenTableWidgetProps {
  className?: string;
  dict: {
    reserveTable: string;
    reservationTitle: string;
  };
}

const OpenTableWidget = ({ className = "", dict }: OpenTableWidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
      setProgress(0);

      // Start progress animation
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
            }
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Set a maximum loading time (1 second)
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setProgress(100);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }, 1000);
    } else {
      document.body.style.overflow = "unset";
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }

    return () => {
      document.body.style.overflow = "unset";
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isModalOpen]);

  // This is the direct URL for an embedded OpenTable reservation widget
  const openTableUrl =
    "https://reservation.dish.co/widget/hydra-72df81a9-a50a-4f1f-be7e-a5d26efd7b7f";

  const handleIframeLoad = () => {
    // Clear the timeout and hide loader once iframe is loaded
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(100);
    setIsLoading(false);
  };

  const CalendarIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <>
      {/* Reservation Button */}
      <div className={`w-full flex justify-center ${className}`}>
        <NaraButton
          onClick={() => setIsModalOpen(true)}
          icon={<CalendarIcon />}
        >
          {dict.reserveTable}
        </NaraButton>
      </div>

      {/* Portal for Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white dark:bg-gray-800 w-[95%] h-[70vh] max-w-4xl rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-secondary-color">
                  <h2 className="text-2xl font-semibold text-white">
                    {dict.reservationTitle}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white hover:text-white/80 transition-colors duration-200 hover:bg-red-800/40 p-2 rounded-full"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="relative w-full h-[calc(100%-4rem)]">
                  {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-10">
                      <div className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                        NARA {dict.reservationTitle}
                      </div>
                      <div className="w-full max-w-56 bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
                        <div
                          className="bg-secondary-color h-[8px] rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <iframe
                    ref={iframeRef}
                    src={openTableUrl}
                    title="OpenTable Reservation Widget"
                    className="w-full h-full border-0"
                    allowFullScreen
                    onLoad={handleIframeLoad}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OpenTableWidget;

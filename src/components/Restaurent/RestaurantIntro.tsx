"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RestaurantButton from "./RestaurantButton";

interface RestaurantIntroProps {
  dict: {
    title: string;
    description: string;
    experience: string;
    highlight: string;
    reserveTable: string;
  };
}

const RestaurantIntro = ({ dict }: RestaurantIntroProps) => {
  const [, setIsOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isReservationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isReservationOpen]);

  const handleReservationClick = () => {
    closeMenu();
    setIsReservationOpen(true);
  };

  return (
    <>
      <section id="restaurant" className="py-12 md:py-24 relative mt-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[50%] pr-0 lg:pr-8 z-10 relative mb-8 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
                  <span className="text-primary-color">NARA</span> <br />
                  {dict.title}
                </h2>
                <div className="h-[2px] w-24 bg-primary-color mt-4" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/80 p-7 md:p-8 rounded-lg backdrop-blur-sm shadow-xl"
              >
                <div className="space-y-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-white/90 leading-relaxed"
                  >
                    {dict.description}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-white/90 leading-relaxed"
                  >
                    {dict.experience}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-white/90 leading-relaxed"
                  >
                    {dict.highlight}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3 mt-8"
                >
                  <RestaurantButton
                    text={dict.reserveTable}
                    variant="outline"
                    onClick={handleReservationClick}
                  />
                </motion.div>
              </motion.div>
            </div>
            <div className="w-full h-64 md:h-96 lg:w-[60%] lg:h-auto lg:absolute lg:right-0 lg:top-0 lg:bottom-0">
              <div className="relative w-full h-full">
                <Image
                  src="/images/nara.jpg"
                  alt="NARA Restaurant Interior"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-[9999] overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setIsReservationOpen(false)}
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
                    {dict.reserveTable}
                  </h2>
                  <button
                    onClick={() => setIsReservationOpen(false)}
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

                {/* Reservation iframe */}
                <div className="w-full h-[calc(100%-4rem)]">
                  <iframe
                    src="https://reservation.dish.co/widget/hydra-72df81a9-a50a-4f1f-be7e-a5d26efd7b7f"
                    title="Reservation"
                    className="w-full h-full border-0"
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

export default RestaurantIntro;

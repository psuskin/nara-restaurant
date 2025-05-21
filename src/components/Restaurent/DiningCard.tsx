"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import RestaurantButton from "./RestaurantButton";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

interface DiningCardProps {
  dict: {
    menuTitle: string;
    viewMenu: string;
    reserveTable: string;
    reservationTitle: string;
    categories: {
      appetizers: {
        title: string;
        time: string;
        priceRange: string;
        description: string;
      };
      mainDishes: {
        title: string;
        time: string;
        priceRange: string;
        description: string;
      };
      sushi: {
        title: string;
        time: string;
        priceRange: string;
        description: string;
      };
      drinks: {
        title: string;
        time: string;
        priceRange: string;
        description: string;
      };
    };
  };
}

const DiningCard = ({ dict }: DiningCardProps) => {
  // const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfToShow, setPdfToShow] = useState<string | null>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      window.open("/Speisekarte.pdf", "_blank");
    } else {
      setPdfToShow("/Speisekarte.pdf");
    }
  };

  const handleDrinkMenuClick = () => {
    if (isMobile) {
      window.open("/Cocktailkarte.pdf", "_blank");
    } else {
      setPdfToShow("/Cocktailkarte.pdf");
    }
  };

  const menuCategories = [
    {
      key: "appetizers",
      image: "/images/seeds.jpg",
    },
    {
      key: "mainDishes",
      image: "/images/steak.jpg",
    },
    {
      key: "sushi",
      image: "/images/sushi.jpg",
    },
    {
      key: "drinks",
      image: "/images/drinkss.jpg",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <section id="menu" className="py-24 px-4">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight">
              {dict.menuTitle}
            </h2>
            <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-primary-color to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {menuCategories.map((category) => (
              <motion.div
                key={category.key}
                className="group relative bg-black border border-white/5 rounded-sm overflow-hidden hover:border-primary-color/30 transition-colors duration-500"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={
                      dict.categories[
                        category.key as keyof typeof dict.categories
                      ].title
                    }
                    layout="fill"
                    objectFit="cover"
                    className="transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs tracking-wider text-white/70 mb-1 uppercase">
                      {
                        dict.categories[
                          category.key as keyof typeof dict.categories
                        ].time
                      }
                    </p>
                    <h3 className="text-xl font-light text-white mb-1">
                      {
                        dict.categories[
                          category.key as keyof typeof dict.categories
                        ].title
                      }
                    </h3>
                    <p className="text-primary-color text-sm">
                      {
                        dict.categories[
                          category.key as keyof typeof dict.categories
                        ].priceRange
                      }
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-4">
                    {
                      dict.categories[
                        category.key as keyof typeof dict.categories
                      ].description
                    }
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <RestaurantButton
                      text={dict.viewMenu}
                      variant="outline"
                      size="sm"
                      className="inline-flex items-center gap-2"
                      onClick={
                        category.key === "drinks"
                            ? handleDrinkMenuClick
                            : handleMenuClick
                      }
                    />
                    <RestaurantButton
                      text={dict.reserveTable}
                      variant="secondary"
                      size="sm"
                      className="inline-flex items-center gap-2"
                      onClick={() => setIsReservationOpen(true)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Modal - Only shown on desktop */}
      <AnimatePresence>
        {pdfToShow && !isMobile && (
          <div className="fixed inset-0 z-[9999] overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setPdfToShow(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white dark:bg-gray-800 w-[95%] h-[90vh] max-w-6xl rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-secondary-color">
                  <h2 className="text-2xl font-semibold text-white">
                    {dict.menuTitle}
                  </h2>
                  <div className="flex items-center gap-4">
                    <a
                      href={pdfToShow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-white/80 transition-colors duration-200 hover:bg-primary-color/40 p-2 rounded-full"
                      onClick={(e) => e.stopPropagation()}
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    <button
                      onClick={() => setPdfToShow(null)}
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
                </div>

                {/* PDF Viewer */}
                <div className="w-full h-[calc(100%-4rem)] md:h-[calc(100vh-10rem)] overflow-auto">
                  <iframe
                    src={`${pdfToShow}#view=FitH&zoom=50&toolbar=1&navpanes=1`}
                    className="w-full h-full border-0"
                    title={dict.menuTitle}
                    allowFullScreen={true}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Reservation Modal */}
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
                    {dict.reservationTitle}
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

                {/* OpenTable iframe */}
                <div className="w-full h-[calc(100%-4rem)] md:h-[calc(100vh-10rem)] overflow-auto">
                  <iframe
                    src="https://reservation.dish.co/widget/hydra-72df81a9-a50a-4f1f-be7e-a5d26efd7b7f"
                    title="OpenTable Reservation"
                    className="w-full h-full border-0"
                    allowFullScreen={true}
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

export default DiningCard;

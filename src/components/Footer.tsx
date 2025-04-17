"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import RestaurantButton from "./Restaurent/RestaurantButton";

interface FooterProps {
  dict: {
    copyright?: string;
    contact?: string;
    address?: string;
    email?: string;
    phone?: string;
    socialMedia?: string;
    followUs?: string;
    reserveTable?: string;
    hotelName?: string;
    slogan?: string;
    hours?: string;
    monday?: string;
    friday?: string;
    sunday?: string;
    findUs?: string;
    reservationTitle?: string;
  };
}

const Footer: React.FC<FooterProps> = ({ dict }) => {
  const currentYear = new Date().getFullYear();
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-black border-t border-white/10 text-white z-1">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
          {/* Large Title */}
          <div className="mb-6 sm:mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight mb-3"
            >
              <span className="text-primary-color">NARA</span>
              <span className="text-white/80 ml-2 sm:ml-3">EXPERIENCE</span>
            </motion.h2>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="h-0.5 bg-primary-color w-12 sm:w-16"></div>
              <p className="text-white/60 text-xs sm:text-sm uppercase tracking-widest">
                {dict.slogan || "Authentic Japanese Cuisine"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Details with Modern Icons */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-white/90 text-xs sm:text-sm uppercase tracking-wider font-medium mb-3 sm:mb-4">
                {dict.findUs || dict.contact || "FIND US"}
              </h3>

              <div className="space-y-3 sm:space-y-4 text-white/60">
                <div className="flex items-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary-color mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-xs sm:text-sm">
                    {dict.address || "Nobistor 8, 22767 Hamburg"}
                  </p>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary-color mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:info@nara-hamburg.de"
                    className="text-xs sm:text-sm hover:text-primary-color transition-colors duration-200"
                  >
                    {dict.email || "info@nara-hamburg.de"}
                  </a>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary-color mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+49-123-456789"
                    className="text-xs sm:text-sm hover:text-primary-color transition-colors duration-200"
                  >
                    {dict.phone || "+49 40 181 283 811"}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-white/90 text-xs sm:text-sm uppercase tracking-wider font-medium mb-3 sm:mb-4">
                {dict.hours || "HOURS"}
              </h3>
              <div className="space-y-2 text-white/60">
                <div className="flex justify-between">
                  <p className="text-xs sm:text-sm">
                    {dict.monday || "Mo - Do"}
                  </p>
                  <p className="text-xs sm:text-sm">07:00 - 23:30</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs sm:text-sm">
                    {dict.friday || "Fr"}
                  </p>
                  <p className="text-xs sm:text-sm">07:00 - 02:00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs sm:text-sm">
                    {dict.sunday || "Sa"}
                  </p>
                  <p className="text-xs sm:text-sm">08:00 - 02:00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs sm:text-sm">
                    {dict.sunday || "So"}
                  </p>
                  <p className="text-xs sm:text-sm">08:00 - 23:30</p>
                </div>
                <div className="h-0.5 w-full bg-white/10 my-2"></div>
                {/* <RestaurantButton
                  text={dict.reserveTable || "RESERVE A TABLE"}
                  variant="secondary"
                  size="sm"
                  withArrow={true}
                  className="inline-flex items-center text-xs sm:text-sm"
                  onClick={() => setIsReservationOpen(true)}
                /> */}
              </div>
            </div>

            {/* Follow Us with Modern Social Icons */}
            <div className="mt-6 sm:mt-0">
              <h3 className="text-white/90 text-xs sm:text-sm uppercase tracking-wider font-medium mb-3 sm:mb-4">
                {dict.followUs || "FOLLOW US"}
              </h3>
              <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <a
                  href="https://instagram.com"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-primary-color/20 flex items-center justify-center transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-primary-color"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-primary-color/20 flex items-center justify-center transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-primary-color"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-primary-color/20 flex items-center justify-center transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-primary-color"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>

              <div className="text-white/40 text-xs">
                <p>{dict.hotelName || "Hotel am Beatles-Platz"}</p>
                <p>
                  {dict.copyright?.replace("{year}", currentYear.toString()) ||
                    `© ${currentYear} Hotel am Beatles-Platz. All rights reserved.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
                <div className="w-full h-[calc(100%-4rem)]">
                  <iframe
                    src="https://reservation.dish.co/widget/hydra-72df81a9-a50a-4f1f-be7e-a5d26efd7b7f"
                    title="OpenTable Reservation"
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

export default Footer;

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/config/i18n.config";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  // For one-page site with anchors, we can use this function instead
  const handleLanguageChange = (locale: Locale) => {
    // Keep the user on the same section when changing languages
    const hash = window.location.hash;
    window.location.href = `/${locale}${hash}`;
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center bg-black/80 backdrop-blur-md text-white rounded-full px-4 py-2 shadow-lg hover:bg-black/90 transition-all duration-300 font-medium"
        >
          <span className="mr-2">{localeLabels[currentLocale]}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 min-w-full overflow-hidden origin-top-right"
            >
              <div className="bg-white backdrop-blur-lg shadow-xl rounded-lg p-1 border border-gray-100">
                {locales.map((locale) => {
                  const isActive = currentLocale === locale;
                  return (
                    <Link
                      key={locale}
                      href={redirectedPathName(locale)}
                      onClick={(e) => {
                        if (window.location.hash) {
                          e.preventDefault();
                          handleLanguageChange(locale);
                        }
                        setIsOpen(false);
                      }}
                    >
                      <motion.div
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer flex items-center ${
                          isActive
                            ? "text-secondary-color font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="mr-2">{localeLabels[locale]}</span>
                        {isActive && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L19 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

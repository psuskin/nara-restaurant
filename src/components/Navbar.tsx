"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RestaurantButton from "./Restaurent/RestaurantButton";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/config/i18n.config";

interface NavbarDictionary {
  home: string;
  restaurant: string;
  menu: string;
  book: string;
  reserveTable?: string;
  reservationTitle?: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  isActive?: boolean;
  className?: string;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  mobile,
  isActive,
  className,
  onClick,
}) => {
  return (
    <motion.a
      href={href}
      className={`${mobile ? "block py-3 text-lg" : "px-3 py-2"} relative ${
        className || ""
      }`}
      onClick={onClick}
      whileHover={mobile ? {} : { y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <span
        className={`relative z-10 ${
          isActive
            ? "text-primary-color font-medium"
            : "text-white/90 hover:text-white"
        } transition-colors duration-300`}
      >
        {children}
      </span>

      {isActive && !mobile && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary-color mx-auto"
          style={{ width: "60%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  );
};

// Compact Language Switcher for Navbar
const CompactLanguageSwitcher = ({
  currentLocale,
}: {
  currentLocale: Locale;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const switcherRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLanguageChange = (locale: Locale, e: React.MouseEvent) => {
    e.preventDefault();
    const hash = window.location.hash;
    window.location.href = `/${locale}${hash}`;
  };

  // Don't render anything during SSR or initial render to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div ref={switcherRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center text-white px-2 py-1 transition-all duration-300 font-medium text-sm"
      >
        <span className="uppercase">{currentLocale}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-1"
        >
          <svg
            width="10"
            height="10"
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
            className="absolute right-0 mt-2 min-w-full overflow-hidden origin-top-right z-50"
          >
            <div className="bg-white backdrop-blur-lg shadow-xl rounded-lg p-1 border border-gray-100">
              {locales.map((locale) => {
                const isActive = currentLocale === locale;
                return (
                  <a
                    key={locale}
                    href={redirectedPathName(locale)}
                    onClick={(e) => {
                      handleLanguageChange(locale, e);
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
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NavbarProps {
  dict: NavbarDictionary;
  currentLocale: Locale;
}

const Navbar: React.FC<NavbarProps> = ({ dict, currentLocale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleReservationClick = () => {
    closeMenu();
    setIsReservationOpen(true);
  };

  const navItems = [
    { name: dict.home, href: "/#home" },
    { name: dict.restaurant, href: "#restaurant" },
    { name: dict.menu, href: "#menu" },
  ];

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-full z-40 fixed top-0 left-0 transition-all duration-300 py-5 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md"
            : "bg-gradient-to-b from-black/90 to-black/0 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="/#home"
            className="relative group"
            onClick={closeMenu}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-2xl font-light tracking-wider">
              <span className="text-secondary-color font-medium">NARA</span>
              <span className="text-white ml-1.5">Restaurant</span>
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] w-0 bg-secondary-color"
              animate={{ width: isScrolled ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    href={item.href}
                    isActive={activeSection === item.href.substring(1)}
                    className="text-sm tracking-wide uppercase"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {/* Desktop Language Switcher */}
              <li className="ml-2">
                <CompactLanguageSwitcher currentLocale={currentLocale} />
              </li>
            </ul>

            <div className="ml-8 flex items-center space-x-3">
              {/* Gutscheine Button */}
              <RestaurantButton
                text="Gutscheine"
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://www.yovite.com/Restaurant-Gutschein-R-69778946.html?REF=REST",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="inline-flex items-center"
              />

              {/* Book a Table Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RestaurantButton
                  text={dict.book || "BOOK A TABLE"}
                  variant="primary"
                  size="sm"
                  withArrow={true}
                  onClick={handleReservationClick}
                  className="inline-flex items-center"
                />
              </motion.div>
            </div>
          </div>

          {/* Hamburger Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="relative h-10 w-10 text-white focus:outline-none"
              aria-label="Open menu"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.span
                  className="absolute block h-0.5 w-6 bg-secondary-color transform -translate-y-2"
                  animate={
                    isOpen
                      ? { rotate: 45, translateY: 0 }
                      : { rotate: 0, translateY: -8 }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute block h-0.5 w-6 bg-secondary-color"
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute block h-0.5 w-6 bg-secondary-color transform translate-y-2"
                  animate={
                    isOpen
                      ? { rotate: -45, translateY: 0 }
                      : { rotate: 0, translateY: 8 }
                  }
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md z-20 overflow-hidden border-t border-white/10"
            >
              <div className="container mx-auto px-6 py-8">
                <div className="space-y-6">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-center"
                    >
                      <NavLink
                        href={item.href}
                        mobile
                        isActive={activeSection === item.href.substring(1)}
                        onClick={closeMenu}
                      >
                        {item.name}
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Mobile Language Switcher */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center mt-4"
                  >
                    <div className="inline-block">
                      <CompactLanguageSwitcher currentLocale={currentLocale} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="pt-4 text-center flex flex-col items-center space-y-4"
                  >
                    {/* Gutscheine Button - Mobile */}
                    <RestaurantButton
                      text="Gutscheine"
                      variant="outline"
                      size="md"
                      onClick={() =>
                        window.open(
                          "https://www.yovite.com/Restaurant-Gutschein-R-69778946.html?REF=REST",
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    />

                    <RestaurantButton
                      text={dict.book}
                      variant="primary"
                      size="md"
                      withArrow={true}
                      onClick={handleReservationClick}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

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

export default Navbar;

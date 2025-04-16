"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import RestaurantIntro from "./RestaurantIntro";
import DiningCard from "./DiningCard";
import OpenTableWidget from "./OpenTableWidget";

interface RestaurantClientProps {
  dict: {
    title: string;
    subtitle: string;
    reservationTitle: string;
    description: string;
    reserveTable: string;
    restaurantIntro: {
      title: string;
      description: string;
      experience: string;
      highlight: string;
      reserveTable: string;
    };
    menu: {
      menuTitle: string;
      viewMenu: string;
      reserveTable: string;
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
  };
}

const RestaurantClient = ({ dict }: RestaurantClientProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springY = useSpring(y, { stiffness: 400, damping: 90 });
  const springImageScale = useSpring(imageScale, {
    stiffness: 400,
    damping: 90,
  });
  const springOpacity = useSpring(opacity, { stiffness: 400, damping: 90 });

  // Animation variants for the letters
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  // Animation variant for the subtitle
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.8,
      },
    },
  };

  return (
    <div id="home" className="text-white min-h-screen">
      <section
        className="relative h-screen overflow-hidden"
        aria-labelledby="restaurant-hero"
      >
        {/* Background Image with Gradient Overlay */}
        <motion.div
          style={{ y: springY, scale: springImageScale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10" />
          <Image
            src="/images/barNara.jpg"
            alt="NARA Restaurant interior with elegant Japanese-inspired decor and ambient lighting"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            className="brightness-50"
          />
        </motion.div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-between z-20 px-4 py-20">
          {/* Top Section - Creative Title */}
          <motion.header
            className="text-center relative pt-16"
            style={{ scale: 1, opacity: springOpacity }}
          >
            <motion.h2
              id="restaurant-hero"
              className="text-2xl font-light tracking-[0.2em] text-white/80 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {dict.title}
            </motion.h2>

            {/* NARA letters with individual animations */}
            <div className="relative flex items-center justify-center gap-3 md:gap-4 mb-12">
              {["N", "A", "R", "A"].map((letter, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                >
                  <span
                    className="inline-block text-8xl md:text-9xl lg:text-[11rem] font-normal tracking-wide"
                    style={{
                      color: "white",
                      textShadow: `
                        0 0 40px rgba(255,255,255,0.8),
                        0 0 80px rgba(255,255,255,0.4),
                        0 0 120px rgba(255,255,255,0.2)
                      `,
                      WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                    }}
                  >
                    {letter}
                  </span>
                  {/* Illuminated effect overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
                      mixBlendMode: "overlay",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl font-light tracking-widest text-white/90">
                {dict.subtitle}
              </p>
              <p className="text-lg font-light tracking-wide text-white/70">
                ✧ Sushi & japanese fusion kitchen ✧
              </p>
            </motion.div>
          </motion.header>

          {/* Middle Section - OpenTable Widget */}
          <section
            className="w-full max-w-5xl mx-auto relative"
            aria-labelledby="reservation-section"
          >
            <h2 id="reservation-section" className="sr-only">
              {dict.reservationTitle}
            </h2>
            <OpenTableWidget
              className="mt-8"
              dict={{
                reserveTable: dict.reserveTable,
                reservationTitle: dict.reservationTitle,
              }}
            />
          </section>

          {/* Bottom Section - Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="flex flex-col items-center"
            aria-hidden="true"
          >
            <div className="w-px h-16 bg-gradient-to-b from-white/20 via-white/10 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </section>

      <RestaurantIntro dict={dict.restaurantIntro} />
      <DiningCard
        dict={{
          ...dict.menu,
          reservationTitle: dict.reservationTitle,
        }}
      />
    </div>
  );
};

export default RestaurantClient;

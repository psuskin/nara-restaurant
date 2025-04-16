"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
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
  const scrollToMenu = () => {
    const menuSection = document.getElementById("nara-menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
                  onClick={scrollToMenu}
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
  );
};

export default RestaurantIntro;

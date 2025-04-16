"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    alt: "Restaurant interior",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    alt: "Gourmet dish",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    alt: "Chef preparing food",
  },
  {
    src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
    alt: "Cocktail",
  },
  {
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330",
    alt: "Dessert",
  },
  {
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330",
    alt: "Dessert",
  },
  {
    src: "https://images.unsplash.com/photo-1560053608-13721e0d69e8",
    alt: "Restaurant exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1592861956120-e524fc739696",
    alt: "Table setting",
  },
  {
    src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
    alt: "Appetizer",
  },
  {
    src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
    alt: "Appetizer",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    alt: "Restaurant interior 2",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    alt: "Restaurant interior 2",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    alt: "Gourmet dish 2",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    alt: "Chef preparing food 2",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    alt: "Chef preparing food 2",
  },
  
];

export default function RestaurantGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedImage(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getImageSize = (index: number) => {
    if (index % 7 === 0) return "col-span-2 row-span-2";
    if (index % 5 === 0) return "col-span-2";
    if (index % 3 === 0) return "row-span-2";
    return "";
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12">
      <motion.div
        className="grid grid-cols-4 gap-4 auto-rows-[200px]"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ${getImageSize(
              index
            )}`}
            onClick={() => setSelectedImage(image.src)}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              },
            }}
            whileHover={{ rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              height={1000}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="relative max-w-4xl w-full p-4"
              initial={{ scale: 0.9, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={selectedImage}
                alt="Selected restaurant image"
                width={1000}
                height={1000}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <XIcon className="w-6 h-6" />
                <span className="sr-only">Close</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

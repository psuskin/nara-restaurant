import Image from "next/image";
import { motion } from "framer-motion";

const FoodSection = () => {
  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };
  const textVariants = {
    hidden: (isEven: boolean) => ({ x: isEven ? 50 : -50, opacity: 0 }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const mainTitleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-28">
      <div className="container mx-auto px-4 py-7 relative">
        <motion.h1
          className="text-3xl md:text-6xl font-light text-white mb-12 text-start uppercase max-w-3xl absolute z-10 -top-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={mainTitleVariants}
        >
          This awaits you in the restaurant
        </motion.h1>

        {[
          {
            title: "SUSHI-RESTAURANT WITH LIVE COOKING",
            description:
              "At the sushi counter, you sit in the front row and watch the nimble sushi masters prepare your rolls. With fresh ingredients and practiced handles, a complete sushi boat is loaded in a few minutes. See for yourself.",
            image:
              "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "STEAKS FROM SOUTHBEND GRILL",
            description:
              "The east brigade is happy about a very special highlight in the east kitchen - the US Southbend Grill. The grill from the USA cooks the meat at around 800°C. This sudden high temperature closes the pores of the food to be grilled, so that the meat remains juicy on the inside and forms a caramelized crust with a unique taste.",
            image:
              "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "Dresscode",
            description:
              "Please respect our dress code casual elegant and refrain from wearing sweatpants and jogging suits, sportswear, flipflops and overly casual clothing at breakfast and when visiting the restaurant and bar in the evening.",
            image:
              "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            className="mb-12 last:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
              <motion.div variants={imageVariants} className="absolute inset-0">
                <Image
                  src={section.image}
                  alt={section.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </motion.div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  index % 2 === 0
                    ? "from-transparent via-black/30 to-black"
                    : "from-black via-black/30 to-transparent"
                } flex items-center`}
              >
                <motion.div
                  className={`w-full md:w-1/2 p-6 md:p-8 ${
                    index % 2 === 0 ? "ml-auto" : "mr-auto"
                  }`}
                  variants={textContainerVariants}
                >
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-secondary-color mb-2 md:mb-4"
                    variants={textVariants}
                    custom={index % 2 === 0}
                  >
                    {section.title}
                  </motion.h3>
                  <motion.p
                    className="text-white text-sm md:text-base line-clamp-4 md:line-clamp-none"
                    variants={textVariants}
                    custom={index % 2 === 0}
                  >
                    {section.description}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FoodSection;

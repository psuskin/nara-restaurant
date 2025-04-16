import React from "react";
import { motion } from "framer-motion";

interface RestaurantButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
}

const RestaurantButton: React.FC<RestaurantButtonProps> = ({
  text,
  onClick,
  className = "",
  variant = "outline",
  size = "md",
  withArrow = false,
}) => {
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-xs",
    lg: "px-6 py-3 text-sm",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-secondary-color text-black border border-secondary-color hover:bg-transparent hover:text-white",
    secondary:
      "bg-secondary-color text-black border border-secondary-color hover:bg-transparent hover:text-white",
    outline:
      "bg-transparent border border-secondary-color text-white hover:text-black",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        group relative overflow-hidden font-medium tracking-wider uppercase transition-all duration-300
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ y: -2 }}
    >
      <span className="relative z-10 flex items-center">
        {text}
        {withArrow && (
          <motion.svg
            className="ml-2 w-4 h-4"
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </motion.svg>
        )}
      </span>
      <div
        className={`
        absolute inset-0 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300
        ${
          variant === "primary"
            ? "bg-transparent"
            : variant === "secondary"
            ? "bg-transparent"
            : "bg-secondary-color"
        }
      `}
      ></div>
    </motion.button>
  );
};

export default RestaurantButton;

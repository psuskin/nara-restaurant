"use client";

import { ReactNode } from "react";

interface NaraButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const NaraButton = ({
  onClick,
  children,
  className = "",
  icon,
}: NaraButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`nara-button group relative px-10 py-4 text-lg md:text-xl font-medium tracking-wide overflow-hidden border-2 border-secondary-color text-secondary-color hover:text-black transition-colors duration-700 ${className}`}
    >
      {/* Wave fill effect from bottom */}
      <div className="absolute inset-0 bg-secondary-color translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" />

      {/* Side wave decorations */}
      <div className="absolute left-0 bottom-0 w-[2px] h-full bg-gradient-to-t from-secondary-color to-transparent group-hover:translate-y-0 transition-all duration-700 ease-in-out" />
      <div className="absolute right-0 bottom-0 w-[2px] h-full bg-gradient-to-t from-secondary-color to-transparent group-hover:translate-y-0 transition-all duration-700 ease-in-out" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {icon && (
          <span className="transition-colors duration-700 group-hover:text-black">
            {icon}
          </span>
        )}
        <span className="uppercase tracking-wider">{children}</span>
      </span>

      {/* Liquid wave effect at the top of the fill */}
      <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
        <div className="absolute inset-0 bg-secondary-color group-hover:animate-wave" />
      </div>

      <style jsx global>{`
        .nara-button {
          -webkit-transform: none !important;
          transform: none !important;
          -webkit-transition: color 0.7s !important;
          transition: color 0.7s !important;
          box-shadow: none !important;
          outline: none !important;
        }

        .nara-button:hover,
        .nara-button:focus,
        .nara-button:active {
          -webkit-transform: none !important;
          transform: none !important;
          box-shadow: none !important;
          outline: none !important;
        }

        @keyframes wave {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
};

export default NaraButton;

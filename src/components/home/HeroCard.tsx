import { cn } from "@/lib/utils";
import { useState } from "react";

export default function HeroCard() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative bg-[#543310]/90 text-white p-6 rounded-xl max-w-md mx-auto transition-all duration-300 text-center",
        "shadow-lg border border-[#AF8F6F]/20 backdrop-blur-sm",
        isHovered ? "transform scale-105 shadow-xl" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B3D0F]/30 to-transparent rounded-xl z-0"></div>
      
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-2">
          Hey, I&apos;m <span className="bg-[#AF8F6F] px-2 py-1 rounded-md shadow-sm">Luca</span> 👋
        </h1>
        <p className="text-xl">
          Explore my <span className="bg-[#74512D] px-2 py-1 rounded-md shadow-sm">work</span>
        </p>
      </div>
    </div>
  );
}

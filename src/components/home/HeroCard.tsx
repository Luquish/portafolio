import { cn } from "@/lib/utils";
import { useState } from "react";

export default function HeroCard() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative bg-[#543310]/90 text-white p-6 rounded-xl max-w-md mx-auto transition-all duration-300",
        isHovered ? "transform scale-105" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1 className="text-2xl font-bold mb-2">
        Hey, I&apos;m <span className="bg-[#AF8F6F] px-2 py-1 rounded-md">Luca</span> 👋
      </h1>
      <p className="mb-2">
        I&apos;m a <span className="text-[#F8F4E1]">full stack developer</span>
      </p>
      <p className="mb-4">
        currently at <span className="bg-[#74512D] px-2 py-1 rounded-md">GitHub</span>
      </p>
    </div>
  );
}

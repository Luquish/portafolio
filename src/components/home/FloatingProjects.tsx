import { useRef, useEffect } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function FloatingProjects({ isHovered }: { isHovered: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simplificado para mostrar el concepto
  const projectCards = projects.slice(0, 5).map((project, index) => {
    // Posiciones calculadas para distribuir las tarjetas alrededor
    const positions = [
      "top-10 -left-32",
      "top-0 right-0",
      "-bottom-40 -left-20",
      "-bottom-20 right-10",
      "left-1/2 -top-40",
    ];
    
    return (
      <div 
        key={project.id}
        className={cn(
          "absolute w-40 h-60 rounded-lg overflow-hidden transform rotate-3 transition-all duration-500",
          positions[index % positions.length],
          isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-4"
        )}
      >
        <div className={`bg-${getColor(index)} h-full w-full rounded-lg p-4`}>
          <div className="relative h-32 mb-2">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <h3 className="text-sm font-bold text-[#543310]">{project.title}</h3>
        </div>
      </div>
    );
  });
  
  return (
    <div ref={containerRef} className="relative h-full w-full">
      {projectCards}
    </div>
  );
}

function getColor(index: number) {
  const colors = ["[#F8F4E1]", "[#AF8F6F]/30", "[#74512D]/20", "[#543310]/10", "[#AF8F6F]/50"];
  return colors[index % colors.length];
}

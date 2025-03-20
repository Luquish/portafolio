import { useEffect, useRef } from "react";
import Image from "next/image";

// Define las aplicaciones que usas
const softwareIcons = [
  {
    name: "Figma",
    icon: "/icons/figma.svg", // Necesitarás agregar estos iconos
  },
  {
    name: "Framer",
    icon: "/icons/framer.svg",
  },
  {
    name: "Stack",
    icon: "/icons/stack.svg",
  },
  {
    name: "Dribbble",
    icon: "/icons/dribbble.svg",
  },
  {
    name: "Notion",
    icon: "/icons/notion.svg",
  },
  {
    name: "Spotify",
    icon: "/icons/spotify.svg",
  },
  // Puedes agregar más iconos aquí
];

export default function SoftwareSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Efecto para animar el carrusel infinito
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Duplicamos los items para crear el efecto infinito
    const scrollWidth = scrollContainer.scrollWidth / 2;
    let scrollPos = 0;
    
    const scroll = () => {
      scrollPos += 0.5; // Velocidad de desplazamiento
      
      // Reiniciar cuando llegamos al final del primer conjunto
      if (scrollPos >= scrollWidth) {
        scrollPos = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPos;
      }
      
      requestAnimationFrame(scroll);
    };
    
    const animationId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="bg-[#543310]/10 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-[#543310] mb-6">
        Software of choice
      </h2>
      
      <div className="relative overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex gap-4 py-4 overflow-x-hidden"
        >
          {/* Duplicamos los items para crear el efecto infinito */}
          {[...softwareIcons, ...softwareIcons].map((software, index) => (
            <div 
              key={`${software.name}-${index}`}
              className="bg-[#AF8F6F]/20 min-w-[80px] h-[80px] rounded-2xl flex items-center justify-center p-4 shrink-0"
            >
              {/* Si tienes SVGs puedes usar Image, si no, puedes usar div con background */}
              <div className="relative w-10 h-10">
                <Image 
                  src={software.icon} 
                  alt={software.name}
                  fill
                  className="object-contain filter invert-[0.25] sepia-[0.2] saturate-[0.5] hue-rotate-[320deg]"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradientes a los lados para suavizar el efecto */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#543310]/10 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#543310]/10 to-transparent z-10"></div>
      </div>
    </div>
  );
}

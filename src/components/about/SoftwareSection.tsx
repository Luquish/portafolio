import { useEffect, useRef } from "react";
import Image from "next/image";

// Define las aplicaciones que usas
const softwareIcons = [
  {
    name: "Figma",
    icon: "/icons/figma.svg",
  },
  {
    name: "Midjourney",
    icon: "/icons/midjourney.svg",
  },
  {
    name: "Spotify",
    icon: "/icons/spotify.svg",
  },
  {
    name: "ChatGPT",
    icon: "/icons/chatgpt.svg",
  },
  {
    name: "Cursor",
    icon: "/icons/cursor.svg",
  },
  {
    name: "Perplexity",
    icon: "/icons/perplexity.svg",
  },
  {
    name: "Notion",
    icon: "/icons/notion.svg",
  },
  {
    name: "Claude",
    icon: "/icons/claude.svg",
  },
  {
    name: "React",
    icon: "/icons/react.svg",
  },
  {
    name: "Next.js",
    icon: "/icons/nextjs.svg",
  },
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
    let animationId: number;
    
    const scroll = () => {
      scrollPos += 0.5; // Velocidad de desplazamiento
      
      // Reiniciar cuando llegamos al final del primer conjunto
      if (scrollPos >= scrollWidth) {
        scrollPos = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPos;
      }
      
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="bg-[#543310]/10 rounded-xl p-4 pb-5">
      <h2 className="text-lg font-bold text-[#543310] mb-5">
        Software of choice
      </h2>
      
      <div className="relative overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex gap-3 py-2 overflow-x-hidden"
        >
          {/* Duplicamos los items para crear el efecto infinito */}
          {[...softwareIcons, ...softwareIcons].map((software, index) => (
            <div 
              key={`${software.name}-${index}`}
              className="relative flex flex-col items-center shrink-0 pt-5 pb-2 group"
            >
              {/* Nombre del software que aparece al hacer hover */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[#5E3617] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {software.name}
              </div>
              
              {/* Cuadrado con el icono - cambia completamente de color al hacer hover */}
              <div className="bg-[#AF8F6F]/20 min-w-[70px] h-[70px] rounded-2xl flex items-center justify-center p-4 shrink-0 transition-colors group-hover:bg-[#5E3617]">
                <div className="relative w-8 h-8">
                  <Image 
                    src={software.icon} 
                    alt={software.name}
                    fill
                    className="object-contain transition-all group-hover:filter group-hover:invert group-hover:sepia-[0.5] group-hover:hue-rotate-[140deg] group-hover:saturate-[0.8] group-hover:brightness-[1.2] group-hover:contrast-[0.8]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradientes a los lados para suavizar el efecto */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#E4DEC9]/60 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#E4DEC9]/60 to-transparent z-10"></div>
      </div>
    </div>
  );
}

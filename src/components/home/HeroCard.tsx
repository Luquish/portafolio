import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function HeroCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );
  
  // Manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Establecer el ancho inicial al montar
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    
    // Limpiar listener al desmontar
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  
  // Determinar clases responsivas basadas en el ancho de la ventana
  const getResponsiveClasses = () => {
    if (windowWidth < 360) {
      return {
        container: "p-4 max-w-[270px]",
        title: "text-xl",
        text: "text-lg"
      };
    } else if (windowWidth < 480) {
      return {
        container: "p-5 max-w-[320px]",
        title: "text-xl",
        text: "text-lg"
      };
    } else if (windowWidth < 768) {
      return {
        container: "p-5 max-w-[340px]",
        title: "text-2xl",
        text: "text-xl"
      };
    } else {
      return {
        container: "p-6 max-w-md",
        title: "text-2xl",
        text: "text-xl"
      };
    }
  };
  
  const classes = getResponsiveClasses();
  
  return (
    <div 
      className={cn(
        "relative bg-[#543310]/90 text-white rounded-xl mx-auto transition-all duration-300 text-center",
        "shadow-lg border border-[#AF8F6F]/20 backdrop-blur-sm",
        classes.container,
        isHovered ? "transform scale-105 shadow-xl" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B3D0F]/30 to-transparent rounded-xl z-0"></div>
      
      <div className="relative z-10">
        <h1 className={`${classes.title} font-bold mb-2`}>
          Hey, I&apos;m <span className="bg-[#AF8F6F] px-2 py-1 rounded-md shadow-sm">Luca</span> 👋
        </h1>
        <p className={classes.text}>
          Explore my <span className="bg-[#74512D] px-2 py-1 rounded-md shadow-sm">work</span>
        </p>
      </div>
    </div>
  );
}

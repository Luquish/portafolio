import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

// Número máximo de proyectos a mostrar
const MAX_PROJECTS = 7;

// Posibles áreas para distribuir los proyectos
const POSITION_AREAS = [
  { top: "10%", left: "15%", rotate: "-10deg" },
  { top: "15%", right: "15%", rotate: "8deg" },
  { bottom: "25%", left: "22%", rotate: "-5deg" },
  { bottom: "15%", right: "20%", rotate: "12deg" },
  { top: "5%", left: "50%", rotate: "-8deg", transform: "translateX(-50%)" },
  { top: "50%", left: "10%", rotate: "5deg" },
  { top: "25%", right: "15%", rotate: "-7deg" },
  { top: "50%", right: "18%", rotate: "9deg" },
  { bottom: "30%", right: "14%", rotate: "6deg" },
];

// Colores para los fondos de los proyectos
const CARD_COLORS = ["amber-100", "yellow-100", "orange-100", "amber-200", "orange-200"];

export default function FloatingProjects({ isHovered }: { isHovered: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectPositions, setProjectPositions] = useState<Array<{
    project: typeof projects[0];
    position: typeof POSITION_AREAS[0];
    color: string;
  }>>([]);
  
  // Asignar proyectos a posiciones aleatorias cuando el componente se monta
  useEffect(() => {
    // Tomamos los proyectos más recientes primero (limitado por MAX_PROJECTS)
    const recentProjects = [...projects].slice(0, MAX_PROJECTS);
    
    // Creamos una copia de las posiciones y las mezclamos
    const shuffledPositions = [...POSITION_AREAS]
      .slice(0, MAX_PROJECTS)
      .sort(() => Math.random() - 0.5);
    
    // Asignamos cada proyecto a una posición y un color
    const positions = recentProjects.map((project, index) => {
      return {
        project,
        position: shuffledPositions[index],
        color: CARD_COLORS[index % CARD_COLORS.length]
      };
    });
    
    setProjectPositions(positions);
  }, []);
  
  return (
    <div ref={containerRef} className="relative h-full w-full">
      {projectPositions.map(({ project, position, color }) => (
        <div 
          key={project.id}
          className={cn(
            "absolute w-56 h-72 bg-[#FCFCF9] rounded-md overflow-hidden shadow-lg transition-all duration-700",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{
            ...position,
            transform: `${position.transform || ''} rotate(${position.rotate})`,
            zIndex: isHovered ? 5 : 0,
          }}
        >
          {/* Contenedor principal con estilo Polaroid */}
          <div className="w-full h-full p-2 pb-4 flex flex-col">
            {/* Imagen grande */}
            <div className="relative flex-grow w-full h-[80%] mb-3 rounded-sm overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Espacio inferior con título centrado */}
            <div className="h-14 flex items-center justify-center">
              <h3 className="text-base font-bold text-[#543310] text-center">{project.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

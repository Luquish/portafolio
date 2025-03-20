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
  { top: "40%", right: "10%", rotate: "-7deg" },
  { bottom: "35%", right: "30%", rotate: "9deg" },
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
            "absolute w-52 h-72 rounded-2xl overflow-hidden shadow-lg transition-all duration-700",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{
            ...position,
            transform: `${position.transform || ''} rotate(${position.rotate})`,
            zIndex: isHovered ? 5 : 0,
          }}
        >
          <div className={`bg-${color} h-full w-full rounded-lg p-5`}>
            <div className="relative h-36 mb-3 rounded overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-base font-bold text-[#543310] mb-1">{project.title}</h3>
            <p className="text-xs text-[#543310]/70 line-clamp-2">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

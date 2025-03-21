import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

// Número máximo de proyectos a mostrar
const MAX_PROJECTS = 11;

// Configuraciones para diferentes tamaños de pantalla
const getPositionAreas = (screenWidth: number) => {
  // Factor de escala basado en la referencia de 1920px
  const scaleFactor = screenWidth / 1920;
  
  return [
    // ZONA IZQUIERDA - 4 fotos
    { top: "8%", left: "12%", rotate: "-8deg" },      // Izquierda superior 1
    { top: "35%", left: "8%", rotate: "7deg" },       // Izquierda central
    { bottom: "32%", left: "20%", rotate: "-7deg" },  // Izquierda inferior 1
    { bottom: "12%", left: "12%", rotate: "5deg" },   // Izquierda inferior 2 (NUEVA)
    
    // ZONA DERECHA - 4 fotos
    { top: "5%", right: "20%", rotate: "10deg" },     // Derecha superior 1
    { top: "18%", right: "12%", rotate: "-6deg" },      // Derecha superior 2
    { top: "42%", right: "20%", rotate: "-9deg" },    // Derecha central
    { bottom: "10%", right: "12%", rotate: "8deg" },  // Derecha inferior
    
    // ZONA SUPERIOR CENTRO - 1 foto
    { top: "5%", left: "45%", rotate: "-3deg", transform: "translateX(-50%)" }, // Centro superior
    { top: "10%", left: "50%", rotate: "4deg" }, // Centro superior 2
    
    // ZONA INFERIOR CENTRO - 2 fotos nuevas
    { bottom: "12%", left: "50%", rotate: "-5deg", transform: "translateX(-50%)" }, // Centro inferior 1 (NUEVA)
  ];
};

// Colores para los fondos de los proyectos
const CARD_COLORS = ["amber-100", "yellow-100", "orange-100", "amber-200", "orange-200"];

export default function FloatingProjects({ isHovered }: { isHovered: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectPositions, setProjectPositions] = useState<Array<{
    project: typeof projects[0];
    position: any;
    color: string;
  }>>([]);
  const [windowWidth, setWindowWidth] = useState(1920);
  
  // Manejar el cambio de tamaño de la ventana
  useEffect(() => {
    // Establecer el ancho inicial
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Asignar proyectos a posiciones aleatorias cuando el componente se monta o cambia el tamaño
  useEffect(() => {
    // Obtener posiciones adaptadas al tamaño actual
    const positionAreas = getPositionAreas(windowWidth);
    
    // Tomamos los proyectos más recientes primero (limitado por MAX_PROJECTS)
    const recentProjects = [...projects].slice(0, MAX_PROJECTS);
    
    // Creamos una copia de las posiciones y las mezclamos
    const shuffledPositions = [...positionAreas]
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
  }, [windowWidth]);
  
  // Calcular el tamaño de las tarjetas basado en el ancho de la pantalla
  const cardWidth = Math.max(Math.min(windowWidth * 0.11, 224), 160); // Min 160px, Max 224px (56 * 4)
  const cardHeight = cardWidth * 1.286; // Mantener relación de aspecto
  
  return (
    <div ref={containerRef} className="relative h-full w-full">
      {projectPositions.map(({ project, position, color }) => (
        <div 
          key={project.id}
          className={cn(
            "absolute bg-[#FCFCF9] rounded-md overflow-hidden shadow-lg transition-all duration-700",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{
            ...position,
            transform: `${position.transform || ''} rotate(${position.rotate})`,
            zIndex: isHovered ? 5 : 0,
            width: `${cardWidth}px`,
            height: `${cardHeight}px`
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
            <div className="h-14 flex items-center justify-center px-1">
              <h3 className={`font-bold text-[#543310] text-center w-full
                ${windowWidth < 768 ? 'text-xs' : 
                  project.title.length > 30 ? 'text-xs' : 
                  project.title.length > 20 ? 'text-sm' : 
                  'text-base'}`}
              >
                {project.title.length > 45 ? `${project.title.substring(0, 42)}...` : project.title}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

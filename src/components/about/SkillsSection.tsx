import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/data";
import Image from "next/image";
import TrianglePointer from "@/components/icons/TrianglePointer";

// Definir tipo para las posiciones de cada skill
interface SkillPosition {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  name: string;
  pointer: string;
  pointerColor: string;
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skillPositions, setSkillPositions] = useState<SkillPosition[]>([]);
  const animationRef = useRef<number | null>(null);
  
  // Configurar posiciones iniciales aleatorias
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Generar posiciones aleatorias para cada skill
    const positions = skills.map((skill) => {
      // Extraer el color desde la clase bg-[color]
      const colorMatch = skill.color.match(/bg-\[(.*?)\]/);
      const pointerColor = colorMatch ? colorMatch[1] : "#E8915B";
      
      return {
        id: skill.name,
        x: Math.random() * (width - 150),
        y: Math.random() * (height - 50),
        targetX: Math.random() * (width - 150),
        targetY: Math.random() * (height - 50),
        color: skill.color || "bg-[#AF8F6F]",
        name: skill.name,
        pointer: "/pointer.svg",
        pointerColor
      };
    });
    
    setSkillPositions(positions);
  }, []);
  
  // Animar el movimiento de los skills
  useEffect(() => {
    if (skillPositions.length === 0 || !containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Función para actualizar posiciones con "easing"
    const updatePositions = () => {
      setSkillPositions(prev => {
        return prev.map(skill => {
          // Si está cerca del objetivo, generar un nuevo objetivo
          const distanceToTarget = Math.hypot(
            skill.x - skill.targetX,
            skill.y - skill.targetY
          );
          
          let newTargetX = skill.targetX;
          let newTargetY = skill.targetY;
          
          if (distanceToTarget < 1) {
            newTargetX = Math.random() * (width - 150);
            newTargetY = Math.random() * (height - 50);
          }
          
          // Interpolación con easing para movimiento fluido
          const newX = skill.x + (skill.targetX - skill.x) * 0.02;
          const newY = skill.y + (skill.targetY - skill.y) * 0.02;
          
          return {
            ...skill,
            x: newX,
            y: newY,
            targetX: newTargetX,
            targetY: newTargetY
          };
        });
      });
      
      animationRef.current = requestAnimationFrame(updatePositions);
    };
    
    animationRef.current = requestAnimationFrame(updatePositions);
    
    // Limpiar la animación cuando se desmonte
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [skillPositions.length]);
  
  // Actualizar objetivos cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();
      
      setSkillPositions(prev => {
        return prev.map(skill => ({
          ...skill,
          targetX: Math.random() * (width - 150),
          targetY: Math.random() * (height - 50)
        }));
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#543310]/10 rounded-xl p-5">
      <h2 className="text-xl font-bold text-[#543310] mb-4">
        Skills
      </h2>
      
      <div 
        ref={containerRef} 
        className="relative w-full h-[150px] overflow-hidden"
      >
        {skillPositions.map(skill => (
          <div
            key={skill.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${skill.x}px`,
              top: `${skill.y}px`,
              transition: 'left 0.1s ease-out, top 0.1s ease-out'
            }}
          >
            <div className="relative">
              {/* Usando el SVG como puntero */}
              <div className="absolute -top-4 -left-2">
                <TrianglePointer color={skill.pointerColor} />
              </div>
              
              {/* Etiqueta de skill */}
              <div className={`${skill.color} px-3 py-1 rounded-xl text-xs font-medium text-white`}>
                {skill.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

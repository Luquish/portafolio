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
  safeLimits?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skillPositions, setSkillPositions] = useState<SkillPosition[]>([]);
  const animationRef = useRef<number | null>(null);
  
  // Actualizar objetivos cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();
      
      setSkillPositions(prev => {
        return prev.map(skill => ({
          ...skill,
          // Restringir las posiciones objetivo para que estén siempre dentro del contenedor
          targetX: Math.random() * (width - 100), // Dejamos margen para el ancho de la skill
          targetY: Math.random() * (height - 30)  // Dejamos margen para la altura de la skill
        }));
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Asegurarnos de que las posiciones iniciales también respeten los límites y estén bien distribuidas
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Especificar las 4 skills que queremos mostrar
    const selectedSkills = [
      { name: "MACHINE LEARNING", color: "bg-[#6B3D0F]" },  // Marrón oscuro
      { name: "DESIGN", color: "bg-[#AF8F6F]" },           // Beige/marrón claro
      { name: "DATA SCIENCE", color: "bg-[#8B6B43]" },      // Marrón medio
      { name: "BUSINESS", color: "bg-[#543310]" }           // Marrón muy oscuro
    ];
    
    // Dividir el contenedor en cuadrantes para asegurar una mejor distribución
    const quadrants = [
      { xMin: 0, xMax: width/2, yMin: 0, yMax: height/2 },         // Superior izquierdo
      { xMin: width/2, xMax: width, yMin: 0, yMax: height/2 },     // Superior derecho
      { xMin: 0, xMax: width/2, yMin: height/2, yMax: height },    // Inferior izquierdo
      { xMin: width/2, xMax: width, yMin: height/2, yMax: height } // Inferior derecho
    ];
    
    // Generar posiciones bien distribuidas para cada skill
    const positions = selectedSkills.map((skill, index) => {
      // Extraer el color desde la clase bg-[color]
      const colorMatch = skill.color.match(/bg-\[(.*?)\]/);
      const pointerColor = colorMatch ? colorMatch[1] : "#E8915B";
      
      // Asignar a cada skill un cuadrante inicial para mejor distribución
      const quadrant = quadrants[index % quadrants.length];
      
      // Márgenes de seguridad aumentados
      const safeMarginX = 100;
      const safeMarginY = 50;
      
      // Calcular posición dentro del cuadrante, respetando márgenes
      const safeXMin = Math.max(quadrant.xMin + safeMarginX, safeMarginX);
      const safeXMax = Math.min(quadrant.xMax - safeMarginX, width - safeMarginX);
      const safeYMin = Math.max(quadrant.yMin + safeMarginY, safeMarginY);
      const safeYMax = Math.min(quadrant.yMax - safeMarginY, height - safeMarginY);
      
      // Asegurar que los valores máximos son mayores que los mínimos
      const finalXMin = Math.min(safeXMin, width - 2*safeMarginX);
      const finalXMax = Math.max(safeXMax, finalXMin + safeMarginX);
      const finalYMin = Math.min(safeYMin, height - 2*safeMarginY);
      const finalYMax = Math.max(safeYMax, finalYMin + safeMarginY);
      
      // Posiciones iniciales y objetivo dentro de los límites seguros
      const safeX = finalXMin + Math.random() * (finalXMax - finalXMin);
      const safeY = finalYMin + Math.random() * (finalYMax - finalYMin);
      
      return {
        id: skill.name,
        x: safeX,
        y: safeY,
        targetX: safeX, // Empezar con la misma posición para evitar movimientos iniciales bruscos
        targetY: safeY,
        color: skill.color,
        name: skill.name,
        pointer: "/pointer.svg",
        pointerColor,
        // Guardar los límites seguros específicos para esta skill
        safeLimits: {
          minX: finalXMin,
          maxX: finalXMax,
          minY: finalYMin,
          maxY: finalYMax
        }
      };
    });
    
    setSkillPositions(positions);
  }, []);

  // Modificar la función de animación para mantener mejor la separación
  useEffect(() => {
    if (skillPositions.length === 0 || !containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Aumentar la distancia mínima entre skills
    const minDistance = 120; // Incrementado de 80 a 120 píxeles
    
    // Función mejorada para verificar si una posición está demasiado cerca de otras skills
    const isTooCloseToOthers = (x: number, y: number, currentSkillId: string) => {
      return skillPositions.some(otherSkill => {
        if (otherSkill.id === currentSkillId) return false;
        
        const distance = Math.hypot(
          x - otherSkill.x,
          y - otherSkill.y
        );
        
        return distance < minDistance;
      });
    };
    
    // Función para aplicar corrección anti-solapamiento en tiempo real
    const adjustPositionToAvoidOverlap = (skill: SkillPosition) => {
      // No ajustar si no hay otras skills
      if (skillPositions.length <= 1) return { x: skill.x, y: skill.y };
      
      let adjustedX = skill.x;
      let adjustedY = skill.y;
      
      // Verificar si hay solapamiento con otras skills
      skillPositions.forEach(otherSkill => {
        if (otherSkill.id === skill.id) return;
        
        const distance = Math.hypot(
          skill.x - otherSkill.x,
          skill.y - otherSkill.y
        );
        
        if (distance < minDistance) {
          // Calcular vector de dirección
          const dirX = skill.x - otherSkill.x;
          const dirY = skill.y - otherSkill.y;
          
          // Normalizar vector
          const length = Math.max(0.1, Math.hypot(dirX, dirY));
          const normDirX = dirX / length;
          const normDirY = dirY / length;
          
          // Calcular cuánto nos falta para alcanzar la distancia mínima
          const pushDistance = minDistance - distance;
          
          // Aplicar fuerza de repulsión menor (30% en lugar de 50%)
          // para permitir más movimiento libre
          adjustedX += normDirX * pushDistance * 0.3;
          adjustedY += normDirY * pushDistance * 0.3;
        }
      });
      
      const limits = skill.safeLimits || {
        minX: 100,
        maxX: width - 100,
        minY: 50,
        maxY: height - 50
      };
      
      // Asegurarnos de que la posición ajustada esté dentro de los límites
      const boundedX = Math.max(limits.minX + 20, Math.min(limits.maxX - 20, adjustedX));
      const boundedY = Math.max(limits.minY + 10, Math.min(limits.maxY - 10, adjustedY));
      
      return { x: boundedX, y: boundedY };
    };
    
    // Función para actualizar posiciones con "easing"
    const updatePositions = () => {
      setSkillPositions(prev => {
        // Primero aplicamos el movimiento normal hacia los objetivos
        const updatedPositions = prev.map(skill => {
          const distanceToTarget = Math.hypot(
            skill.x - skill.targetX,
            skill.y - skill.targetY
          );
          
          // Siempre asignar nuevos objetivos si:
          // 1. Está muy cerca del objetivo actual (< 5 píxeles)
          // 2. O aleatoriamente con mayor probabilidad (2% en cada frame)
          // 3. O se ha quedado inmóvil (distancia muy pequeña al objetivo)
          const needsNewTarget = distanceToTarget < 5 || 
                                Math.random() < 0.02 || 
                                Math.abs(skill.x - skill.targetX) < 0.1;
          
          let newTargetX = skill.targetX;
          let newTargetY = skill.targetY;
          
          const limits = skill.safeLimits || {
            minX: 100,
            maxX: width - 100,
            minY: 50,
            maxY: height - 50
          };
          
          // SIEMPRE asignar un nuevo objetivo, incluso si no lo necesita técnicamente
          // Esto garantiza movimiento constante
          if (needsNewTarget || Math.random() < 0.005) {
            // Generar un punto aleatorio en cualquier lugar del contenedor
            // en lugar de basarnos en cuadrantes
            const safeMarginX = 100;
            const safeMarginY = 50;
            
            const safeXMin = safeMarginX;
            const safeXMax = width - safeMarginX;
            const safeYMin = safeMarginY; 
            const safeYMax = height - safeMarginY;
            
            // Elegir un punto aleatorio que esté lo suficientemente lejos 
            // de la posición actual para garantizar movimiento visible
            let newX, newY;
            do {
              newX = safeXMin + Math.random() * (safeXMax - safeXMin);
              newY = safeYMin + Math.random() * (safeYMax - safeYMin);
            } while (Math.hypot(newX - skill.x, newY - skill.y) < 50); // Asegurar distancia mínima de 50px
            
            // No usar findValidPosition aquí para evitar estancamientos
            // si no encuentra posición válida
            newTargetX = newX;
            newTargetY = newY;
          }
          
          // Aumentar la velocidad para un movimiento más notable
          // 0.015 en lugar de 0.007 (más del doble)
          const newX = skill.x + (skill.targetX - skill.x) * 0.015;
          const newY = skill.y + (skill.targetY - skill.y) * 0.015;
          
          // Asegurarnos de que siempre hay ALGÚN movimiento, incluso si es pequeño
          const forceMovementX = skill.x === newX ? skill.x + (Math.random() * 0.5 - 0.25) : newX;
          const forceMovementY = skill.y === newY ? skill.y + (Math.random() * 0.5 - 0.25) : newY;
          
          // Restricciones básicas para mantener dentro de los límites
          const boundedX = Math.max(limits.minX + 20, Math.min(limits.maxX - 20, forceMovementX));
          const boundedY = Math.max(limits.minY + 10, Math.min(limits.maxY - 10, forceMovementY));
          
          return {
            ...skill,
            x: boundedX,
            y: boundedY,
            targetX: newTargetX,
            targetY: newTargetY,
            safeLimits: limits
          };
        });
        
        // Ahora aplicamos el sistema de anti-colisión para separar skills superpuestas
        // Este paso es adicional al movimiento normal, pero con menos fuerza para permitir
        // más movimiento individual
        return updatedPositions.map(skill => {
          const adjusted = adjustPositionToAvoidOverlap(skill);
          return {
            ...skill,
            x: adjusted.x,
            y: adjusted.y
          };
        });
      });
      
      animationRef.current = requestAnimationFrame(updatePositions);
    };
    
    animationRef.current = requestAnimationFrame(updatePositions);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [skillPositions.length]);

  return (
    <div className="bg-[#543310]/10 rounded-xl p-5" style={{ paddingRight: "27px" }}>
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
              transition: 'left 0.1s ease-out, top 0.1s ease-out',
              // Añadir esto para debugging
              // outline: '1px solid red'
            }}
          >
            <div className="relative">
              {/* Etiqueta de skill */}
              <div className={`${skill.color} px-3 py-1 rounded-xl text-xs font-medium text-white relative`}>
                {/* SVG integrado directamente con el color de la skill y stroke más claro */}
                <div className="absolute -top-3 -left-2"> {/* Posición ajustada para que encaje con la esquina */}
                  <svg width="11" height="11" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M17.1289 40.2049L2.88012 4.23762C2.54371 3.38843 3.3782 2.54492 4.23095 2.87219L40.5335 16.8045C41.4347 17.1503 41.4568 18.4898 40.5873 18.9091C37.5696 20.3646 32.4002 23.2599 28.1705 27.6733C23.8187 32.2139 20.6964 37.4307 19.1445 40.3029C18.7058 41.1149 17.4689 41.0629 17.1289 40.2049Z" 
                      fill={skill.pointerColor} 
                      stroke={getLighterColor(skill.pointerColor)} 
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                {skill.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Función para obtener una versión más clara del color
function getLighterColor(color: string): string {
  // Si el color es un código hexadecimal, convertirlo a una versión más clara
  if (color.startsWith('#')) {
    // Convertir el color a valores RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    // Hacer el color más claro (aclarar en un 40%)
    const lighterR = Math.min(255, r + (255 - r) * 0.4);
    const lighterG = Math.min(255, g + (255 - g) * 0.4);
    const lighterB = Math.min(255, b + (255 - b) * 0.4);
    
    // Convertir de nuevo a hexadecimal
    return `#${Math.round(lighterR).toString(16).padStart(2, '0')}${Math.round(lighterG).toString(16).padStart(2, '0')}${Math.round(lighterB).toString(16).padStart(2, '0')}`;
  }
  
  // Si no es un color hexadecimal, devolver un color claro genérico
  return '#FFFFFF';
}

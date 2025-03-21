import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Definir tipo para las skills
interface SkillPosition {
  id: string;
  x: number;
  y: number;
  direction: { dx: number; dy: number };
  color: string;
  name: string;
  pointerColor: string;
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skillPositions, setSkillPositions] = useState<SkillPosition[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);

  // Las skills a mostrar
  const skills = [
    { name: "MACHINE LEARNING", color: "bg-[#6B3D0F]" },  // Dark brown
    { name: "DESIGN", color: "bg-[#AF8F6F]" },            // Light beige/brown
    { name: "DATA SCIENCE", color: "bg-[#8B6B43]" },      // Medium brown
    { name: "BUSINESS", color: "bg-[#543310]" },          // Very dark brown
    { name: "PYTHON", color: "bg-[#8B5A2B]" },            // Medium brown
    { name: "JAVASCRIPT", color: "bg-[#A0522D]" },        // Sienna
    { name: "WEB DEV", color: "bg-[#CD853F]" },           // Peru
    { name: "UI/UX", color: "bg-[#DEB887]" },             // Burlywood
    { name: "DATABASES", color: "bg-[#7E5835]" }          // Medium brown
  ];

  // Inicialización y manejo del redimensionado
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Obtener dimensiones iniciales
    const updateContainerSize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    };
    
    updateContainerSize();
    
    // Listener para redimensionado
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, []);

  // Inicializar posiciones cuando el contenedor tiene tamaño
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;
    
    // Obtener colores de pointer
    const getPointerColor = (bgColor: string) => {
      const colorMatch = bgColor.match(/bg-\[(.*?)\]/);
      return colorMatch ? colorMatch[1] : "#E8915B";
    };
    
    // Distribuir skills por todo el contenedor
    const initialPositions = skills.map((skill) => {
      // Márgenes para evitar que las skills se coloquen muy cerca de los bordes
      const margin = 60;
      
      // Posiciones aleatorias dentro de los límites
      const x = margin + Math.random() * (containerSize.width - 2 * margin);
      const y = margin + Math.random() * (containerSize.height - 2 * margin);
      
      // Calcular dirección de movimiento aleatoria (valores entre -1 y 1)
      const speed = 0.8; // Velocidad base aumentada
      let dx = (Math.random() * 2 - 1) * speed;
      let dy = (Math.random() * 2 - 1) * speed;
      
      // Asegurar un mínimo de velocidad en ambas direcciones
      const minSpeed = 0.3;
      dx = dx > 0 ? Math.max(dx, minSpeed) : Math.min(dx, -minSpeed);
      dy = dy > 0 ? Math.max(dy, minSpeed) : Math.min(dy, -minSpeed);
      
      return {
        id: skill.name,
        x,
        y,
        direction: { dx, dy },
        color: skill.color,
        name: skill.name,
        pointerColor: getPointerColor(skill.color)
      };
    });
    
    setSkillPositions(initialPositions);
  }, [containerSize]);

  // Animación de movimiento constante
  useEffect(() => {
    if (skillPositions.length === 0 || !containerRef.current) return;
    
    const animate = () => {
      setSkillPositions(prevPositions => {
        return prevPositions.map(skill => {
          // Calcular nueva posición
          let newX = skill.x + skill.direction.dx;
          let newY = skill.y + skill.direction.dy;
          
          // Nueva dirección (inicialmente igual a la actual)
          let newDx = skill.direction.dx;
          let newDy = skill.direction.dy;
          
          // CORRECCIÓN: Considerar la estructura completa incluyendo la flecha
          
          // 1. Ancho del texto - cada carácter aproximadamente 7px para texto MAYÚSCULA
          const textWidth = skill.name.length * 7;
          
          // 2. Ancho del contenedor (incluye padding)
          const containerPadding = 16; // 8px padding por lado
          
          // 3. Flecha - dimensiones y posición RESPECTO AL PUNTO CENTRAL del div principal
          const arrowWidth = 11;
          const arrowHeight = 11;
          
          // Posición de la flecha RESPECTO AL CENTRO del elemento principal
          // El div principal tiene transform: -translate-x-1/2 -translate-y-1/2, por lo que está centrado
          // La flecha está posicionada relativamente con "absolute -top-3 -left-2"
          const arrowLeftFromCenter = -((textWidth + containerPadding)/2) - 2; // -2px desde el borde izquierdo
          const arrowTopFromCenter = -(25/2) - 3; // -3px desde el borde superior
          
          // Dimensiones totales del elemento (contenedor + texto)
          const elementWidth = textWidth + containerPadding;
          const elementHeight = 25; // Altura aproximada del contenedor con texto
          
          // Calcular los puntos más extremos respecto al centro
          const leftEdge = Math.min(arrowLeftFromCenter, -elementWidth/2);
          const rightEdge = Math.max(arrowLeftFromCenter + arrowWidth, elementWidth/2);
          const topEdge = Math.min(arrowTopFromCenter, -elementHeight/2);
          const bottomEdge = Math.max(arrowTopFromCenter + arrowHeight, elementHeight/2);
          
          // Verificar límites horizontales considerando todos los elementos
          if (newX + leftEdge < 0 || newX + rightEdge > containerSize.width) {
            newDx = -newDx; // Cambiar dirección horizontal
            
            // Ajustar posición para evitar que se salga
            if (newX + leftEdge < 0) {
              newX = -leftEdge;
            } else {
              newX = containerSize.width - rightEdge;
            }
          }
          
          // Verificar límites verticales considerando todos los elementos
          if (newY + topEdge < 0 || newY + bottomEdge > containerSize.height) {
            newDy = -newDy; // Cambiar dirección vertical
            
            // Ajustar posición para evitar que se salga
            if (newY + topEdge < 0) {
              newY = -topEdge;
            } else {
              newY = containerSize.height - bottomEdge;
            }
          }
          
          // Pequeña variación aleatoria ocasional para movimiento más orgánico
          if (Math.random() < 0.03) {
            const variation = 0.2;
            newDx += (Math.random() * variation * 2 - variation);
            newDy += (Math.random() * variation * 2 - variation);
            
            // Asegurar que la velocidad se mantiene en un rango razonable
            const maxSpeed = 1.2;
            const minSpeed = 0.3;
            
            newDx = Math.sign(newDx) * Math.min(Math.max(Math.abs(newDx), minSpeed), maxSpeed);
            newDy = Math.sign(newDy) * Math.min(Math.max(Math.abs(newDy), minSpeed), maxSpeed);
          }
          
          return {
            ...skill,
            x: newX,
            y: newY,
            direction: { dx: newDx, dy: newDy }
          };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [skillPositions.length, containerSize]);

  // Función para obtener una versión más clara del color
  const getLighterColor = (color: string): string => {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      const lighterR = Math.min(255, r + (255 - r) * 0.4);
      const lighterG = Math.min(255, g + (255 - g) * 0.4);
      const lighterB = Math.min(255, b + (255 - b) * 0.4);
      
      return `#${Math.round(lighterR).toString(16).padStart(2, '0')}${Math.round(lighterG).toString(16).padStart(2, '0')}${Math.round(lighterB).toString(16).padStart(2, '0')}`;
    }
    return '#FFFFFF';
  };

  return (
    <div className="bg-[#543310]/10 rounded-xl p-5" style={{ paddingRight: "27px" }}>
      <h2 className="text-xl font-bold text-[#543310] mb-4">
        Skills
      </h2>
      
      <div 
        ref={containerRef} 
        className="relative w-full h-[250px] overflow-hidden"
      >
        {skillPositions.map(skill => (
          <div
            key={skill.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${skill.x}px`,
              top: `${skill.y}px`,
            }}
          >
            <div className="relative">
              <div className={`${skill.color} px-3 py-1 rounded-xl text-xs font-medium text-white relative whitespace-nowrap`}>
                <div className="absolute -top-3 -left-2">
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

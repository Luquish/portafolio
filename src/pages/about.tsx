import Layout from "@/components/layout/Layout";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import SkillsSection from "@/components/about/SkillsSection";
import SoftwareSection from "@/components/about/SoftwareSection";
import ProfileCard from "@/components/about/ProfileCard";
import ProfessionalObjectiveSection from "@/components/about/ProfessionalObjectiveSection";
import { useEffect, useState } from "react";

export default function About() {
  // Detectar si estamos en dispositivo móvil
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Actualizar el estado basado en el ancho de la ventana
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Comprobar inicialmente
    checkMobile();
    
    // Comprobar cuando la ventana cambia de tamaño
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Hacer que el scroll funcione en toda la página pero solo afecte a la sección derecha
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!isMobile) { // Solo aplicar en tamaños de escritorio
        e.preventDefault();
        const rightSection = document.getElementById('right-section');
        if (rightSection) {
          rightSection.scrollTop += e.deltaY * 1.5;
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [isMobile]);

  // Ajustar la posición inicial del scroll
  useEffect(() => {
    if (!isMobile) { // Solo en escritorio
      const rightSection = document.getElementById('right-section');
      if (rightSection) {
        rightSection.scrollTop = 0;
      }
    }
  }, [isMobile]);

  return (
    <Layout title="About | Luca Mazzarello">
      <div className="flex flex-col md:flex-row gap-6 max-w-[1200px] mx-auto px-2 py-6 min-h-screen">
        {/* Lado izquierdo - Usando ProfileCard */}
        <div className="w-full md:w-[45%] md:mb-0">
          <ProfileCard />
        </div>
        
        {/* Lado derecho - Secciones con scroll */}
        <div 
          id="right-section" 
          className="w-full md:w-[55%] h-auto md:h-screen overflow-y-visible md:overflow-y-auto no-scrollbar pt-6 -mt-6"
          style={{ maxHeight: isMobile ? "none" : "calc(100vh - 48px)" }}
        >
          <div className="space-y-3 pr-0 md:pr-4 pb-16">
            <AboutSection />
            <ProfessionalObjectiveSection />
            <ExperienceSection />
            <SkillsSection />
            <SoftwareSection />
          </div>
        </div>
      </div>
    </Layout>
  );
}

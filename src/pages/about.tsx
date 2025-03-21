import Layout from "@/components/layout/Layout";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import SkillsSection from "@/components/about/SkillsSection";
import SoftwareSection from "@/components/about/SoftwareSection";
import ProfileCard from "@/components/about/ProfileCard";
import ProfessionalObjectiveSection from "@/components/about/ProfessionalObjectiveSection";
import { useEffect } from "react";

export default function About() {
  // Hacer que el scroll funcione en toda la página pero solo afecte a la sección derecha
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const rightSection = document.getElementById('right-section');
      if (rightSection) {
        rightSection.scrollTop += e.deltaY * 1.5;
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  // Ajustar la posición inicial del scroll
  useEffect(() => {
    const rightSection = document.getElementById('right-section');
    if (rightSection) {
      rightSection.scrollTop = 100;
    }
  }, []);

  return (
    <Layout title="About | Luca Mazzarello">
      <div className="flex gap-6 max-w-[1200px] mx-auto px-2 py-6 min-h-screen">
        {/* Lado izquierdo - Usando ProfileCard */}
        <div className="w-[45%]">
          <ProfileCard />
        </div>
        
        {/* Lado derecho - Secciones con scroll (aumentado) */}
        <div 
          id="right-section" 
          className="w-[55%] h-screen overflow-y-auto no-scrollbar pt-6 -mt-6"
          style={{ maxHeight: "calc(100vh - 48px)" }}
        >
          <div className="space-y-3 pr-4 pb-16">
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

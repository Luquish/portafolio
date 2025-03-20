import Layout from "@/components/layout/Layout";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import SkillsSection from "@/components/about/SkillsSection";
import SoftwareSection from "@/components/about/SoftwareSection";
import ContactSection from "@/components/about/ContactSection";
import { MapPin, Briefcase } from "lucide-react";
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
        {/* Lado izquierdo - Hey Again (adaptable al contenido) */}
        <div className="w-[48%]">
          <div className="rounded-xl overflow-hidden bg-[#543310]/10 shadow-sm">
            {/* Foto de perfil */}
            <div className="w-full p-6 pb-0">
              <div className="aspect-square relative rounded-xl overflow-hidden">
                <img 
                  src="/profile.jpg" 
                  alt="Profile photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Contenido de texto - altura automática */}
            <div className="p-4 pt-3">
              <h2 className="text-2xl font-bold text-[#543310] mb-1">
                Hey again 👋
              </h2>
              
              <p className="text-[#74512D] mb-4">
                I'm currently at Prisma, where I get to create digital experiences that are
                functional, fun, and positively impact people's lives by making their tech
                less painful and more pleasurable!
              </p>
              
              {/* Etiquetas - al final de la tarjeta */}
              <div className="flex gap-2 mt-1">
                <div className="flex items-center gap-1 bg-[#543310]/20 text-[#543310] px-4 py-2 rounded-full text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>ARGENTINA</span>
                </div>
                <div className="flex items-center gap-1 bg-[#543310]/20 text-[#543310] px-4 py-2 rounded-full text-sm">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span>FREELANCE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lado derecho - Secciones con scroll */}
        <div 
          id="right-section" 
          className="w-[47%] h-screen overflow-y-auto no-scrollbar pt-6 -mt-6"
          style={{ maxHeight: "calc(100vh - 48px)" }}
        >
          <div className="space-y-3 pr-4 pb-16">
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <SoftwareSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </Layout>
  );
}

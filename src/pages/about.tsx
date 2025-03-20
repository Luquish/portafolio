import Layout from "@/components/layout/Layout";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import SkillsSection from "@/components/about/SkillsSection";
import SoftwareSection from "@/components/about/SoftwareSection";
import ContactSection from "@/components/about/ContactSection";
import { MapPin, Briefcase } from "lucide-react";

export default function About() {
  return (
    <Layout title="About | Luca Mazzarello">
      <div className="flex gap-4 max-w-[1200px] mx-auto px-4 py-6">
        {/* Lado izquierdo - Tarjeta de perfil */}
        <div className="w-1/2 flex items-start">
          <div className="rounded-xl overflow-hidden bg-[#543310]/10 shadow-sm w-full">
            {/* Foto de perfil con padding y bordes redondeados */}
            <div className="p-6 pt-6 pb-0">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                <img 
                  src="/profile.jpg" 
                  alt="Profile photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Contenido de texto - Con padding ajustado */}
            <div className="p-6 flex flex-col">
              <h2 className="text-2xl font-bold text-[#543310] mb-2">
                Hey again 👋
              </h2>
              
              <p className="text-[#74512D] mb-6">
                I'm currently at Prisma, where I get to create digital experiences that are
                functional, fun, and positively impact people's lives by making their tech
                less painful and more pleasurable!
              </p>
              
              {/* Etiquetas con menos espacio superior */}
              <div className="flex gap-2">
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
        
        {/* Lado derecho - Secciones */}
        <div className="w-1/2 overflow-y-auto max-h-screen">
          <div className="space-y-4 pr-2">
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

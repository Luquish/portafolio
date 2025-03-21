import Layout from "@/components/layout/Layout";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useEffect } from "react";

export default function Projects() {
  // Añadir efecto para controlar el scroll
  useEffect(() => {
    // Ajustar el padding inferior del contenedor para que el contenido
    // termine por encima de la navbar
    const adjustPadding = () => {
      const navbar = document.querySelector('nav');
      const container = document.querySelector('.container');
      
      if (navbar && container) {
        // Altura de la navbar + espacio adicional deseado
        const navbarHeight = navbar.getBoundingClientRect().height;
        const paddingBottom = navbarHeight + 40; // 40px de espacio extra
        
        (container as HTMLElement).style.paddingBottom = `${paddingBottom}px`;
      }
    };
    
    // Ejecutar al cargar y cuando cambie el tamaño de ventana
    adjustPadding();
    window.addEventListener('resize', adjustPadding);
    
    return () => {
      window.removeEventListener('resize', adjustPadding);
    };
  }, []);
  
  return (
    <Layout title="Projects | Luca Mazzarello">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-[#543310] mb-8 text-center">
          My Projects
        </h1>
        <ProjectGrid />
      </div>
    </Layout>
  );
}

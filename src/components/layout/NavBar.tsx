import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Pen, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const router = useRouter();
  const [prevPath, setPrevPath] = useState(router.pathname);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isActive = (path: string) => router.pathname === path;
  const wasPreviouslyActive = (path: string) => prevPath === path && router.pathname !== path;
  
  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Pen, path: "/projects", label: "Projects" },
    { icon: User, path: "/about", label: "About" },
    { icon: Mail, path: "/contact", label: "Contact", divider: true },
  ];

  // Controlar la animación cuando cambia la ruta
  useEffect(() => {
    if (prevPath !== router.pathname) {
      setIsAnimating(true);
      
      // Después de la animación completa, restablecer el estado
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setPrevPath(router.pathname);
      }, 800); // Tiempo razonable para la animación
      
      return () => clearTimeout(timeout);
    }
  }, [router.pathname, prevPath]);

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-[#F8F4E1]/80 backdrop-blur-sm border border-[#AF8F6F]/30 rounded-full p-2 shadow-lg relative">
        {navItems.map(({ icon: Icon, path, label, divider }, index) => (
          <div key={index} className="group relative flex items-center">
            {/* Línea divisoria */}
            {divider && (
              <div className="w-px h-5 bg-[#AF8F6F]/50 mx-1.5"></div>
            )}
            
            <Link 
              href={path}
              className={cn(
                "p-3 rounded-full transition-all duration-300 relative flex items-center justify-center",
                isActive(path) 
                  ? "text-[#543310]" 
                  : "text-[#74512D] hover:bg-[#F8F4E1] hover:text-[#543310]"
              )}
            >
              <Icon className="h-5 w-5 relative z-10" />
              
              {/* Sombra que se achica cuando sale */}
              {wasPreviouslyActive(path) && isAnimating && (
                <div 
                  className="absolute inset-0 bg-[#AF8F6F]/60 rounded-full animate-shrink"
                ></div>
              )}
              
              {/* Sombra que se agranda cuando entra */}
              {isActive(path) && (
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full",
                    isAnimating 
                      ? "bg-[#AF8F6F]/60 animate-grow" 
                      : "bg-[#AF8F6F]/30"
                  )}
                ></div>
              )}
            </Link>

            {/* Etiqueta de página que aparece en hover - sin el pico */}
            <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-[#2A2A2A] text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {label}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

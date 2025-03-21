import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    color?: string;
    githubUrl?: string;
    demoUrl?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Usando tu paleta para los colores
  const colors = {
    bg: project.color || "bg-[#F8F4E1]",
    text: "text-[#543310]",
    tag: "bg-[#AF8F6F]/20 text-[#543310]"
  };

  return (
    <div className={cn(
      "rounded-xl overflow-hidden p-4 h-full transition-all hover:shadow-lg",
      colors.bg
    )}>
      <div className="relative w-full aspect-video mb-3 rounded-lg overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      
      <h2 className={cn("text-xl font-bold mb-1", colors.text)}>
        {project.title}
      </h2>
      
      <p className="text-[#74512D] mb-2 text-sm">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tags && project.tags.map(tag => (
          <span 
            key={tag} 
            className="px-2 py-0.5 rounded-full text-xs uppercase font-medium bg-[#AF8F6F]/20 text-[#543310]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-auto justify-end">
        {project.githubUrl && (
          <Link 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full text-[#543310] hover:bg-[#543310]/10 transition-all"
            aria-label="Ver repositorio en GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </Link>
        )}
        {project.demoUrl && (
          <Link 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full text-[#543310] hover:bg-[#543310]/10 transition-all"
            aria-label="Ver demo del proyecto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

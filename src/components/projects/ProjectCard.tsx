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
    <Link href={`/projects/${project.id}`}>
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
        
        <div className="flex flex-wrap gap-1">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-0.5 rounded-full text-xs uppercase font-medium bg-[#AF8F6F]/20 text-[#543310]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

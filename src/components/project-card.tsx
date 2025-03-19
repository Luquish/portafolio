import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string
  demoUrl?: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-[#F8F4E1] border-[#AF8F6F]/30 hover:shadow-md transition-shadow duration-300">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=300&width=500"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-[#543310]">{project.title}</CardTitle>
        <CardDescription className="text-[#74512D]">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-[#AF8F6F]/20 text-[#543310] hover:bg-[#AF8F6F]/30">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="ghost" size="sm" className="text-[#74512D] hover:text-[#543310] hover:bg-[#AF8F6F]/10">
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            Code
          </Link>
        </Button>
        {project.demoUrl && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-[#74512D] hover:text-[#543310] hover:bg-[#AF8F6F]/10"
          >
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}


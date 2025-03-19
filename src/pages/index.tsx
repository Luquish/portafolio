import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { Github, Mail } from "lucide-react"
import Script from 'next/script'

import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import { projects } from "@/lib/data"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <>
      <Head>
        <title>Luca Mazzarello | Portfolio</title>
        <meta name="description" content="GitHub portfolio showcasing open source projects and contributions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Script 
        src="https://unpkg.com/es-module-shims@1.7.3/dist/es-module-shims.js"
        strategy="afterInteractive"
      />
      
      <div className="min-h-screen bg-[#F8F4E1]">
        {/* Hero Section */}
        <HeroSection />

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-[#AF8F6F]/10">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#543310] mb-4">Open Source Projects</h2>
              <p className="max-w-2xl mx-auto text-[#74512D]">
                A collection of my GitHub repositories and contributions. Each project showcases different technologies
                and problem-solving approaches.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <div className="relative aspect-square max-w-md mx-auto md:mr-auto">
                <div className="absolute inset-0 rounded-xl bg-[#AF8F6F]/20 rotate-6"></div>
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="About me"
                  width={400}
                  height={400}
                  className="relative rounded-xl object-cover border-4 border-[#F8F4E1] shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#543310]">About Me</h2>
                <p className="text-[#74512D]">
                  I'm a passionate software engineer with a focus on creating elegant, efficient solutions to complex
                  problems. My journey in development has led me to contribute to various open source projects and build
                  my own tools.
                </p>
                <p className="text-[#74512D]">
                  I believe in the power of open source collaboration and continuous learning. When I'm not coding, you
                  can find me exploring new technologies and contributing to developer communities.
                </p>
                <div className="pt-4">
                  <h3 className="text-xl font-semibold text-[#543310] mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Node.js", "Git", "CI/CD", "Cloud Architecture"].map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full text-sm bg-[#AF8F6F]/20 text-[#543310]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-[#AF8F6F]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-[#543310] mb-4">Get In Touch</h2>
              <p className="text-[#74512D]">
                Interested in collaborating on a project or discussing open source contributions? Feel free to reach out
                through any of the platforms below.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#543310] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-md border border-[#AF8F6F] bg-[#F8F4E1] focus:outline-none focus:ring-2 focus:ring-[#74512D]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#543310] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-md border border-[#AF8F6F] bg-[#F8F4E1] focus:outline-none focus:ring-2 focus:ring-[#74512D]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#543310] mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-[#AF8F6F] bg-[#F8F4E1] focus:outline-none focus:ring-2 focus:ring-[#74512D]"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-[#74512D] hover:bg-[#543310] text-white">
                  Send Message
                </Button>
              </form>
              <div className="mt-8 flex justify-center space-x-6">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#74512D] hover:text-[#543310]"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="mailto:your-email@example.com" className="text-[#74512D] hover:text-[#543310]">
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-[#AF8F6F]/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#74512D]">© {new Date().getFullYear()} Luca Mazzarello. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <Link href="#" className="text-[#74512D] hover:text-[#543310]">
                  Back to top
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}


export interface Software {
  name: string;
  description: string;
  category: string;
  icon?: string;
}

export const software: Software[] = [
  // Development
  {
    name: "Visual Studio Code",
    description: "Primary code editor for development",
    category: "Development",
    icon: "vscode"
  },
  {
    name: "Cursor",
    description: "AI-powered code editor",
    category: "Development",
    icon: "cursor"
  },
  {
    name: "Git",
    description: "Version control and collaboration",
    category: "Development",
    icon: "git"
  },
  {
    name: "GitHub",
    description: "Repository hosting and collaboration platform",
    category: "Development",
    icon: "github"
  },
  {
    name: "React",
    description: "UI library for building interfaces",
    category: "Development",
    icon: "react"
  },
  {
    name: "Next.js",
    description: "React framework for web applications",
    category: "Development",
    icon: "nextjs"
  },
  
  // Design
  {
    name: "Figma",
    description: "Interface design and prototyping",
    category: "Design",
    icon: "figma"
  },
  {
    name: "Midjourney",
    description: "AI image generation",
    category: "Design",
    icon: "midjourney"
  },
  {
    name: "Adobe Photoshop",
    description: "Image editing and manipulation",
    category: "Design",
    icon: "photoshop"
  },
  {
    name: "Adobe Premiere",
    description: "Video editing",
    category: "Design",
    icon: "premiere"
  },
  
  // AI and Tools
  {
    name: "ChatGPT",
    description: "AI assistant for content generation",
    category: "AI",
    icon: "chatgpt"
  },
  {
    name: "Claude",
    description: "AI assistant for text generation",
    category: "AI",
    icon: "claude"
  },
  {
    name: "Perplexity",
    description: "AI-powered research assistant",
    category: "AI",
    icon: "perplexity"
  },
  {
    name: "TensorFlow",
    description: "Machine learning framework",
    category: "AI",
    icon: "tensorflow"
  },
  {
    name: "PyTorch",
    description: "Deep learning library",
    category: "AI",
    icon: "pytorch"
  },
  {
    name: "Scikit-learn",
    description: "Machine learning library",
    category: "AI",
    icon: "scikit"
  },
  
  // Productivity
  {
    name: "Notion",
    description: "Project management and documentation",
    category: "Productivity",
    icon: "notion"
  },
  {
    name: "Spotify",
    description: "Music streaming for focus",
    category: "Productivity",
    icon: "spotify"
  },
  {
    name: "LaTeX",
    description: "Technical document writing",
    category: "Productivity",
    icon: "latex"
  },
  {
    name: "Microsoft Office",
    description: "Word, Excel and PowerPoint for documentation",
    category: "Productivity",
    icon: "office"
  },
  {
    name: "Google Workspace",
    description: "Docs, Sheets and cloud collaboration",
    category: "Productivity",
    icon: "google"
  },
  {
    name: "Zapier",
    description: "Workflow automation",
    category: "Productivity",
    icon: "zapier"
  }
];

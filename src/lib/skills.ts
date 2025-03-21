export interface Skill {
  name: string;
  description: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      {
        name: "Python",
        description: "Application development, data analysis, machine learning",
        icon: "python"
      },
      {
        name: "JavaScript",
        description: "Frontend and backend web development",
        icon: "javascript"
      },
      {
        name: "C++",
        description: "High-performance software development",
        icon: "cplusplus"
      },
      {
        name: "R",
        description: "Statistical analysis and data visualization",
        icon: "r"
      }
    ]
  },
  {
    category: "Machine Learning Tools",
    skills: [
      {
        name: "TensorFlow",
        description: "Deep learning model development",
        icon: "tensorflow"
      },
      {
        name: "PyTorch",
        description: "Neural network implementation",
        icon: "pytorch"
      },
      {
        name: "Scikit-learn",
        description: "Classical machine learning algorithms",
        icon: "scikit"
      }
    ]
  },
  {
    category: "Web Development & Databases",
    skills: [
      {
        name: "HTML & CSS",
        description: "Web interface layout and styling",
        icon: "html5"
      },
      {
        name: "SQL",
        description: "Relational database management and querying",
        icon: "database"
      },
      {
        name: "Git",
        description: "Version control and collaboration",
        icon: "git"
      },
      {
        name: "APIs",
        description: "Development and integration of programming interfaces",
        icon: "api"
      },
      {
        name: "Responsive Design",
        description: "Device-adaptable design",
        icon: "responsive"
      },
      {
        name: "Figma",
        description: "Interface design and prototyping",
        icon: "figma"
      }
    ]
  },
  {
    category: "Cloud & MLOps",
    skills: [
      {
        name: "Docker",
        description: "Application containerization",
        icon: "docker"
      },
      {
        name: "CI/CD",
        description: "Continuous integration and deployment",
        icon: "cicd"
      },
      {
        name: "Model Deployment",
        description: "ML model implementation in production",
        icon: "deployment"
      }
    ]
  },
  {
    category: "Additional Tools",
    skills: [
      {
        name: "Notion",
        description: "Project management and documentation",
        icon: "notion"
      },
      {
        name: "LaTeX",
        description: "Technical document writing",
        icon: "latex"
      },
      {
        name: "Adobe Creative Suite",
        description: "Image and video editing with Photoshop and Premiere",
        icon: "adobe"
      },
      {
        name: "Office Suite",
        description: "Excel, Sheets, Word, Docs, etc.",
        icon: "office"
      },
      {
        name: "Zapier",
        description: "Workflow automation",
        icon: "zapier"
      }
    ]
  },
  {
    category: "Frameworks",
    skills: [
      {
        name: "Next.js",
        description: "React framework for web applications",
        icon: "nextjs"
      },
      {
        name: "Vite",
        description: "Frontend development tool",
        icon: "vite"
      }
    ]
  }
];

export const softSkills: Skill[] = [
  {
    name: "Analytical Thinking",
    description: "Ability to break down complex problems and propose logical solutions",
    icon: "analytics"
  },
  {
    name: "Creativity & Innovation",
    description: "Innovative approach to technological project development",
    icon: "creativity"
  },
  {
    name: "Teamwork",
    description: "Strong collaboration skills in multidisciplinary and high-performance environments",
    icon: "team"
  },
  {
    name: "Organization & Time Management",
    description: "Efficiency in planning and executing projects in dynamic environments",
    icon: "time"
  }
];

export const languages: Skill[] = [
  {
    name: "Spanish",
    description: "Native",
    icon: "es"
  },
  {
    name: "English",
    description: "C1",
    icon: "en"
  }
];

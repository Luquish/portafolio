export interface Education {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  courses?: string[];
  experiences?: string[];
}

export interface Achievement {
  title: string;
  description?: string;
}

export interface Project {
  title: string;
  description: string[];
  technologies?: string[];
  year: string;
  link?: string;
}

export interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const education: Education[] = [
  {
    institution: "Universidad Torcuato Di Tella",
    degree: "Bachelor's Degree in Digital Technology",
    period: "2021 - 2024",
    courses: [
      "Programming, Algorithms, and Data Structures",
      "Software Engineering and Computer Networks",
      "Artificial Intelligence and Databases",
      "Data Engineering and Computational Methods"
    ],
    experiences: [
      "Exchange Program at Universidad Carlos III (2024)"
    ]
  },
  {
    institution: "Escuela Técnica ORT",
    degree: "High School Diploma in Communication with a Specialization in Media Production",
    period: "2015 - 2020",
    experiences: [
      "Graduated with honors",
      "Exchange Program in London (2018)"
    ]
  }
];

export const achievements: Achievement[] = [
  {
    title: "Champion of \"Oa6 4 University of IBM Consulting 2024\" at Universidad Carlos III"
  },
  {
    title: "Exchange Program in London"
  },
  {
    title: "University Exchange Program in Madrid"
  }
];

export const projects: Project[] = [
  {
    title: "Generative AI Learning Platform",
    description: [
      "Participated in the IBM Consulting competition, developing an educational platform integrating a chatbot trained by professors to interact with students.",
      "Achieved 1st place at Universidad Carlos III, securing an internship at IBM and continuing the project's development."
    ],
    technologies: ["Python", "TensorFlow", "Next.js"],
    year: "2024",
    link: "#"
  }
];

export const experience: Job[] = [
  {
    company: "Escuela Técnica ORT",
    role: "High School Diploma in Communication",
    period: "2015 - 2020", 
    description: "Specialized in Media Production, developing skills in multimedia content creation, communication strategies, and digital technologies. Graduated with honors, demonstrating academic excellence and commitment throughout the program."
  },
  {
    company: "London Exchange Program",
    role: "International Student",
    period: "2018",
    description: "Participated in a cultural and educational exchange program in London, gaining international experience and improving language skills while being exposed to different educational methodologies."
  },
  {
    company: "Universidad Torcuato Di Tella",
    role: "Bachelor's Student in Digital Technology",
    period: "2021 - 2024",
    description: "Studied programming, algorithms, data structures, software engineering, computer networks, artificial intelligence, databases, and data engineering. Developed practical projects using machine learning frameworks and participated in initiatives that integrate technological innovation with problem-solving."
  },
  {
    company: "Universidad Carlos III",
    role: "Exchange Student",
    period: "2024",
    description: "Participated in an international exchange program focusing on advanced computer science topics, artificial intelligence, and collaborative projects with industry partners."
  },
];

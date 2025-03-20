import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroCard from "@/components/home/HeroCard";
import FloatingProjects from "@/components/home/FloatingProjects";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Layout>
      <div className="relative min-h-screen flex items-center justify-center">
        <div 
          className="relative z-10 transform scale-150"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <HeroCard />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <FloatingProjects isHovered={isHovered} />
        </div>
      </div>
    </Layout>
  );
}


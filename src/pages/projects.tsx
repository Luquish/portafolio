import Layout from "@/components/layout/Layout";
import ProjectGrid from "@/components/projects/ProjectGrid";

export default function Projects() {
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

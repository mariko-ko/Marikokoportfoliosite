import { useState } from "react";
import { Hero } from "./components/Hero";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetail } from "./components/ProjectDetail";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Navigation } from "./components/Navigation";
import { motion } from "motion/react";
import { projects } from "./data/projects";
import { Project } from "./types/project";

export default function App() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  // hiddenフラグがtrueのプロジェクトを除外
  const visibleProjects = projects.filter(
    (project) => !project.hidden,
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedProject(null);
    // スクロール位置を作品セクションに戻す
    setTimeout(() => {
      const workSection = document.getElementById("work");
      if (workSection) {
        workSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="bg-gray-50">
      <Navigation />

      <Hero />

      {/* Work Section */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="mb-4">Selected Work</h2>
            <p className="text-gray-600 text-lg">
              Recent projects in UI/UX and visual design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-8 gap-y-20">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <About />

      <Contact />
    </div>
  );
}
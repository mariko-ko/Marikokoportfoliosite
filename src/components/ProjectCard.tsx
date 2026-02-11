import { motion } from 'motion/react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] mb-6 rounded-lg">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm tracking-wider text-gray-500 uppercase">{project.category}</p>
        <h3 className="text-xl md:text-2xl">{project.title}</h3>
        <p className="text-gray-600">
          {typeof project.description === 'string' 
            ? project.description 
            : `${project.description.length}つの段階で構成されています`
          }
        </p>
      </div>
    </motion.div>
  );
}
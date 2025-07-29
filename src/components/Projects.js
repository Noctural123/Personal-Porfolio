import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { 
  SiReact, SiTypescript, SiJavascript, SiNodedotjs,
  SiPostgresql, SiMongodb, SiExpress, SiHtml5, SiCss3,
  SiOpenai, SiAmazonaws, SiPrisma
} from 'react-icons/si';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "LeetCode AI Tracker Extension",
      description: "Full-stack productivity tool with AI code feedback and user-specific recommendations. Built a Chrome extension and interactive dashboard to track LeetCode progress, insights, and personalized notes.",
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "Prisma", "AWS"],
      icons: [SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiOpenai, SiPrisma, SiAmazonaws],
      github: "https://github.com/Noctural123/leetcode-ai-tracker",
      demo: "#",
      date: "May 2025 - Present",
      featured: true
    },
    {
      title: "Business Finance Dashboard",
      description: "Developed a financial analytics dashboard using the MERN stack to visualize complex datasets and trendlines. Implemented a simple regression model to predict yearly revenue.",
      tech: ["TypeScript", "MongoDB", "Express", "React", "Node.js"],
      icons: [SiTypescript, SiMongodb, SiExpress, SiReact, SiNodedotjs],
      github: "https://github.com/Noctural123/finance-dashboard",
      demo: "#",
      date: "December 2024 - March 2025",
      featured: true
    },
    {
      title: "OU Class Finder",
      description: "Created a static web application to map curriculum paths and dynamically render degree requirements. Implemented a responsive UI with modular components and interactive navigation.",
      tech: ["JavaScript", "HTML5", "CSS3"],
      icons: [SiJavascript, SiHtml5, SiCss3],
      github: "https://github.com/Noctural123/ou-class-finder",
      demo: "#",
      date: "April 2023",
      featured: false
    }
  ];

  const getTechIcon = (techName) => {
    const iconMap = {
      'React': SiReact,
      'TypeScript': SiTypescript,
      'JavaScript': SiJavascript,
      'Node.js': SiNodedotjs,
      'PostgreSQL': SiPostgresql,
      'MongoDB': SiMongodb,
      'Express': SiExpress,
      'HTML5': SiHtml5,
      'CSS3': SiCss3,
      'OpenAI API': SiOpenai,
      'AWS': SiAmazonaws,
      'Prisma': SiPrisma
    };
    return iconMap[techName] || null;
  };

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                project.featured ? 'ring-2' : ''
              }`}
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-color)',
                ...(project.featured && { borderColor: 'var(--accent-primary)' })
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs rounded-full" style={{ 
                      backgroundColor: 'var(--accent-primary)', 
                      color: 'white',
                      opacity: 0.2
                    }}>
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar size={14} />
                  <span>{project.date}</span>
                </div>

                {/* Tech stack */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => {
                      const IconComponent = getTechIcon(tech);
                      return (
                        <span
                          key={tech}
                          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs border"
                          style={{ 
                            backgroundColor: 'var(--bg-primary)', 
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {IconComponent && <IconComponent size={12} style={{ color: 'var(--accent-primary)' }} />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Project links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                      style={{ 
                        backgroundColor: 'var(--accent-primary)', 
                        color: 'white' 
                      }}
                    >
                      <Github size={16} />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300"
                      style={{ 
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Want to see more of my work?
          </p>
          <motion.a
            href="https://github.com/Noctural123"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            <Github size={18} />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
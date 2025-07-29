import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: "Software Development Intern",
      company: "Paycom",
      location: "Oklahoma City, OK",
      period: "May 2024 - Present",
      description: "Collaborated closely with PM, UX, and QA teams to expand and maintain internal tools and systems.",
      achievements: [
        "Designed, created, and tested full-stack web applications using PHP, JavaScript, TypeScript, and MySQL",
        "Improved scalability and abstraction by developing components in React",
        "Enhanced logging granularity, increasing actionable error coverage by 40%",
        "Built an internal proxy service to reveal black-box vendor behavior and streamline background check workflows"
      ],
      tech: ["PHP", "JavaScript", "TypeScript", "MySQL", "React"]
    },
    {
      title: "Software Engineering Intern",
      company: "Tinker Air Force Base (DoD)",
      location: "Oklahoma City, OK",
      period: "May 2023 - November 2023",
      description: "Collaborated with PM, UX designers, back-end developers, and security teams to support DoD software systems.",
      achievements: [
        "Resolved UI bugs and implemented feature fixes, reducing internal bug reports by about 30%",
        "Wrote unit tests using JUnit and participated in peer reviews for secure, maintainable code",
        "Contributed to security compliance efforts aligned with STIGs and RMF, supporting successful audit readiness"
      ],
      tech: ["Java", "JUnit", "UI/UX", "Security Compliance"]
    },
    {
      title: "Undergraduate Researcher",
      company: "University of Oklahoma",
      location: "Norman, OK",
      period: "August 2023 - January 2024",
      description: "Collaborated multiple times a week with an engineering professor and mentor to conduct an SLR paper.",
      achievements: [
        "Analyzed research articles to explore the use of AI/ML in Racing Games",
        "Presented research at the American Society for Engineering Education (ASEE) conference"
      ],
      tech: ["Research", "AI/ML", "Academic Writing", "Data Analysis"]
    }
  ];

  return (
    <section id="experience" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title text-center"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 transform md:-translate-x-1/2 z-10 ${
                  index % 2 === 0 ? 'md:translate-x-2' : 'md:-translate-x-6'
                }`} style={{ 
                  backgroundColor: 'var(--accent-primary)', 
                  borderColor: 'var(--bg-primary)' 
                }}></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg border transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      borderColor: 'var(--border-color)' 
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--accent-primary)' }}>
                          <Building size={16} />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full" style={{ 
                        backgroundColor: 'var(--accent-primary)', 
                        color: 'white',
                        opacity: 0.2
                      }}>
                        {exp.period.split(' - ')[1] === 'Present' ? 'Current' : 'Past'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {exp.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--accent-primary)' }} className="mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs border"
                            style={{ 
                              backgroundColor: 'var(--bg-primary)', 
                              borderColor: 'var(--border-color)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold mb-8 gradient-text text-center">
            Leadership & Activities
          </h3>
          
          <div className="p-6 rounded-lg border" style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderColor: 'var(--border-color)' 
          }}>
            <div className="flex items-start gap-4">
              <div style={{ color: 'var(--accent-primary)' }}>
                <Building size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Vietnamese Eucharistic Youth Movement
                </h4>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Youth Leader, Lion Dancer • August 2014 - Current</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Cultivating faith, leadership, and responsibility among +60 children through religious and cultural education. 
                  Fundraising for the church through lion dancing every Lunar New Year.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 
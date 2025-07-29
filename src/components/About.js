import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      degree: "M.S. in Computer Science",
      school: "University of Oklahoma",
      location: "Norman, OK",
      gpa: "4.0",
      graduation: "Fall 2026",
      type: "Accelerated with B.S."
    },
    {
      degree: "B.S. in Computer Science & B.A. in Mathematics",
      school: "University of Oklahoma",
      location: "Norman, OK",
      gpa: "3.76",
      graduation: "Fall 2025",
      type: "Dual Degree"
    }
  ];

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title text-center"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 gradient-text">
              Software Engineer & Problem Solver
            </h3>
            
            <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I'm a passionate software engineer with a strong foundation in computer science and mathematics. 
                Currently pursuing my Master's degree at the University of Oklahoma, I combine theoretical knowledge 
                with practical experience to create innovative solutions.
              </p>
              
              <p>
                With experience at companies like Paycom and Tinker Air Force Base, I've developed expertise in 
                full-stack development, working with technologies like React, TypeScript, PHP, and various databases. 
                I'm particularly interested in AI/ML applications and building scalable, user-centric applications.
              </p>
              
              <p>
                When I'm not coding, I lead youth groups at the Vietnamese Eucharistic Youth Movement, where I 
                cultivate leadership skills and cultural education among children. I also enjoy lion dancing during 
                Lunar New Year celebrations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6 gradient-text">
              Education
            </h3>
            
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-lg border transition-colors duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)' 
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <GraduationCap className="mt-1" size={20} style={{ color: 'var(--accent-primary)' }} />
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{edu.type}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} style={{ color: 'var(--text-secondary)' }} />
                    <span>{edu.school}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} style={{ color: 'var(--text-secondary)' }} />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} style={{ color: 'var(--text-secondary)' }} />
                    <span>GPA: {edu.gpa} • Graduation: {edu.graduation}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 
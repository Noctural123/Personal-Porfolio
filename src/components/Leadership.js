import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Heart, Globe } from 'lucide-react';

const Leadership = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const leadershipData = [
    {
      title: "Vietnamese Eucharistic Youth Movement",
      role: "Youth Leader & Mentor",
      period: "2019 - Present",
      description: "Lead youth development programs, organize community events, and mentor young members in personal and spiritual growth. Coordinate volunteer activities and foster leadership skills among participants.",
      icon: Users,
      color: "#667eea"
    },
    {
      title: "University of Oklahoma",
      role: "Student Organization Leader",
      period: "2020 - 2022",
      description: "Led various student organizations, organized campus events, and represented student interests. Coordinated with faculty and administration to improve student experience.",
      icon: Award,
      color: "#764ba2"
    },
    {
      title: "Community Service",
      role: "Volunteer Coordinator",
      period: "2018 - Present",
      description: "Organize and participate in community service projects, food drives, and local charity events. Coordinate volunteer efforts and build partnerships with local organizations.",
      icon: Heart,
      color: "#f093fb"
    },
    {
      title: "International Outreach",
      role: "Cultural Ambassador",
      period: "2021 - Present",
      description: "Promote cultural understanding and international collaboration through various programs and events. Facilitate cross-cultural communication and organize international student support initiatives.",
      icon: Globe,
      color: "#667eea"
    }
  ];

  return (
    <section id="leadership" className="section relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0" style={{ 
        background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))' 
      }}></div>
      
      <div className="container relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title"
        >
          Leadership & Volunteering
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leadershipData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              className="group relative"
            >
              <div className="p-8 rounded-2xl border transition-all duration-500 h-full" style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-color)',
                backdropFilter: 'blur(20px)'
              }}>
                <div className="flex items-start space-x-6">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div 
                      className="p-4 rounded-2xl text-3xl"
                      style={{ 
                        backgroundColor: `${item.color}20`,
                        color: item.color
                      }}
                    >
                      <item.icon size={32} />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all duration-300" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-lg font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>
                      {item.role}
                    </p>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {item.period}
                    </p>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional volunteering highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-10 gradient-text text-center">
            Additional Community Involvement
          </h3>
          
          <div className="p-8 rounded-2xl border" style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderColor: 'var(--border-color)',
            backdropFilter: 'blur(20px)'
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Food Bank Volunteering",
                "Youth Mentorship Programs", 
                "Campus Event Organization",
                "Cultural Festival Planning",
                "Student Government",
                "Community Clean-up Initiatives"
              ].map((activity, index) => (
                <motion.div
                  key={activity}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-6 py-4 rounded-xl text-center border transition-all duration-300"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <span className="font-medium">{activity}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership; 
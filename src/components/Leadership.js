import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Heart, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const Leadership = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVEYMIndex, setCurrentVEYMIndex] = useState(0);
  
  const lionDanceImages = [
    '/Lion Dance/LionDance1.jpeg',
    '/Lion Dance/LionDance2.jpeg',
    '/Lion Dance/LionDance3.jpeg',
    '/Lion Dance/LionDance4.png',
    '/Lion Dance/LionDance5.png'
  ];

  const veymImages = [
    '/VEYM/VEYM1.png',
    '/VEYM/VEYM2.png',
    '/VEYM/VEYM3.png',
    '/VEYM/VEYM4.png',
    '/VEYM/VEYM5.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === lionDanceImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Changed from 3000 to 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVEYMIndex((prevIndex) => 
        prevIndex === veymImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? lionDanceImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === lionDanceImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToVEYMPrevious = () => {
    setCurrentVEYMIndex((prevIndex) => 
      prevIndex === 0 ? veymImages.length - 1 : prevIndex - 1
    );
  };

  const goToVEYMNext = () => {
    setCurrentVEYMIndex((prevIndex) => 
      prevIndex === veymImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const leadershipData = [
    {
      title: "Vietnamese Eucharistic Youth Movement",
      role: "Youth Leader",
      period: "Aug 2014 - Current",
      description: "Cultivating faith, leadership, and responsibility among +60 children through religious and cultural education in a community of 300+ people. Coordinate lessons, activities, games, events, and camps for the youth.",
      icon: Users,
      color: "#667eea"
    },
    {
      title: "Lion Dancing",
      role: "Volunteering",
      period: "Aug 2014 - Current",
      description: "Perform lion dancing during Lunar New Year to raise funds for the church, while participating in off-season gigs throughout the year. Train younger children in lion dancing and cultural appreciation. Devote 200+ hours annually to practice, performances, and teaching.",
      icon: Award,
      color: "#764ba2"
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

        <div className="space-y-12">
          {leadershipData.map((item, index) => (
            <motion.div 
              key={item.title} 
              className="flex flex-col lg:flex-row gap-8 items-start"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Description Card - Left Side (30%) */}
              <motion.div
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                className="group relative lg:w-[30%] w-full"
              >
                <div className="p-6 rounded-2xl border transition-all duration-500 h-full" style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)',
                  backdropFilter: 'blur(20px)'
                }}>
                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-lg font-semibold mb-1" style={{ color: 'var(--accent-primary)' }}>
                    {item.role}
                  </p>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {item.period}
                  </p>
                  <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* Image Card - Right Side (70%) */}
              <motion.div
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                className="group relative lg:w-[70%] w-full"
              >
                <div className="p-4 rounded-2xl border transition-all duration-500" style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)',
                  backdropFilter: 'blur(20px)'
                }}>
                  {item.title === "Vietnamese Eucharistic Youth Movement" && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl overflow-hidden border relative h-[500px] flex items-center justify-center"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <motion.img 
                        key={currentVEYMIndex}
                        src={veymImages[currentVEYMIndex]} 
                        alt="Vietnamese Eucharistic Youth Movement" 
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={goToVEYMPrevious}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      
                      <button
                        onClick={goToVEYMNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {veymImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentVEYMIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentVEYMIndex 
                                ? 'bg-white' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {item.title === "Lion Dancing" && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl overflow-hidden border relative h-[500px] flex items-center justify-center"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <motion.img 
                        key={currentImageIndex}
                        src={lionDanceImages[currentImageIndex]} 
                        alt="Lion Dancing" 
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      
                      <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {lionDanceImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership; 
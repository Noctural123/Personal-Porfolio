import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Leadership = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVEYMIndex, setCurrentVEYMIndex] = useState(0);
  const [expandedImages, setExpandedImages] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(0);

  // Image arrays
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

  // Auto-advance timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === lionDanceImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [lionDanceImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVEYMIndex((prevIndex) => 
        prevIndex === veymImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [veymImages.length]);

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

  const expandImages = (images, startIndex = 0) => {
    setExpandedImages(images);
    setExpandedIndex(startIndex);
  };

  const closeExpanded = () => {
    setExpandedImages(null);
  };

  const goToExpandedPrevious = () => {
    setExpandedIndex((prevIndex) => 
      prevIndex === 0 ? expandedImages.length - 1 : prevIndex - 1
    );
  };

  const goToExpandedNext = () => {
    setExpandedIndex((prevIndex) => 
      prevIndex === expandedImages.length - 1 ? 0 : prevIndex + 1
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
                <div className="p-6 rounded-3xl border-2 h-full"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-color)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-80 rounded-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-2xl bg-purple-900/30 border border-purple-500/40">
                        <item.icon size={24} style={{ color: 'var(--accent-primary)' }} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {item.role}
                    </p>
                    <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {item.period}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Image Gallery - Right Side (70%) */}
              <motion.div
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                className="lg:w-[70%] w-full"
              >
                <div className="relative h-[400px] rounded-3xl border-2 overflow-hidden cursor-pointer group"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-color)',
                    backdropFilter: 'blur(20px)'
                  }}
                  onClick={() => expandImages(
                    item.title === "Lion Dancing" ? lionDanceImages : veymImages,
                    item.title === "Lion Dancing" ? currentImageIndex : currentVEYMIndex
                  )}
                >
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-80"></div>
                  
                  {/* Image */}
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={item.title === "Lion Dancing" ? currentImageIndex : currentVEYMIndex}
                      src={item.title === "Lion Dancing" ? lionDanceImages[currentImageIndex] : veymImages[currentVEYMIndex]} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  
                  {/* Expand overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium">
                      Click to expand
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.title === "Lion Dancing") {
                        goToPrevious();
                      } else {
                        goToVEYMPrevious();
                      }
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.title === "Lion Dancing") {
                        goToNext();
                      } else {
                        goToVEYMNext();
                      }
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {(item.title === "Lion Dancing" ? lionDanceImages : veymImages).slice(0, 5).map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.title === "Lion Dancing") {
                            setCurrentImageIndex(index);
                          } else {
                            setCurrentVEYMIndex(index);
                          }
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === (item.title === "Lion Dancing" ? currentImageIndex : currentVEYMIndex)
                            ? 'bg-white' 
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Image Modal */}
      <AnimatePresence>
        {expandedImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeExpanded}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={expandedIndex}
                  src={expandedImages[expandedIndex]}
                  alt="Expanded view"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
              
              {/* Close button */}
              <button
                onClick={closeExpanded}
                className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Close expanded view"
              >
                <X size={24} />
              </button>
              
              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToExpandedPrevious();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToExpandedNext();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {expandedIndex + 1} / {expandedImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Leadership; 
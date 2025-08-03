import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plane, Car, Tv, Dumbbell, Gamepad2, ChevronLeft, ChevronRight, X, Star, Heart } from 'lucide-react';

const Personal = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const hobbiesContainerRef = React.useRef(null);
  const [currentTravelIndex, setCurrentTravelIndex] = useState(0);
  const [currentF1Index, setCurrentF1Index] = useState(0);
  const [currentTVIndex, setCurrentTVIndex] = useState(0);
  const [currentGymIndex, setCurrentGymIndex] = useState(0);
  const [currentGamesIndex, setCurrentGamesIndex] = useState(0);
  const [expandedImages, setExpandedImages] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [currentHobbyIndex, setCurrentHobbyIndex] = useState(0);

  // Image arrays
  const travelImages = [
    '/Travel/Travel1.jpeg',
    '/Travel/Travel2.jpeg',
    '/Travel/Travel3.jpeg',
    '/Travel/Travel4.jpeg',
    '/Travel/Travel5.jpeg',
    '/Travel/Travel6.jpeg',
    '/Travel/Travel7.jpeg',
    '/Travel/Travel8.jpeg',
    '/Travel/Travel9.jpeg',
    '/Travel/Travel10.jpeg',
    '/Travel/Travel11.jpeg'
  ];

  const f1Images = [
    '/Formula1/F1.jpeg',
    '/Formula1/F2.png',
    '/Formula1/F3.png',
    '/Formula1/F4.png',
    '/Formula1/F5.jpeg'
  ];

  const tvImages = [
    '/TV/TV1.png',
    '/TV/TV2.png',
    '/TV/TV3.png',
    '/TV/TV4.png',
    '/TV/TV5.png',
    '/TV/TV6.png'
  ];

  const gymImages = [
    '/Gym/Gym1.png',
    '/Gym/Gym2.png',
    '/Gym/Gym3.png',
    '/Gym/Gym4.png'
  ];

  const gamesImages = [
    '/Games/Games1.png',
    '/Games/Games2.png',
    '/Games/Games3.png',
    '/Games/Games4.png'
  ];

  // Auto-advance timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTravelIndex((prevIndex) => 
        prevIndex === travelImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [travelImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentF1Index((prevIndex) => 
        prevIndex === f1Images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [f1Images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTVIndex((prevIndex) => 
        prevIndex === tvImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [tvImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGymIndex((prevIndex) => 
        prevIndex === gymImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [gymImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGamesIndex((prevIndex) => 
        prevIndex === gamesImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [gamesImages.length]);

  const goToTravelPrevious = () => {
    setCurrentTravelIndex((prevIndex) => 
      prevIndex === 0 ? travelImages.length - 1 : prevIndex - 1
    );
  };

  const goToTravelNext = () => {
    setCurrentTravelIndex((prevIndex) => 
      prevIndex === travelImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToF1Previous = () => {
    setCurrentF1Index((prevIndex) => 
      prevIndex === 0 ? f1Images.length - 1 : prevIndex - 1
    );
  };

  const goToF1Next = () => {
    setCurrentF1Index((prevIndex) => 
      prevIndex === f1Images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToTVPrevious = () => {
    setCurrentTVIndex((prevIndex) => 
      prevIndex === 0 ? tvImages.length - 1 : prevIndex - 1
    );
  };

  const goToTVNext = () => {
    setCurrentTVIndex((prevIndex) => 
      prevIndex === tvImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToGymPrevious = () => {
    setCurrentGymIndex((prevIndex) => 
      prevIndex === 0 ? gymImages.length - 1 : prevIndex - 1
    );
  };

  const goToGymNext = () => {
    setCurrentGymIndex((prevIndex) => 
      prevIndex === gymImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToGamesPrevious = () => {
    setCurrentGamesIndex((prevIndex) => 
      prevIndex === 0 ? gamesImages.length - 1 : prevIndex - 1
    );
  };

  const goToGamesNext = () => {
    setCurrentGamesIndex((prevIndex) => 
      prevIndex === gamesImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToHobbyPrevious = () => {
    setCurrentHobbyIndex((prevIndex) => 
      prevIndex === 0 ? hobbies.length - 1 : prevIndex - 1
    );
  };

  const goToHobbyNext = () => {
    setCurrentHobbyIndex((prevIndex) => 
      prevIndex === hobbies.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Scroll to current hobby when index changes
  useEffect(() => {
    if (hobbiesContainerRef.current) {
      const container = hobbiesContainerRef.current;
      const hobbyWidth = 420 + 24; // card width + gap
      const scrollPosition = currentHobbyIndex * hobbyWidth;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentHobbyIndex]);

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

  const hobbies = [
    {
      title: "Traveling",
      subtitle: "Adventure, Exploration",
      description: "Over the past year or two I've really gotten into traveling and exploring new places. I've been to a lot of new places that I've loved including New York, Florida, and Portland. Some upcoming trips I'm planning to include is Yellowstone national park, and somewhere outside of the US.",
      icon: Plane
    },
    {
      title: "Formula 1",
      subtitle: "Motorsports, Racing",
      description: "I got into Formula 1 in 2023 and have been a fan ever since. I've yet to go to a race yet unfortunately but am planning on going in the very near future. My favorite drivers are Max Verstappen and Oscar Piastri. (Oscar Piastri for 2025 WDC).",
      icon: Car
    },
    {
      title: "Movies and Shows",
      subtitle: "Entertainment, Relaxation",
      description: "I'm a big fan of movies and shows. Some of my favorites are Interstellar, The Martian, HunterxHunter, Naruto, and many more! Right now, I'm currently watching One Piece and enjoying it a lot, though it's a bit long.",
      icon: Tv
    },
    {
      title: "Gym & Fitness",
      subtitle: "Health, Strength",
      description: "I love going to the gym and staying active during my free time. It's a great way to stay healthy and build strength while maintaining a balanced lifestyle. Right now, my bench max is 255 lbs and my current goal is being able to achieve a clean muscle-up.",
      icon: Dumbbell
    },
    {
      title: "Video Games",
      subtitle: "Gaming, Strategy",
      description: "Some of my favorite video games right now are Elden Ring, League of Legends, Teamfight Tactics, and Valorant. Though I don't have much time to play games, I still play them whenever I can.",
      icon: Gamepad2
    }
  ];

  return (
    <section id="personal" className="section relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0" style={{ 
        background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))' 
      }}></div>
      
      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Personal Hobbies</h2>
          <p className="text-lg mt-4" style={{ color: 'var(--text-secondary)' }}>
            Outside of my technical background, here are some of my current hobbies...
          </p>
        </motion.div>

        {/* Horizontal sliding panels */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={goToHobbyPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous hobby"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToHobbyNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next hobby"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide px-4" ref={hobbiesContainerRef}>
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex-shrink-0 w-[420px] h-[550px] rounded-3xl border-2 overflow-hidden relative group"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-80"></div>
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-2xl bg-purple-900/30 border border-purple-500/40">
                        <hobby.icon size={24} style={{ color: 'var(--accent-primary)' }} />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-1 text-white">
                        {hobby.title}
                      </h3>
                      <h4 className="text-sm font-medium mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {hobby.subtitle}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {hobby.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Image placeholder area */}
                  {hobby.title === "Traveling" ? (
                    <div className="w-full h-64 rounded-2xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center relative overflow-hidden cursor-pointer group"
                      onClick={() => expandImages(travelImages, currentTravelIndex)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={currentTravelIndex}
                          src={travelImages[currentTravelIndex]} 
                          alt="Travel" 
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
                          goToTravelPrevious();
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToTravelNext();
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {travelImages.slice(0, 5).map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentTravelIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentTravelIndex 
                                ? 'bg-white' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : hobby.title === "Formula 1" ? (
                    <div className="w-full h-64 rounded-2xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center relative overflow-hidden cursor-pointer group"
                      onClick={() => expandImages(f1Images, currentF1Index)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={currentF1Index}
                          src={f1Images[currentF1Index]} 
                          alt="Formula 1" 
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
                          goToF1Previous();
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToF1Next();
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {f1Images.slice(0, 5).map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentF1Index(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentF1Index 
                                ? 'bg-white' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : hobby.title === "Movies and Shows" ? (
                    <div className="w-full h-64 rounded-2xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center relative overflow-hidden cursor-pointer group"
                      onClick={() => expandImages(tvImages, currentTVIndex)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={currentTVIndex}
                          src={tvImages[currentTVIndex]} 
                          alt="TV Shows" 
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
                          goToTVPrevious();
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToTVNext();
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {tvImages.slice(0, 5).map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentTVIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentTVIndex 
                                ? 'bg-white' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : hobby.title === "Gym & Fitness" ? (
                    <div className="w-full h-64 rounded-2xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center relative overflow-hidden cursor-pointer group"
                      onClick={() => expandImages(gymImages, currentGymIndex)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={currentGymIndex}
                          src={gymImages[currentGymIndex]} 
                          alt="Gym" 
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
                          goToGymPrevious();
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToGymNext();
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {gymImages.slice(0, 5).map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentGymIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentGymIndex 
                                ? 'bg-white' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : hobby.title === "Video Games" ? (
                    <div className="w-full h-64 rounded-2xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center relative overflow-hidden cursor-pointer group"
                      onClick={() => expandImages(gamesImages, currentGamesIndex)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={currentGamesIndex}
                          src={gamesImages[currentGamesIndex]} 
                          alt="Video Games" 
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
                          goToGamesPrevious();
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToGamesNext();
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {gamesImages.slice(0, 5).map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentGamesIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentGamesIndex 
                                ? 'bg-white' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-30">
                  <Star size={16} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <div className="absolute bottom-4 left-4 opacity-30">
                  <Heart size={16} style={{ color: 'var(--accent-primary)' }} />
                </div>
              </motion.div>
            ))}
          </div>
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

export default Personal; 
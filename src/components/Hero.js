import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, MapPin, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const typewriterRef = useRef({
    currentRoleIndex: 0,
    charIndex: 0,
    isDeleting: false,
    timeoutId: null
  });

  const roles = [
    "Software Engineer",
    "Full-Stack Developer",
    "Formula 1 Fan",
    "Lion Dancer",
    "Creative Problem Solver",
    "Learner",
  ];

  // Simple typewriter effect
  useEffect(() => {
    let currentRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId = null;
    
    const typeWriter = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (!isDeleting && charIndex < currentRole.length) {
        // Typing
        setCurrentText(currentRole.slice(0, charIndex + 1));
        setIsTyping(true);
        charIndex++;
        timeoutId = setTimeout(typeWriter, 120);
      } else if (!isDeleting && charIndex >= currentRole.length) {
        // Finished typing, wait then start deleting
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          isDeleting = true;
          typeWriter();
        }, 3000);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setCurrentText(currentRole.slice(0, charIndex - 1));
        setIsTyping(true);
        charIndex--;
        timeoutId = setTimeout(typeWriter, 80);
      } else if (isDeleting && charIndex <= 0) {
        // Finished deleting, move to next role
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        charIndex = 0;
        setCurrentText('');
        setIsTyping(false);
        timeoutId = setTimeout(typeWriter, 1000);
      }
    };
    
    // Start the typewriter
    timeoutId = setTimeout(typeWriter, 1000);
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); // Empty dependency array - only run once

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 120 }, (_, index) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.6 + 0.2,
      orbitAngle: (index / 120) * 2 * Math.PI // Updated to match new particle count
    }));
    setParticles(initialParticles);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get the particle container's position
      const container = document.querySelector('#home');
      const rect = container ? container.getBoundingClientRect() : { left: 0, top: 0 };
      
      // Calculate mouse position relative to the container
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      mousePositionRef.current = { x: relativeX, y: relativeY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Calculate distance from mouse
          const dx = mousePositionRef.current.x - particle.x;
          const dy = mousePositionRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let newVx = particle.vx;
          let newVy = particle.vy;
          
          // Simple orbiting system
          const orbitRange = 120; // Distance at which particles start orbiting
          const orbitRadius = 50; // Distance from cursor to maintain
          
          if (distance < orbitRange && distance > 0) {
            // Particle is in orbit range - make it orbit around cursor
            
            // Calculate angle from cursor to particle
            const angle = Math.atan2(dy, dx);
            
            // Calculate perpendicular direction for orbit (clockwise)
            const orbitX = Math.cos(angle + Math.PI/2);
            const orbitY = Math.sin(angle + Math.PI/2);
            
            // Add orbital velocity
            const orbitSpeed = 2.0;
            newVx += orbitX * orbitSpeed;
            newVy += orbitY * orbitSpeed;
            
            // Keep particles at the right distance from cursor
            if (distance > orbitRadius + 5) {
              // Pull inward
              newVx += (dx / distance) * 0.5;
              newVy += (dy / distance) * 0.5;
            } else if (distance < orbitRadius - 5) {
              // Push outward
              newVx -= (dx / distance) * 0.5;
              newVy -= (dy / distance) * 0.5;
            }
          } else {
            // Normal random movement when not near cursor
            newVx += (Math.random() - 0.5) * 0.1;
            newVy += (Math.random() - 0.5) * 0.1;
          }
          
          // Update position
          let newX = particle.x + newVx;
          let newY = particle.y + newVy;
          
          // Bounce off edges
          if (newX < 0 || newX > window.innerWidth) {
            newVx *= -0.8;
            newX = newX < 0 ? 0 : window.innerWidth;
          }
          if (newY < 0 || newY > window.innerHeight) {
            newVy *= -0.8;
            newY = newY < 0 ? 0 : window.innerHeight;
          }
          
          // Apply friction
          newVx *= 0.98;
          newVy *= 0.98;
          
          // Limit maximum speed
          const maxSpeed = 4.0;
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > maxSpeed) {
            newVx = (newVx / speed) * maxSpeed;
            newVy = (newVy / speed) * maxSpeed;
          }
          
          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 20); // Increased frequency for smoother animation
    return () => clearInterval(interval);
  }, []); // Removed mousePosition dependency

  return (
    <section id="home" className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Interactive particle background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: 'var(--accent-primary)',
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1
            }}
          />
        ))}
        
        {/* Connection lines between nearby particles */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {particles.map((particle1, i) =>
            particles.slice(i + 1).map((particle2, j) => {
              const dx = particle1.x - particle2.x;
              const dy = particle1.y - particle2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                const opacity = (100 - distance) / 100 * 0.3;
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={particle1.x}
                    y1={particle1.y}
                    x2={particle2.x}
                    y2={particle2.y}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    opacity={opacity}
                  />
                );
              }
              return null;
            })
          )}
        </svg>
      </div>

      <div className="min-h-screen flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column */}
            <div className="space-y-4">
              <motion.h1 
                className="text-6xl lg:text-7xl font-bold"
                style={{ color: 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                An Nguyen
              </motion.h1>
              
              {/* Animated role text */}
              <motion.div
                className="h-12 flex flex-col items-start pb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.h2
                  className="text-2xl lg:text-3xl font-semibold"
                  style={{ color: 'var(--accent-primary)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Hi, I'm a...
                </motion.h2>
                
                <motion.h3
                  className="text-xl lg:text-2xl font-medium mt-2 flex items-center italic"
                  style={{ color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {currentText}
                  {isTyping && (
                    <motion.span
                      className="ml-1"
                      style={{ color: 'var(--accent-primary)' }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  )}
                </motion.h3>
              </motion.div>
              
              {/* Spacer */}
              <div className="h-8"></div>
              
              <motion.p 
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I'm a developer with 3 years of internship experience, always learning and growing, one step at a time.
              </motion.p>
              
              <div className="flex space-x-4">
                <motion.a
                  href="/An Nguyen Resume.pdf"
                  download
                  className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2"
                  style={{ 
                    backgroundColor: 'var(--accent-primary)', 
                    color: 'white' 
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  <span>Download CV</span>
                </motion.a>
                
                <motion.a
                  href="#projects"
                  className="px-6 py-3 font-semibold rounded-lg border transition-all duration-300 flex items-center space-x-2"
                  style={{ 
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Projects</span>
                  <ArrowRight size={20} />
                </motion.a>
              </div>
              
              <div className="flex space-x-4">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/Noctural123",
                    label: "GitHub"
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/in/annguyen123",
                    label: "LinkedIn"
                  },
                  {
                    icon: Mail,
                    href: "mailto:hongan.nguyen04@gmail.com",
                    label: "Email"
                  }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      color: 'var(--text-primary)' 
                    }}
                    whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex justify-center lg:justify-end">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Floating elements around profile */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 rounded-full"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full"
                  style={{ backgroundColor: 'var(--accent-secondary)' }}
                  animate={{
                    scale: [1.2, 1, 1.2],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div 
                  className="w-[500px] h-[500px] rounded-full overflow-hidden shadow-2xl border-4 relative"
                  style={{ borderColor: 'var(--accent-primary)' }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.img 
                    src="/Me.jpeg" 
                    alt="An Nguyen" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      background: `radial-gradient(circle, ${isHovered ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}, transparent)` 
                    }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import Personal from './components/Personal';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="loading-content"
        >
          <div className="loading-spinner"></div>
          <h2>An Nguyen</h2>
          <p>Software Engineer</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <div className="h-px bg-gray-700 opacity-30"></div>
        <About />
        <div className="h-px bg-gray-700 opacity-30"></div>
        <Projects />
        <div className="h-px bg-gray-700 opacity-30"></div>
        <Experience />
        <div className="h-px bg-gray-700 opacity-30"></div>
        <Leadership />
        <div className="h-px bg-gray-700 opacity-30"></div>
        <Personal />
        <div className="h-px bg-gray-700 opacity-30"></div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App; 
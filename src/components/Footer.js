import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
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
  ];

  return (
    <footer className="border-t" style={{ 
      backgroundColor: 'var(--bg-secondary)', 
      borderColor: 'var(--border-color)' 
    }}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">
              An Nguyen
            </h3>
            <p className="max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Software Engineer passionate about building innovative solutions and creating impactful user experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  color: 'var(--text-primary)' 
                }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center space-x-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>An Nguyen • {currentYear}</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
# An Nguyen - Personal Portfolio

Hey there! 👋 This is my personal portfolio website where I showcase my work as a software engineer. I built this with React and Framer Motion to create smooth, engaging interactions that reflect my passion for modern web development.

## What's Inside

This portfolio features:
- **Interactive particle system** that orbits around your cursor (my favorite part!)
- Smooth animations powered by Framer Motion
- Responsive design that works on all devices
- Dark theme with purple/blue gradients
- Contact form that actually works

## Sections

- **Hero**: My intro with animated text and those cool orbiting particles
- **About**: My background and what drives me
- **Skills**: My technical expertise with interactive cards
- **Projects**: Some of my recent work with tech stacks
- **Experience**: My professional journey so far
- **Contact**: Get in touch with me

## Tech Stack

- React 18 with hooks
- Framer Motion for animations
- Lucide React for icons
- Custom CSS with gradients
- Responsive design

## Getting Started

1. Clone this repo
   ```bash
   git clone https://github.com/Noctural123/Personal-Porfolio.git
   cd Personal-Porfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the dev server
   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser

## Deployment

I deployed this on Netlify. You can do the same:

1. Build the project: `npm run build`
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

## Customizing for Your Portfolio

### Update Personal Info
- Change the name, email, and social links in the components
- Update the hero section with your own intro
- Replace the profile picture

### Add Your Projects
- Edit the Projects component with your own work
- Include screenshots and live links
- Update the tech stacks to match your projects

### Modify the Theme
The current theme uses purple/blue gradients. You can change the colors in `src/index.css`:

```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation
│   ├── Hero.js            # Hero with particles
│   ├── About.js           # About section
│   ├── Skills.js          # Skills cards
│   ├── Projects.js        # Project showcase
│   ├── Experience.js      # Work timeline
│   ├── Contact.js         # Contact form
│   └── Footer.js          # Footer
├── App.js                 # Main app
└── index.css              # Global styles
```

## The Particle System

One of my favorite features is the interactive particle system in the Hero section. The particles orbit around your cursor when you move it - it's a fun way to show off some JavaScript skills while keeping visitors engaged.

## Contact Me

- **Email**: hongan.nguyen04@gmail.com
- **GitHub**: [github.com/Noctural123](https://github.com/Noctural123)
- **LinkedIn**: [linkedin.com/in/annguyen123](https://linkedin.com/in/annguyen123)
- **Phone**: +1 (405) 501-1937

Feel free to reach out if you want to collaborate on something cool or just chat about tech!

---

Built with React and lots of coffee ☕

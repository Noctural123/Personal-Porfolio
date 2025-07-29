# An H. Nguyen - Portfolio

A modern, responsive portfolio website built with React, featuring smooth animations and a clean, minimalist design.

## 🚀 Features

- **Modern Design**: Clean, minimalist interface with gradient accents
- **Smooth Animations**: Powered by Framer Motion for engaging interactions
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: Hover effects, scroll animations, and smooth transitions
- **Contact Form**: Functional contact form with validation
- **Dark Theme**: Professional dark theme with purple/blue gradient accents

## 📋 Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Me**: Personal information and education details
3. **Skills**: Interactive skill cards with proficiency levels
4. **Projects**: Showcase of featured projects with tech stacks
5. **Experience**: Timeline of work experience and achievements
6. **Contact**: Contact form and contact information
7. **Footer**: Social links and copyright information

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Framer Motion**: Smooth animations and transitions
- **React Icons**: Beautiful icon library
- **Lucide React**: Additional modern icons
- **CSS3**: Custom styling with gradients and animations
- **HTML5**: Semantic markup

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the portfolio

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   ├── Hero.js            # Hero section
│   ├── About.js           # About section
│   ├── Skills.js          # Skills section
│   ├── Projects.js        # Projects section
│   ├── Experience.js      # Experience section
│   ├── Contact.js         # Contact section
│   └── Footer.js          # Footer component
├── App.js                 # Main app component
├── index.js               # React entry point
└── index.css              # Global styles
```

## 🎨 Customization

### Colors
The portfolio uses a purple/blue gradient theme. You can customize the colors in `src/index.css`:

```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Background colors */
background-color: #0a0a0a;  /* Dark background */
```

### Content
Update the content in each component file to match your information:

- **Personal Info**: Update name, email, phone, and social links
- **Projects**: Add your own projects with descriptions and tech stacks
- **Experience**: Update work history and achievements
- **Skills**: Modify skill levels and categories

### Styling
The portfolio uses custom CSS with utility classes. You can modify:

- Font sizes and weights
- Spacing and padding
- Animation durations
- Border radius and shadows

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects from Create React App (not recommended)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📞 Contact

- **Email**: hongan.nguyen04@gmail.com
- **GitHub**: [github.com/Noctural123](https://github.com/Noctural123)
- **LinkedIn**: [linkedin.com/in/annguyen123](https://linkedin.com/in/annguyen123)

---

Made with ❤️ by An H. Nguyen

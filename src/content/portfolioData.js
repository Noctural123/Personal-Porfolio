// All portfolio content in one place, lifted from the original section
// components (About/Experience/Projects/Personal/Leadership/Contact).
// Data only — no JSX. Asset paths are public-root relative; prefix with
// process.env.PUBLIC_URL (theme.js `asset()`) at render time.

export const SECTIONS = {
  about: { label: 'About', title: 'About Me' },
  hobbies: { label: 'Hobbies', title: 'Personal Hobbies' },
  projects: { label: 'Projects', title: 'Featured Projects' },
  experience: { label: 'Internships', title: 'Experience' },
  contact: { label: 'Contact', title: 'Say Hello' },
};

export const ABOUT_BULLETS = [
  { lead: 'Accelerated Master’s Student', rest: ' at OU with a strong foundation in computer science and mathematics' },
  { lead: '3 Years of Internship Experience', rest: ' at Paycom and the U.S. Department of Defense' },
  { lead: 'Full-Stack Development', rest: ' expertise: React, TypeScript, PHP, Java, Python, JavaScript, C#' },
  { lead: 'AI/ML', rest: ' enthusiast — passionate about building scalable, user-centric solutions' },
  { lead: 'Youth Leader', rest: ' at the Vietnamese Eucharistic Youth Movement' },
  { lead: 'Lion Dancer', rest: ' during Lunar New Year celebrations' },
];

export const EDUCATION = [
  {
    degree: 'M.S. in Computer Science',
    school: 'University of Oklahoma',
    location: 'Norman, OK',
    gpa: '4.0',
    graduation: 'Fall 2026',
    type: 'Accelerated with B.S.',
  },
  {
    degree: 'B.S. in Computer Science & B.A. in Mathematics',
    school: 'University of Oklahoma',
    location: 'Norman, OK',
    gpa: '3.76',
    graduation: 'Fall 2025',
    type: 'Dual Degree',
  },
];

export const LEADERSHIP = [
  {
    title: 'Vietnamese Eucharistic Youth Movement',
    role: 'Youth Leader',
    period: 'Aug 2014 - Current',
    description:
      'Cultivating faith, leadership, and responsibility among 60+ children through religious and cultural education in a community of 300+ people. Coordinate lessons, activities, games, events, and camps for the youth.',
    images: ['/VEYM/VEYM1.png', '/VEYM/VEYM2.png', '/VEYM/VEYM3.png', '/VEYM/VEYM4.png', '/VEYM/VEYM5.png'],
  },
  {
    title: 'Lion Dancing',
    role: 'Volunteering',
    period: 'Aug 2014 - Current',
    description:
      'Perform lion dancing during Lunar New Year to raise funds for the church, while participating in off-season gigs throughout the year. Train younger children in lion dancing and cultural appreciation. Devote 200+ hours annually to practice, performances, and teaching.',
    images: [
      '/Lion Dance/LionDance1.jpeg',
      '/Lion Dance/LionDance2.jpeg',
      '/Lion Dance/LionDance3.jpeg',
      '/Lion Dance/LionDance4.png',
      '/Lion Dance/LionDance5.png',
    ],
  },
];

export const HOBBIES = [
  {
    title: 'Traveling',
    subtitle: 'Adventure, Exploration',
    icon: 'Plane',
    description:
      "Over the past year or two I've really gotten into traveling and exploring new places. I've been to a lot of new places that I've loved including New York, Florida, and Portland. Some upcoming trips I'm planning to include is Yellowstone national park, and somewhere outside of the US.",
    images: [
      '/Travel/Travel1.jpeg', '/Travel/Travel2.jpeg', '/Travel/Travel3.jpeg', '/Travel/Travel4.jpeg',
      '/Travel/Travel5.jpeg', '/Travel/Travel6.jpeg', '/Travel/Travel7.jpeg', '/Travel/Travel8.jpeg',
      '/Travel/Travel9.jpeg', '/Travel/Travel10.jpeg', '/Travel/Travel11.jpeg',
    ],
  },
  {
    title: 'Formula 1',
    subtitle: 'Motorsports, Racing',
    icon: 'Car',
    description:
      "I got into Formula 1 in 2023 and have been a fan ever since. I've yet to go to a race yet unfortunately but am planning on going in the very near future. My favorite drivers are Max Verstappen and Oscar Piastri. (Hopefully Max can pull it back this year).",
    images: ['/Formula1/F1.jpeg', '/Formula1/F2.png', '/Formula1/F3.png', '/Formula1/F4.png', '/Formula1/F5.jpeg'],
  },
  {
    title: 'Movies and Shows',
    subtitle: 'Entertainment, Relaxation',
    icon: 'Tv',
    description:
      "I'm a big fan of movies and shows. Some of my favorites are Interstellar, The Martian, HunterxHunter, Naruto, and many more! Right now, I'm currently watching One Piece and enjoying it a lot, though it's a bit long.",
    images: ['/TV/TV1.png', '/TV/TV2.png', '/TV/TV3.png', '/TV/TV4.png', '/TV/TV5.png', '/TV/TV6.png'],
  },
  {
    title: 'Gym & Fitness',
    subtitle: 'Health, Strength',
    icon: 'Dumbbell',
    description:
      "I love going to the gym and staying active during my free time. It's a great way to stay healthy and build strength while maintaining a balanced lifestyle. Right now, my bench max is 255 lbs and my current goal is being able to achieve a clean muscle-up.",
    images: ['/Gym/Gym1.png', '/Gym/Gym2.png', '/Gym/Gym3.png', '/Gym/Gym4.png'],
  },
  {
    title: 'Games and Activities',
    subtitle: 'Gaming, Strategy',
    icon: 'Gamepad2',
    description:
      "Some of my favorite video games right now are Elden Ring, League of Legends, Teamfight Tactics, and Valorant. Though I don't have much time to play games, I still play them whenever I can.",
    images: ['/Games/Games1.png', '/Games/Games2.png', '/Games/Games3.png', '/Games/Games4.png'],
  },
];

export const PROJECTS = [
  {
    title: 'LeetCode AI Tracker Extension',
    description:
      'Full-stack productivity tool with user-specific recommendations. Built a Chrome extension and interactive dashboard to track LeetCode progress, insights, and personalized notes. Includes a lightweight recommendation engine to suggest tailored LeetCode problems based on user performance.',
    tech: ['Python', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Prisma', 'AWS'],
    github: 'https://github.com/Noctural123/leetcode-ai-tracker',
    date: 'October 2025 - Present',
    image: null,
    imageLink: null,
    live: null,
    featured: true,
  },
  {
    title: 'Business Finance Dashboard',
    description:
      'Developed a financial analytics dashboard using the MERN stack to visualize complex datasets and trendlines. Implemented a simple regression model to predict yearly revenue.',
    tech: ['React', 'TypeScript', 'MongoDB', 'Express', 'Node.js'],
    github: 'https://github.com/Noctural123/finance-dashboard',
    date: 'December 2024 - March 2025',
    image: '/Projects/finscope.png',
    imageLink: 'https://finance-dashboard-7k1r.vercel.app/',
    live: 'https://finance-dashboard-7k1r.vercel.app/',
    featured: true,
  },
  {
    title: 'OU Class Finder',
    description:
      'Created a Star Wars themed static web application to map curriculum paths and dynamically render degree requirements. Implemented a responsive UI with modular components and interactive navigation.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/Noctural123/Hacklahoma-2023-Class-Finder',
    date: 'April 2023',
    image: '/Projects/classfinder.png',
    imageLink: 'https://github.com/Noctural123/Hacklahoma-2023-Class-Finder',
    live: null,
    featured: false,
  },
  {
    title: 'YOLOv8 Real-Time Object Detection',
    description:
      'Implemented a real-time object detection system using YOLOv8. Trained the model on the COCO dataset to improve detection accuracy across 80 different object classes. Used the pre-trained YOLOv8 model for real-time object detection with confidence scoring.',
    tech: ['Python'],
    github: 'https://github.com/Noctural123/Real-time-Object-Detection-YOLOV8-',
    date: 'March 2024',
    image: '/Projects/YOLOV8.png',
    imageLink: 'https://github.com/Noctural123/Real-time-Object-Detection-YOLOV8-',
    live: null,
    featured: false,
  },
  {
    title: 'Smiles For Nursing Homes',
    description:
      'Developed a matching algorithm website using JavaScript, HTML, and CSS to connect volunteers with nursing homes based on user criteria. Implemented form validation, data filtering, and dynamic result generation for optimal volunteer-home matching.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/Noctural123/Smiles-For-Nursing-Homes',
    date: 'November 2022',
    image: '/Projects/SFNH.png',
    imageLink: 'https://github.com/Noctural123/Smiles-For-Nursing-Homes',
    live: null,
    featured: false,
  },
  {
    title: 'Vietnamese Bầu Cua Betting Game',
    description:
      "My first ever project I built in High School! Developed backend logic in JavaScript with dice mechanics, betting system, and win/loss calculations. Frontend built using code.org's development environment.",
    tech: ['JavaScript'],
    github: 'https://github.com/Noctural123/Vietnamese-Bau-Cua-',
    date: 'October 2021',
    image: '/Projects/bauCua.png',
    imageLink: 'https://studio.code.org/projects/applab/_neuBeMeGXrcxfobRC6lBshy5JEt4oTcbkf-iZxPJCg',
    live: null,
    featured: false,
  },
];

export const EXPERIENCES = [
  {
    title: 'Software Development Intern',
    company: 'Paycom',
    location: 'Oklahoma City, OK',
    period: 'May 2024 - Present',
    current: true,
    description: 'Collaborated closely with PM, UX, and QA teams to expand and maintain internal tools and systems.',
    achievements: [
      'Designed, created, and tested full-stack web applications using PHP, JavaScript, TypeScript, and MySQL',
      'Improved scalability and abstraction by developing components in React',
      'Enhanced logging granularity, increasing actionable error coverage by 40%',
      'Built an internal proxy service to reveal black-box vendor behavior and streamline background check workflows using C# and .NET',
    ],
    tech: ['React', 'PHP', 'JavaScript', 'TypeScript', 'MySQL', 'C#', '.NET'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'U.S. Department of Defense - Tinker AFB',
    location: 'Oklahoma City, OK',
    period: 'May 2023 - November 2023',
    current: false,
    description: 'Collaborated with PM, UX designers, back-end developers, and security teams to support DoD software systems.',
    achievements: [
      'Resolved UI bugs and implemented feature fixes, reducing internal bug reports by about 30%',
      'Wrote unit tests using JUnit and participated in peer reviews for secure, maintainable code',
      'Contributed to security compliance efforts aligned with STIGs and RMF, supporting successful audit readiness',
    ],
    tech: ['Java', 'JUnit', 'UI/UX', 'Security Compliance'],
  },
  {
    title: 'Undergraduate Researcher',
    company: 'University of Oklahoma',
    location: 'Norman, OK',
    period: 'August 2023 - January 2024',
    current: false,
    description: 'Collaborated multiple times a week with an engineering professor and mentor to conduct an SLR paper.',
    achievements: [
      'Analyzed research articles to explore the use of AI/ML in racing games',
      'Reviewed and scanned over 600+ research articles',
      'Presented research at the American Society for Engineering Education (ASEE) conference',
    ],
    tech: ['Research', 'AI/ML', 'Academic Writing', 'Data Analysis'],
  },
];

export const SOCIALS = {
  github: 'https://github.com/Noctural123',
  linkedin: 'https://linkedin.com/in/annguyen123',
  email: 'hongan.nguyen04@gmail.com',
  phone: '(405)-501-1937',
  phoneHref: 'tel:+14055011937',
  location: 'Norman, Oklahoma',
  resume: '/Nguyen_An_Resume.pdf',
};

export const EMAILJS = {
  serviceId: 'service_4diod3r',
  templateId: 'template_dm49j4f',
  publicKey: 'evxkKcXMZz6v-M14g',
};

export const CONTACT_INTRO =
  "I'm always interested in new opportunities and exciting projects. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!";

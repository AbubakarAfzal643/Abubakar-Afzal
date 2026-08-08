export const personal = {
  name: "Abubakar Afzal",
  title: "Software Engineer | Frontend Developer",
  tagline: "Building scalable solutions with React and modern web technologies.",
  email: "abubakarafzal643@gmail.com",
  phone: "+92 306 555 8577",
  location: "Lahore, Pakistan",
  github: "https://github.com/AbubakarAfzal643",
  linkedin: "https://www.linkedin.com/in/abubakar-afzal-214344287",
  instagram: "https://www.instagram.com/abubakar.cpp/",
  portfolio: "https://abubakar-devfolio.netlify.app/",
  bio: "Passionate Software Engineering student at FAST NUCES, focused on building responsive, user-centric web applications using React and the MERN stack.",
  aboutExtended:
    "I believe that development is about more than writing code — it is about solving real problems and creating intuitive experiences for users. I bring design thinking, clean architecture, and a strong commitment to quality to every project I build.",
};

export const stats = [
  { value: "12+", label: "Projects Completed", count: 12 },
  { value: "4+", label: "Internships", count: 4 },
  { value: "6+", label: "Months Experience", count: 6 },
  { value: "15+", label: "Technologies", count: 15 },
];

export const education = [
  {
    school: "FAST NUCES Lahore",
    full: "National University of Computing & Emerging Sciences",
    degree: "Bachelor of Science in Software Engineering",
    period: "2023 - 2027",
    location: "Lahore, Pakistan",
    accent: "#60a5fa",
  },
  {
    school: "Government College University (GCU), Lahore",
    full: "Intermediate Studies - Computer Science",
    degree: "Intermediate Studies - Computer Science",
    period: "2021 - 2023",
    location: "Lahore, Pakistan",
    accent: "#f97316",
  },
  {
    school: "Central Model School, Samanabad Lahore",
    full: "Matriculation - Computer Science",
    degree: "Matriculation - Computer Science",
    period: "2019 - 2021",
    location: "Lahore, Pakistan",
    accent: "#a855f7",
  },
];

export const experiences = [
  {
    role: "Salesforce Developer",
    company: "Adforce Solutions",
    location: "Lahore, Pakistan",
    period: "Aug 2026 - Present",
    type: "Full-time",
    accent: "#3b82f6",
    bullets: [
      "Developing and configuring Salesforce solutions to support customer relationship management (CRM) workflows and business requirements.",
      "Utilizing Salesforce Trailhead to strengthen knowledge of Salesforce development, administration, data management, and CRM concepts.",
    ],
  },
  {
    role: "Software Quality Tester Intern",
    company: "NETSOL Technologies",
    location: "Pakistan",
    period: "Jul 2026 - Aug 2026",
    type: "Internship",
    accent: "#f59e0b",
    bullets: [
      "Automated multiple websites using Playwright and Python to improve repeatable test coverage and testing efficiency.",
      "Validated critical user flows through end-to-end testing and smoke testing to identify functional issues and regression risk.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Quantum Logics",
    location: "Lahore, Pakistan",
    period: "April 2026 - July 2026",
    type: "Internship",
    accent: "#60a5fa",
    bullets: [
      "Collaborated with cross-functional teams to develop and maintain web applications.",
      "Gained hands-on exposure to frontend and backend development practices.",
      "Contributed to modern, responsive interfaces with an emphasis on usability.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "DeveloperHUB Corporation",
    location: "Lahore, Pakistan",
    period: "Nov 2025 - Dec 2025",
    type: "Internship",
    accent: "#34d399",
    bullets: [
      "Participated in the full SDLC in an agile environment.",
      "Built responsive user interfaces and strengthened problem-solving skills.",
      "Worked closely with teams to translate ideas into clean, functional implementation.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Elevvo Pathways",
    location: "Lahore, Pakistan",
    period: "Sep 2025 - Oct 2025",
    type: "Internship",
    accent: "#c084fc",
    bullets: [
      "Collaborated with UI/UX designers to convert wireframes into working code.",
      "Improved attention to detail while building polished frontend experiences.",
      "Contributed to meaningful user-facing product improvements.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "AutoSphere",
    category: "Web",
    summary: "A full-stack automotive marketplace and service platform for vehicle parts.",
    description:
      "AutoSphere provides role-based buyer and vendor experiences with a modern UI and a scalable MERN stack foundation.",
    highlights: [
      "Role-based interfaces for buyers and vendors",
      "Modern marketplace experience with reusable components",
      "Built using React, Node.js, Express, and MongoDB",
    ],
    tech: ["ReactJS", "MongoDB", "NodeJS", "ExpressJS"],
    live: "https://auto-sphere-v2-az.vercel.app/",
    github: "https://github.com/AbubakarAfzal643/AutoSphere_v2",
    featured: true,
  },
  {
    id: 2,
    name: "Mini-LinkedIn",
    category: "Web",
    summary: "A social networking app with secure authentication, profile management, and CRUD posts.",
    description:
      "Mini-LinkedIn is a modern social web app with dynamic profiles and user-generated content flows built for a polished experience.",
    highlights: [
      "Secure user authentication",
      "Dynamic profile management",
      "Full CRUD operations for posts",
    ],
    tech: ["React", "Vite", "Appwrite", "Redux Toolkit", "Tailwind"],
    live: "https://stackpost.netlify.app/",
    github: "https://github.com/AbubakarAfzal643/mini-linkedin",
    featured: true,
  },
  {
    id: 3,
    name: "ProjectPlanner",
    category: "Programming",
    summary: "A desktop app for managing project tasks, dependencies, and resource allocation.",
    description:
      "ProjectPlanner combines clarity and structure for project management with an object-oriented desktop interface.",
    highlights: [
      "Task and dependency tracking",
      "Resource allocation workflows",
      "Built with Java and Swing",
    ],
    tech: ["Java", "Swing", "Maven"],
    live: null,
    github: "https://github.com/AbubakarAfzal643/ProjectPlanner",
    featured: false,
  },
  {
    id: 4,
    name: "Flex SMS",
    category: "Programming",
    summary: "A student management system with role-based access for admins, teachers, and students.",
    description:
      "Flex SMS focuses on secure role-based operations and reliable data handling for educational management workflows.",
    highlights: [
      "Role-based access control",
      "Secure student management workflows",
      "Built with C++ and .NET",
    ],
    tech: ["C++", ".NET", "SQL"],
    live: null,
    github: "https://github.com/AbubakarAfzal643/StudentManagementSystem",
    featured: false,
  },
  {
    id: 5,
    name: "BoolForge",
    category: "AI",
    summary: "Interactive digital-logic learning and circuit design platform.",
    description:
      "A free interactive platform for digital logic and circuit design. Hands-on tools to build circuits and simplify Boolean expressions. Visual K-Maps, number conversion, and instant circuit visualization. No setup required.",
    highlights: [
      "Visual circuit builder",
      "K-Map simplification",
      "Number system converters",
    ],
    tech: ["JavaScript", "React", "MERN"],
    live: "https://circuits.quantumlogicslimited.com/",
    github: "https://github.com/AbubakarAfzal643/DigitalLogicsStudio/",
    featured: true,
  },
  {
    id: 6,
    name: "ResQ",
    category: "Web",
    summary: "A full-stack disaster relief management platform for victims, volunteers, donors, and admins.",
    description:
      "ResQ connects key stakeholders in disaster response workflows with real-time location tracking and analytics support.",
    highlights: [
      "Disaster response coordination",
      "Real-time location and analytics support",
      "Built with React, Tailwind, Node.js, and MongoDB",
    ],
    tech: ["React", "Tailwind", "Node.js", "Express.js", "MongoDB"],
    live: "https://my-resq.vercel.app/",
    github: "https://github.com/MuhammadZaighamAsif/Disaster-Management-System",
    featured: true,
  },
  {
    id: 7,
    name: "LogiSim",
    category: "Programming",
    summary: "A JavaFX-based digital logic circuit simulator for learning and practicing logic design.",
    description:
      "LogiSim helps learners explore digital logic concepts with a practical and approachable desktop interface.",
    highlights: [
      "Logic circuit simulation",
      "Interactive educational design",
      "Built with Java and JavaFX",
    ],
    tech: [".NET", "Desktop", "SQL", "Java", "JavaFX"],
    live: null,
    github: "https://github.com/UmerNaseer1525/LogiSim",
    featured: false,
  },
  {
    id: 8,
    name: "NotesBoard",
    category: "Web",
    summary: "A MERN note-taking app for creating, reading, updating, and deleting personal notes.",
    description:
      "NotesBoard offers a smooth and practical workspace for everyday note organization and management.",
    highlights: [
      "CRUD-based note management",
      "Clean and responsive UI",
      "Built with Express, React, Node.js, and MongoDB",
    ],
    tech: ["Express", "React", "Node.js", "MongoDB"],
    live: "https://note-builder-gejo.onrender.com/",
    github: "https://github.com/AbubakarAfzal643/NOTE-BUILDER",
    featured: false,
  },
];

export const npmPackages = [];

export const skills = {
  Languages: ["Java", "C++", "Python"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "HTML5", "CSS3", "Vite"],
  Backend: ["Node.js", "Express.js", "MongoDB", "MySQL", "Appwrite"],
  Tools: ["Git", "GitHub"],
};

export const certificates = [
  {
    name: "SQA - Intern",
    issuer: "Netsol Technologies",
    date: "2026",
    description:
      "Completed an SQA internship focused on automating websites with Playwright and Python.",
    image: "/certificates/Netsol Completion Certificate.png",
  },
  {
    name: "Frontend Development - Intern",
    issuer: "DeveloperHUB Corporation",
    date: "2025",
    description:
      "Verified course on frontend development and practical UI implementation.",
    image: "/certificates/DHC%20certificate.png",
  },
  {
    name: "FrontEnd Developer - Intern",
    issuer: "Elevvo Pathway",
    date: "2025",
    description:
      "Completed an internship focused on creating responsive interfaces and polished user experiences.",
    image: "/certificates/Ellovo-pathways-completionCertificate.png",
  },
  {
    name: "MERN Stack Developer",
    issuer: "Quantum Logics",
    date: "2026",
    description:
      "Collaborated with cross-functional teams to develop and maintain web applications. Gained exposure to frontend and backend development practices.",
    image: "/certificates/QuantumLogics_CompletionCertificate.png",
  },
  {
    name: "FSPC Fast Speed Programming Competition 2024",
    issuer: "FAST NUCES Lahore",
    date: "2024",
    description:
      "Practical programming competition experience with a focus on speed, logic, and problem solving.",
    image: "/certificates/FSPC.jpg",
  },
];

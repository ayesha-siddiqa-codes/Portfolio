// All your portfolio content lives here.
export const profile = {
  name: "Ayesha Siddiqa",
  title: "Full Stack Web Developer",
  tagline:
    "BCA student who builds and deploys full-stack apps with React, Node.js, Express and MongoDB.",
  about: [
    "I'm a BCA student at HKBK Degree College with a strong foundation in programming, web development, databases and computer networks.",
    "I've built and deployed full-stack projects including a lead management CRM with JWT authentication and a furniture rental platform, and I've built a real website for a café in Hauz Khas Village, New Delhi.",
    "I'm looking for a full stack developer internship or junior role where I can keep learning while shipping real features."
  ],
  github: "https://github.com/ayesha-siddiqa-codes",
  linkedin: "https://www.linkedin.com/in/ayesha-siddiqa-a02999425?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  email: "ayeshasiddiqa150324@gmail.com",
  resumeUrl: "/Ayesha_Siddiqa_Resume.pdf" // copy your PDF into client/public/
};

export const skills = {
  Languages: ["JavaScript", "Python", "Java", "C", "SQL"],
  Frontend: ["HTML", "CSS", "React.js"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT"],
  Database: ["MongoDB", "Mongoose", "MySQL"],
  "Tools & Deploy": ["GitHub", "Render", "Vercel", "Linux"],
};

export const projects = [
    {
    title: "FurniRent: Furniture Rental Platform",
    description:
      "Rental platform with user and admin features, REST APIs for furniture, users and orders, and a responsive UI.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Mongoose"],
    category: "Full Stack",
    github: "https://github.com/ayesha-siddiqa-codes/FurniRent.git", // add repo link
    live: "https://furnirent.onrender.com/",
    status: "Live",
    note: "Hosted on a free tier, so the first load may take about 30 seconds."
  },
  {
  title: "LeadFlow: Mini CRM",
  description: "Lead management dashboard with CRUD, search, status filtering and follow-up tracking. Admin access is protected with JWT authentication.",
  tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  category: "Full Stack",
  github: "https://github.com/ayesha-siddiqa-codes/leadflow",
  live: "https://leadflow-frontend-omega.vercel.app/",
  status: "Live"
},
  {
    title: "Cafe Pink Website",
    description:
      "Responsive business website for a real café in Hauz Khas Village, New Delhi, showing the menu, ambience, contact details and location.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    category: "Frontend",
    github: "https://github.com/ayesha-siddiqa-codes/leadflow",
    live: "https://ayesha-siddiqa-codes.github.io/cafe-pink-website/",
    status: "Live"
  },
  {
    title: "Student Management System",
    description:
      "Full-stack system to manage student records, attendance, marks and courses, with REST APIs and an admin interface.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    github: "",
    live: "",
    status: "Completed"
  }
];

export const experience = [
  {
    role: "Full Stack Web Development Intern",
    org: "Future Interns",
    period: "Oct 2026 - Present",
    detail:
      "Building full-stack apps with React, Node.js, Express and MongoDB, including a Mini CRM with REST APIs, database integration and secure authentication."
  },
  {
    role: "Full-Stack Development Intern",
    org: "EduPhoenix Solutions",
    period: "Aug 2026",
    detail:
      "Worked across frontend, backend, REST APIs and databases to build, test and improve features of web applications."
  },
  {
    role: "Bachelor of Computer Application",
    org: "HKBK Degree College",
    period: "2024 - 2027",
    detail: "Current GPA 9.01. Focus on programming, web development, databases and networks."
  }
];

export const certifications = [
  { title: "Practical HTML & CSS", date: "Oct 2026", link: "https://ap.wps.com/cms/docs/d/cbCaerSUpAWMOqHz?sa=601.1074&refer=copylink" },
  { title: "Introduction to Cloud Computing", date: "Nov 2025", link: "https://ap.wps.com/cms/docs/d/cbCaev7UFXgMHc8q?sa=601.1074&refer=copylink" },
  { title: "Cloud Computing Basics", date: "Nov 2025", link: "https://ap.wps.com/cms/docs/d/cbCaedn08WXualVN?sa=601.1074&refer=copylink" },
  { title: "Computer Network & Internet Security", date: "May 2026", link: "https://ap.wps.com/cms/docs/d/cbCaemjxQlOBJSTk?sa=601.1074&refer=copylink" },
  { title: "Java for Beginners", date: "Dec 2025", link: "https://ap.wps.com/cms/docs/d/cbCaehRIRs5MMgwk?sa=601.1074&refer=copylink" },
  { title: "Generative AI Literacy", date: "Sep 2025", link: "https://ap.wps.com/cms/docs/d/cbCaeitSH2EJBnl9?sa=601.1074&refer=copylink" }
];

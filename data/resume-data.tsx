import { FaGithub, FaLinkedin, FaSpotify, FaWindows } from "react-icons/fa";
import { LuFish, LuPencil } from "react-icons/lu";
import {
    SiAmazonwebservices,
    SiAnki,
    SiCloudflare,
    SiDiscord,
    SiDocker,
    SiFigma,
    SiLinux,
    SiMongodb,
    SiNotion,
    SiObsidian,
    SiOpenai,
    SiPostman,
    SiVercel,
    SiWarp,
    SiX,
    SiZedindustries,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const RESUME_DATA = {
    name: "Nathan Mota",
    initials: "NM",
    position: "Software Engineer",
    location: "Ribeirão Preto, SP, Brasil",
    techStack: ["TypeScript", "React", "Angular", "Node", "AWS"],
    locationLink: "https://www.google.com/maps/place/Ribeir%C3%A3o+Preto+-+State+of+S%C3%A3o+Paulo",
    about:
        "Full-Stack Developer passionate about solving problems!",
    summary: `
    Full-Stack Developer with over 2 years of experience building complete web applications, from Front-End to Back-End. Graduated in Information Systems from UFU, I started my journey as an IT Technician at Unesp FCAV, where I developed my first programming projects. Currently, I work on building scalable solutions, system integrations, and applying software engineering best practices.
    `,
    avatarUrl: "https://avatars.githubusercontent.com/u/120220035?v=4",
    personalWebsiteUrl: "#",
    initialPhrase: "Your next big application needs a solid foundation and an amazing interface. Let’s talk and build something real.",
    contact: {
        email: "nathansmota@gmail.com",
        tel: "+55 16 99993-6596",
        social: [
            {
                name: "GitHub",
                url: "https://github.com/nathanmota-dev",
                icon: FaGithub,
                showOnCv: true,
            },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/nathansmota/",
                icon: FaLinkedin,
                showOnCv: true,
            },
            {
                name: "X (Twitter)",
                url: "https://x.com/pq_nathan",
                icon: SiX,
                showOnCv: false,
            },
            {
                name: "Spotify",
                url: "https://open.spotify.com/user/d9zhqx5tfnna0pqx4or91e3re?si=bcf6f90eae0446d8",
                icon: FaSpotify,
                showOnCv: false,
            },
        ],
    },
    education: [
        {
            school: "Federal University of Uberlândia (UFU)",
            degree: "Information Systems",
            start: "2019",
            end: "2025",
        },
        {
            school: "São Paulo State University (Unesp)",
            degree: "Computer Technician (IT)",
            start: "2015",
            end: "2016",
        },
    ],
    work: [
        {
            company: "Von Braun Labs",
            link: "https://www.linkedin.com/company/von-braun-labs/",
            badges: ["Remote"],
            title: "Full-Stack Developer (Front-End Focus)",
            start: "2025",
            end: "Present",
            description: `
            Worked on the development and maintenance of web applications across multiple projects, contributing in different contexts and technology stacks.

            Front-end: Refactored and modernized interfaces based on Figma layouts using Angular, HTML, CSS, JavaScript, and TypeScript. Developed reusable components, improved UI consistency, and enhanced overall user experience.

            Back-end: Contributed to PHP and C# applications by creating and maintaining CRUD operations, fixing bugs, and refactoring legacy code to improve structure, readability, and performance.

            Cloud integration: Worked with AWS services such as S3 and EC2 to support application infrastructure and deployments.
            `,
        },
        {
            company: "Von Braun Labs",
            link: "https://www.linkedin.com/company/von-braun-labs/",
            badges: ["Remote"],
            title: "Full-Stack Developer",
            start: "2024",
            end: "2025",
            description: `
            Supported the development of SDF simulation features through web interfaces, contributing to both front-end and back-end improvements.

            Modernized legacy architecture by transitioning older JavaScript/PHP implementations into more structured and maintainable solutions.

            Optimized MySQL queries to improve system performance and data retrieval efficiency.

            Collaborated across teams to ensure stable integrations and continuous improvements in application reliability.
            `,
        },
        {
            company: "X-RAT - FAPEMIG",
            link: "#",
            badges: ["Hybrid"],
            title: "Full-Stack Developer",
            start: "2024",
            end: "2025",
            description: `
            Participated in the X-RAT platform project, focused on analyzing software failure groups and identifying root causes.

            Front-end (main responsibility): Designed and implemented the user interface using React, Vite, Tailwind CSS, React Query, and Chart.js, prioritizing performance, usability, and data visualization clarity.

            Back-end: Developed features using Python and FastAPI for processing dataframes and EVTX log files.

            Integrated front-end and back-end systems to enable automated reliability report generation and visualization.
            `,
        },
        {
            company: "Jovens Programadores - UFU",
            link: "#",
            badges: ["On-site"],
            title: "Web Programming Instructor",
            start: "2024",
            end: "2024",
            description: `
            Taught fundamental computer science concepts to teenagers aged 12 and above.

            Delivered practical classes on HTML, CSS, and introductory Bootstrap, guiding students step by step in building complete websites.

            Supervised individual and group final projects, encouraging collaboration, creativity, and real-world application of knowledge.

            Promoted digital inclusion and foundational programming skills in an academic environment.
            `,
        },
    ],
    skills: [
        "TypeScript",
        "ReactJs",
        "Angular",
        "NextJs",
        "Node.js",
        "Fastify",
        "MySQL",
        "PostrgreSQL",
        "MongoDB",
        "AWS",
        "Docker",
    ],
    setup: {
        specsItems: [
            "Ryzen 5 7600",
            "32gb DDR5 6000mhz",
            "GTX 1660",
            "Water Cooler Aura 240mm",
            "2TB M.2 NVMe + 500GB SATA",
            "AOC G4 24G4 180Hz",
            "Aula F75",
            "Delux M600 / Zowie EC2-C",
        ],
        personalStackItems: [
            { name: "Linux", icon: SiLinux, color: "#E95420" },
            { name: "Windows 11", icon: FaWindows, color: "#0078D4" },
            { name: "Zed", icon: SiZedindustries, color: "#888888" },
            { name: "Orca", icon: LuFish, color: "#888888" },
            { name: "Pencil", icon: LuPencil, color: "#F59E0B" },
            { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
            { name: "Vercel", icon: SiVercel, color: "#888888" },
            { name: "Codex", icon: SiOpenai, color: "#10A37F" },
        ],
        workStackItems: [
            { name: "Linux", icon: SiLinux, color: "#E95420" },
            { name: "VS Code", icon: VscVscode, color: "#007ACC" },
            { name: "Warp", icon: SiWarp, color: "#01A4FF" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Figma", icon: SiFigma, color: "#F24E1E" },
            { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
            { name: "MongoDB Compass", icon: SiMongodb, color: "#47A248" },
        ],
        toolsItems: [
            { name: "Notion", icon: SiNotion, color: "#888888" },
            { name: "Obsidian", icon: SiObsidian, color: "#7C3AED" },
            { name: "Discord", icon: SiDiscord, color: "#5865F2" },
            { name: "Spotify", icon: FaSpotify, color: "#1DB954" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "Anki", icon: SiAnki, color: "#00A8E8" },
        ],
    },
    projects: [
        {
            image: "projects/distributed.jpeg",
            title: "Video Lecture Platform with Distributed System",
            techStack: [
                "Node",
                "Fastify",
                "RabbitMQ",
                "AWS",
                "Amazon S3",
                "PostgreSQL",
                "Next",
                "Amazon EC2",
            ],
            description:
                "Online learning platform with queue management for video uploads, cloud storage, and a course authentication and management system.",
            githubUrl: "https://github.com/nathanmota-dev/systems-distributed",
            type: "fullstack",
            link: {
                label: "https://github.com/nathanmota-dev/systems-distributed",
                href: "https://github.com/nathanmota-dev/systems-distributed",
            },
        },
        {
            image: "projects/montebot.JPG",
            title: "Monte Bot - Robotics Laboratory",
            techStack: [
                "Next",
                "NextAuth",
                "PostgreSQL",
                "TailwindCSS",
                "Shadcn/ui",
                "Three.js",
            ],
            description:
                "Institutional website with an application form and authentication using NextAuth (GitHub login). Includes a dashboard for viewing applicants and their data.",
            githubUrl: "https://github.com/monte-bot/montebot",
            deployUrl: "https://monte-bot.vercel.app/",
            type: "fullstack",
            link: {
                label: "https://monte-bot.vercel.app/",
                href: "https://monte-bot.vercel.app/",
            },
        },
        {
            image: "projects/poo2.JPG",
            title: "MedAgenda",
            techStack: [
                "Java",
                "Spring Boot",
                "PostgreSQL",
                "Hibernate",
                "Docker",
                "Vite",
                "React",
                "TypeScript",
                "TailwindCSS",
            ],
            description:
                "Med Agenda is a project developed for managing a medical clinic, including the management of patients, doctors, and appointments.",
            githubUrl: "https://github.com/nathanmota-dev/final-project-poo2",
            deployUrl: "https://final-project-poo2.vercel.app/",
            type: "fullstack",
            link: {
                label: "https://final-project-poo2.vercel.app/",
                href: "https://final-project-poo2.vercel.app/",
            },
        },
        {
            image: "projects/blog.JPG",
            title: "Blog with Next",
            techStack: [
                "Next",
                "TailwindCSS",
                "Shadcn.ui",
                "React-Icons",
                "@next/mdx",
            ],
            description:
                "The goal of the blog is to allow the creation of new posts dynamically, using MDX files where each created MDX file automatically generates a route.",
            githubUrl: "https://github.com/nathanmota-dev/blog-nextjs",
            deployUrl: "https://blog-do-nathan.vercel.app/",
            type: "frontend",
            link: {
                label: "https://blog-do-nathan.vercel.app/",
                href: "https://blog-do-nathan.vercel.app/",
            },
        },
        {
            image: "projects/dashboard.JPG",
            title: "Full Stack Dashboard",
            techStack: [
                "Next",
                "TailwindCSS",
                "Shadcn.ui",
                "MongoDB",
                "Docker",
            ],
            description:
                "Dashboard built with Next.js featuring User CRUD, Authentication, Encryption, Different User Permissions, and Data Retrieval on Access",
            githubUrl: "https://github.com/nathanmota-dev/dashboard-next-crud",
            deployUrl: "https://dashboard-next-crud.vercel.app/",
            type: "fullstack",
            link: {
                label: "https://dashboard-next-crud.vercel.app/",
                href: "https://dashboard-next-crud.vercel.app/",
            },
        },
        {
            image: "projects/TechVantage.JPG",
            title: "Tech Vantage - Corporate Website",
            techStack: [
                "PHP",
                "HTML",
                "CSS",
                "JavaScript",
                "Bootstrap",
                "MySQL",
            ],
            description:
                "Final Project for Internet Programming developing a functional system with requirements like Form Registration and Data Printing",
            githubUrl: "https://github.com/nathanmota-dev/Programacao-para-Internet-1",
            deployUrl: "http://techvantage.infinityfreeapp.com/index.php",
            type: "fullstack",
            link: {
                label: "http://techvantage.infinityfreeapp.com/index.php",
                href: "http://techvantage.infinityfreeapp.com/index.php",
            },
        },
        {
            image: "projects/Todo.jpg",
            title: "Todo List - MERN Stack",
            techStack: [
                "MongoDB",
                "Express",
                "React",
                "Node",
                "Styled-Components",
                "Vite",
            ],
            description:
                "POC - Todo List made to perform the 4 CRUD operations using a non-relational database and includes a complete Login System",
            githubUrl: "https://github.com/nathanmota-dev/todo-list-mern-stack",
            deployUrl: "https://todo-list-mern-stack.vercel.app/",
            type: "fullstack",
            link: {
                label: "https://todo-list-mern-stack.vercel.app/",
                href: "https://todo-list-mern-stack.vercel.app/",
            },
        },
        {
            image: "projects/Coffee-LP.JPG",
            title: "Landing Page Meow Café",
            techStack: [
                "HTML",
                "CSS",
                "JavaScript",
            ],
            description:
                "Project proposed by Codante where the goal was to bring the Meow Café design to life, transforming it into a functional and responsive page without using frameworks.",
            githubUrl: "https://github.com/nathanmota-dev/landing-page-meow-cafe",
            deployUrl: "https://nathanmota-dev.github.io/landing-page-meow-cafe/",
            type: "frontend",
            link: {
                label: "https://nathanmota-dev.github.io/landing-page-meow-cafe/",
                href: "https://nathanmota-dev.github.io/landing-page-meow-cafe/",
            },
        },
        {
            image: "projects/FastAPI.JPG",
            title: "API - FastAPI",
            techStack: [
                "Python",
                "FastAPI",
                "PostgreSQL",
            ],
            description:
                "API built with FastAPI with the goal of creating a robust and modularized API in Python, later reused in my Scientific Initiation.",
            githubUrl: "https://github.com/nathanmota-dev/node-com-fastify",
            deployUrl: "",
            type: "backend",
            link: {
                label: "https://github.com/nathanmota-dev/node-com-fastify",
                href: "https://github.com/nathanmota-dev/node-com-fastify",
            },
        },
        {
            image: "projects/Insove-LP.JPG",
            title: "Landing Page Insove Medical Healthcare",
            techStack: [
                "HTML",
                "TailwindCSS",
                "RemixIcon",
                "SwiperJS",
                "ScrollReveal",
            ],
            description:
                "Landing Page created using TailwindCSS designed for medical clinics, aiming to provide a good experience for doctors and patients.",
            githubUrl: "https://github.com/nathanmota-dev/landing-page-insove-medical-healthcare",
            deployUrl: "https://insove-medical-healthcare.netlify.app/",
            type: "frontend",
            link: {
                label: "https://insove-medical-healthcare.netlify.app/",
                href: "https://insove-medical-healthcare.netlify.app/",
            },
        },
        {
            image: "projects/Buscador.JPG",
            title: "Name Finder",
            techStack: [
                "React",
                "Node",
                "Express",
                "MySQL",
            ],
            description:
                "Final Project for Internet Programming where the goal was to create a name search engine consuming an API on the backend, processing the data, and displaying it on the frontend with a search history.",
            githubUrl: "https://github.com/nathanmota-dev/programacao-para-internet-2",
            deployUrl: "https://programacao-para-internet-2.vercel.app/",
            type: "fullstack",
            link: {
                label: "https://programacao-para-internet-2.vercel.app/",
                href: "https://programacao-para-internet-2.vercel.app/",
            },
        },
        {
            image: "projects/GoogleKeep.JPG",
            title: "Google Keep Clone",
            techStack: [
                "HTML",
                "CSS",
                "JavaScript",
            ],
            description:
                "Google Keep clone proposed to be done without frameworks, allowing you to make notes, pin notes, duplicate notes, and export notes to a CSV file.",
            githubUrl: "https://github.com/nathanmota-dev/Google-Keep-JS",
            deployUrl: "https://google-keep-js.vercel.app/",
            type: "frontend",
            link: {
                label: "https://google-keep-js.vercel.app/",
                href: "https://google-keep-js.vercel.app/",
            },
        },
        {
            image: "projects/NodeFastify.JPG",
            title: "API - Node Fastify",
            techStack: [
                "Node",
                "Fastify",
                "PostgreSQL",
            ],
            description:
                "API built with the goal of performing CRUD operations using a relational database.",
            githubUrl: "https://github.com/nathanmota-dev/node-com-fastify",
            deployUrl: "",
            type: "backend",
            link: {
                label: "https://github.com/nathanmota-dev/node-com-fastify",
                href: "https://github.com/nathanmota-dev/node-com-fastify",
            },
        },
        {
            "image": "projects/portfolio-v1.png",
            "title": "Personal Portfolio V1",
            "techStack": [
                "Next",
                "TailwindCSS",
                "Shadcn/ui",
                "next-intl",
                "TypeScript"
            ],
            "description":
                "First version of my portfolio focused on internationalization (i18n), Mobile-First responsive design, and Dark Mode support, showcasing my main projects and experiences.",
            "githubUrl": "https://github.com/nathanmota-dev/portfolio",
            "deployUrl": "https://nathanmota-portifolio.vercel.app/",
            "type": "frontend",
            "link": {
                "label": "https://nathanmota-portifolio.vercel.app/",
                "href": "https://nathanmota-portifolio.vercel.app/",
            },
        },
    ],
} as const;

import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    // Personal information
    personal: {
      name: "Abid Ibadurrahman",
      profession: ["Fullstack Developer", "Backend Developer", "Frontend Developer", "Mobile Developer"],
      tagline: "Even in my dreams, syntax errors still haunt me.😴",
    },

    // About information
    about: {
      description: `
        Hi! I'm Abid, a Fullstack Developer based in Yogyakarta, Indonesia. I have a passion for web and mobile development, and I love to create things that live on the internet. I'm a fast learner, a team player, and I'm always looking for opportunities to grow and improve my skills. I'm currently working as a Fullstack Developer at PT. Horus Technology, where I develop and customize an ERP system to align with business needs. I'm also a recent graduate with a Bachelor's degree in Information Technology from Universitas Muhammadiyah Yogyakarta.
      `,
      skills: [
        {
          category: "Frontend",
          items: [
            { name: "Vue.js", rating: 9 },
            { name: "React", rating: 7 },
            { name: "JavaScript", rating: 9 },
            { name: "TypeScript", rating: 6 },
            { name: "HTML/CSS", rating: 9 },
            { name: "SCSS", rating: 9 },
            { name: "TailwindCSS", rating: 9 },
            { name: "Bootstrap", rating: 8 },
            { name: "jQuery", rating: 8 },
            { name: "Kotlin", rating: 8 },
          ],
        },
        {
          category: "Backend",
          items: [
            { name: "Node.js", rating: 8 },
            { name: "Express", rating: 6 },
            { name: "PHP", rating: 9 },
            { name: "Laravel", rating: 9 },
            { name: "Python", rating: 9 },
            { name: "Flask", rating: 9 },
            { name: "Java", rating: 5 },
            { name: "Rest API", rating: 9 },
          ],
        },
        {
          category: "Database",
          items: [
            { name: "MySQL", rating: 9 },
            { name: "PostgreSQL", rating: 9 },
            { name: "MongoDB", rating: 6 },
            { name: "Redis", rating: 5 },
            { name: "Firebase", rating: 6 },
          ],
        },
        {
          category: "DevOps",
          items: [
            { name: "Docker", rating: 5 },
            { name: "Git", rating: 9 },
            { name: "CI/CD", rating: 7 },
          ],
        },
        {
          category: "Tools",
          items: [
            { name: "VS Code", rating: 9 },
            { name: "Android Studio", rating: 8 },
            { name: "Postman", rating: 9 },
            { name: "Figma", rating: 7 },
            { name: "JetBrains IDEs", rating: 8 },
            { name: "Jira", rating: 7 },
          ],
        },
      ],
      experience: [
        {
          position: "Internship",
          company: "PT Telkom Witel - Yogyakarta, Indonesia",
          period: "Feb 2023 - Apr 2023",
          description: "Developed a simple web-based application to facilitate the creation of official reports. Inputted operational readiness report documents and subscription contract documents.",
        },
        {
          position: "Mobile Development Learning Path",
          company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
          period: "Feb 2024 - Jul 2024",
          description:
            "Studied fundamental Kotlin programming. Learned Android development from fundamental to intermediate level. Gained basic AI knowledge and its implementation in Android. Developed a capstone project—an Android-based application for detecting sugar content in packaged beverages.",
        },
        {
          position: "Fullstack Developer",
          company: "PT. Horus Technology - Yogyakarta, Indonesia",
          period: "Aug 2024 - Present",
          description:
            "Responsible for the development, customization, and integration of an ERP system to align with business needs. Tasks include designing and modifying modules, optimizing system performance, debugging, and ensuring seamless integration with external services such as APIs and databases.",
        },
      ],
      education: [
        {
          degree: "Bachelor Degree (S1) in Information Technology",
          institution: "Universitas Muhammadiyah Yogyakarta - DI Yogyakarta, Indonesia",
          period: "2020 - 2024",
        },
        {
          degree: "High School Diploma (SMA) in MIPA",
          institution: "SMAIT YAPIDH - West Java, Indonesia",
          period: "2017 - 2020",
        },
      ],
    },

    // Portfolio projects
    projects: [
      {
        id: 1,
        title: "Pharmacy POS Application",
        description: "A web-based application used to manage drug sales data in pharmacies.",
        technologies: ["Laravel", "MySQL", "jQuery", "TailwindCSS"],
        image: "/images/projects/apotek.png",
        link: "https://apotekdiva.abidbe.com",
        github: "https://github.com/abidbe/apotek-laravel",
        category: "Full Stack",
        featured: false,
      },

      {
        id: 2,
        title: "Futsal Booking Application",
        description: "A web-based application used for online futsal court booking.",
        technologies: ["Laravel", "MySQL", "jQuery", "Bootstrap"],
        image: "/images/projects/futsal.png",
        link: "",
        github: "https://github.com/abidbe/book_futsal",
        category: "Full Stack",
        featured: true,
      },
      {
        id: 3,
        title: "Sugar Detection App for Packaged Beverages",
        description: "An Android-based application used to detect sugar levels in packaged beverages.",
        technologies: ["Kotlin", "Android Studio"],
        image: "/images/projects/sweetify.png",
        link: "",
        github: "https://github.com/abidbe/sweetify",
        category: "Mobile",
        featured: true,
      },
      {
        id: 4,
        title: "Coal Management Application",
        description: "A web-based application used to manage coal data, from heavy equipment data to reports.",
        technologies: ["Laravel", "MySQL", "jQuery", "Bootstrap"],
        image: "/images/projects/batubara.png",
        link: "",
        github: "https://github.com/abidbe/ta",
        category: "Full Stack",
        featured: true,
      },
      {
        id: 5,
        title: "Color Palette Generator",
        description: "A website to generate, save, and export harmonious color palettes with an interactive and elegant interface.",
        technologies: ["React", "TypeScript", "Vite", "TailwindCSS"],
        image: "/images/projects/cp.png",
        link: "https://color-palette-generator-rust.vercel.app/",
        github: "https://github.com/abidbe/color-palette-generator.git",
        category: "Frontend",
        featured: true,
      },
    ],

    // Contact information
    contact: {
      email: "abidbe.123@gmail.com",
      socialMedia: [
        {
          name: "GitHub",
          url: "https://github.com/abidbe",
          icon: "github",
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/abidibadurrahman",
          icon: "linkedin",
        },
        {
          name: "WhatsApp",
          url: "https://wa.me/6282287339753",
          icon: "whatsapp",
        },
        {
          name: "Gmail",
          url: "mailto:abidbe.123@gmail.com",
          icon: "envelope",
        },
      ],
      location: "DI Yogyakarta, Indonesia",
    },
  }),
});

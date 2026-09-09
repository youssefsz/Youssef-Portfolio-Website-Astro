export interface StatItem {
  value: string;
  label: string;
}

export interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  description: string;
  badge?: string;
  stats?: StatItem[];
  link?: string;
}

export interface EducationItem {
  date: string;
  degree: string;
  school: string;
  description?: string;
  stats?: StatItem[];
}

export const experience: ExperienceItem[] = [
  {
    date: "Mar 2025 - Present",
    title: "Upwork Freelancer",
    company: "Full-Stack & AI Development",
    description: "Built and shipped web, mobile, desktop, CLI, and AI products for clients worldwide.",
    badge: "Top Rated Plus",
    link: "https://www.upwork.com/freelancers/youssefsz",
    stats: [
      { value: "19", label: "Jobs Completed" },
      { value: "100%", label: "Job Success" },
      { value: "5.0★", label: "Client Rating" }
    ]
  },
  {
    date: "Aug 2025 - Sep 2025",
    title: "Banking Internship",
    company: "STB BANK (Société Tunisienne de Banque)",
    description: "Worked on digital banking processes and gained practical experience in financial technology and modern banking systems."
  }
];

export const education: EducationItem[] = [
  {
    date: "September 2024 - Present",
    degree: "Undergraduate, Computer Science",
    school: "FSGF",
    description: "Coursework in operating systems, programming paradigms, algorithms, and software engineering."
  },
  {
    date: "September 2023 - June 2024",
    degree: "Baccalaureate in Computer Science",
    school: "Houcine Bouzaiene High School of Gafsa (L.H.B.G)",
    stats: [
      { value: "15.32/20", label: "Grade" },
      { value: "623/6004", label: "Rank (Top 10%)" }
    ]
  }
];

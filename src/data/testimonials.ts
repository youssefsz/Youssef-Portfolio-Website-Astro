import berniImg from "@/assets/clients/berni.jpeg";
import nurzholImg from "@/assets/clients/Nurzhol.webp";
import davidImg from "@/assets/clients/david.webp";
import georgeImg from "@/assets/clients/George.jpeg";
import clientImg from "@/assets/clients/client.png";

export interface Testimonial {
  name: string;
  project: string;
  date: string;
  rating: number;
  text: string;
  img: string | ImageMetadata;
  username?: string; // Optional, as some might not have it, or we can use project as username-like subtitle
}

export const testimonials: Testimonial[] = [
  {
    name: "Berni Cortvriend",
    project: "Restaurant website",
    date: "Sep 11, 2025 - Oct 16, 2025",
    rating: 5.0,
    text: "To be fair, I have nothing bad to say about Youssef, he carefully listens to the requests I have and tries to implement them accordingly. When something is not how I want it, he has no problem changing it free of charge. If you are still looking for a good web developer, he is your man!",
    img: berniImg,
  },
  {
    name: "Joseph Kim",
    project: "AI labeling site",
    date: "Jun 28, 2025 - Present",
    rating: 5.0,
    text: "He implements and deploys platforms in the field of artificial intelligence very quickly. If you want to build a prototype of your project in the shortest possible time, be sure to consult with him. He is a person with a very high level of expertise.",
    img: clientImg,
  },
  {
    name: "Aiden Samuel",
    project: "AI allergy checker",
    date: "Jun 27, 2025 - Present",
    rating: 5.0,
    text: "Excellent coder! Very professional, quick to understand requirements, and delivered clean, efficient code ahead of schedule. Great communication throughout the project—I highly recommend working with them.",
    img: clientImg,
  },
  {
    name: "Nurzhol Tabigat",
    project: "Need landing page",
    date: "Mar 30, 2025 - Apr 1, 2025",
    rating: 5.0,
    text: "Youssef Dhibi did an excellent job delivering a high-quality landing page exactly as requested. The page is fully responsive for both PC and mobile, includes a well-designed logo, and has functional contact forms set up with PHP mail. He followed all instructions carefully, ensuring a clean and professional result—highly recommended!",
    img: nurzholImg,
  },
  {
    name: "David Krejci",
    project: "Chart AI app",
    date: "Apr 10, 2025 - Jul 23, 2025",
    rating: 5.0,
    text: "It was great working with this freelancer and completed the app in flutter successfully with pretty clean code and gave me all instructions for me to understand it. Would recommend.",
    img: davidImg,
  },
  {
    name: "Calagon Ventures",
    project: "Frontend Developer",
    date: "Aug 21, 2025 - Oct 9, 2025",
    rating: 5.0,
    text: "It's been a real pleasure working with you! Everything was handled professionally, efficiently, and with great communication throughout the process. We'll definitely reach out again once we start a new project. Highly recommended!",
    img: clientImg,
  },
  {
    name: "George Balch",
    project: "Android App Testing",
    date: "Jun 8, 2025 - Jun 8, 2025",
    rating: 5.0,
    text: "Great work!",
    img: georgeImg,
  }
];

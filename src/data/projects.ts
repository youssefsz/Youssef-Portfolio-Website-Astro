/**
 * Projects Data - Single source of truth for all projects
 * Used by both the homepage preview and the full projects page
 */
import type { ImageMetadata } from 'astro';

// Import project images for Astro optimization
import invoxImage from '../assets/services/invox.png';
import pdfImage from '../assets/services/pdf.png';
import speedInsightImage from '../assets/services/speed-insight.png';
import planGptImage from '../assets/services/plan-gpt.png';
import apostropheImage from '../assets/services/apostrophe.png';
import chartAiImage from '../assets/services/chart-ai.png';
import humidscanImage from '../assets/services/humidscan.png';
import uptimeImage from '../assets/services/uptime.png';
import githubExtractorImage from '../assets/services/github-extractor.png';
import allerSnapImage from '../assets/services/allersnap.png';
import quickQuoteImage from '../assets/services/quickquote.png';
import gitReadImage from '../assets/services/gitread.png';

export interface Project {
    title: string;
    description: string;
    category: string;
    image: ImageMetadata;
    link?: string;
    slug?: string;
}

export const projects: Project[] = [
    {
        title: "Invox",
        description:
            "Create and send professional invoices in seconds. Manage clients, items, and track payments with Invoice Maker.",
        category: "Mobile App",
        image: invoxImage,
        link: "https://youssef.tn/invox/",
        slug: "invox",
    },
    {
        title: "Brasserie Restaurant",
        description:
            "Apostrophe Restaurant in Olsene, Belgium offers fine dining with local ingredients.",
        category: "Web Platform",
        image: apostropheImage,
        link: "https://youssef.tn/apostrophe-restaurant",
        slug: "brasserie-restaurant",
    },
    {
        title: "Chart AI",
        description:
            "AI-powered financial chart analysis for smarter, faster trading insights.",
        category: "Mobile App",
        image: chartAiImage,
        link: "https://youssef.tn/ChartAI",
        slug: "chart-ai",
    },
    {
        title: "UPTIME",
        description:
            "Uptime Monitor - Real-time server status monitoring",
        category: "Web Platform",
        image: uptimeImage,
        link: "https://youssef.tn/uptime",
        slug: "uptime",
    },
    {
        title: "HumidScan",
        description:
            "Smart assistant for detecting and preventing humidity. Uses AI to protect your home from mold and water damage.",
        category: "Mobile App",
        image: humidscanImage,
        link: "https://youssef.tn/HumidScan",
        slug: "humidscan",
    },
    {
        title: "SpeedInsight Website",
        description:
            "Test your website’s speed and performance with detailed Core Web Vitals insights via Google PageSpeed API.",
        category: "Web Platform",
        image: speedInsightImage,
        link: "https://speed-insight.youssef.tn/",
        slug: "speed-insight",
    },
    {
        title: "PlanGPT",
        description:
            "Transform simple prompts into powerful, detailed instructions for AI. Access curated templates and enhance your AI workflow.",
        category: "Mobile App",
        image: planGptImage,
        link: "https://youssef.tn/plangpt/",
        slug: "plangpt",
    },
    {
        title: "PDF Tools",
        description:
            "Every tool you need to work with PDFs. Convert, compress, and edit your PDF files with ease. Fast, secure, and completely free.",
        category: "Web Platform",
        image: pdfImage,
        link: "https://pdf-tools.youssef.tn/",
        slug: "pdf-tools",
    },
    {
        title: "AllerSnap",
        description:
            "AI allergen detector for meals. Snap a photo or scan a barcode to spot allergens, track history, and see nutrition instantly.",
        category: "Mobile App",
        image: allerSnapImage,
        link: "https://allersnap.com/",
        slug: "allersnap",
    },
    {
        title: "GitHub Stats Extractor",
        description:
            "Explore GitHub stats by username, with contribution graphs and repository insights.",
        category: "Web Platform",
        image: githubExtractorImage,
        link: "https://youssef.tn/git-hub-stats-extractor",
        slug: "github-stats-extractor",
    },
    {
        title: "QuickQuoteTN",
        description:
            "QuickQuote lets you discover, save, and share favorite quotes, with daily inspiration from a beautifully designed collection.",
        category: "Mobile App",
        image: quickQuoteImage,
        link: "https://youssef.tn/quickquote",
        slug: "quickquote",
    },
    {
        title: "GitRead",
        description:
            "Turn your CV into a polished GitHub README with AI, highlighting your skills and experience.",
        category: "Web Platform",
        image: gitReadImage,
        link: "https://youssef.tn/gitread",
        slug: "gitread",
    },
];

// Maximum projects to show on homepage
export const MAX_HOMEPAGE_PROJECTS = 3;

/**
 * Services Data - Single source of truth for all services
 * Used by both the homepage preview and the full services page
 */
import type { ImageMetadata } from 'astro';

// Import service images for Astro optimization
import invoxImage from '../assets/services/invox.png';
import pdfImage from '../assets/services/pdf.png';
import speedInsightImage from '../assets/services/speed-insight.png';
import planGptImage from '../assets/services/plan-gpt.png';

export interface Service {
    title: string;
    description: string;
    category: string;
    image: ImageMetadata;
    link?: string;
    slug?: string;
}

export const services: Service[] = [
    {
        title: "Invox",
        description:
            "A mobile invoicing app for freelancers and small businesses. Create professional invoices, manage clients, and keep your data backed up in the cloud securely.",
        category: "Mobile App",
        image: invoxImage,
        link: "https://youssef.tn/invox/",
        slug: "invox",
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
            "Free online PDF tools to convert, compress, and edit your PDF files. Convert PDFs to images, extract text, merge documents, and more. Fast, secure, and completely free.",
        category: "Web Platform",
        image: pdfImage,
        link: "https://pdf-tools.youssef.tn/",
        slug: "pdf-tools",
    },
    /*
    {
        title: "Speed Insight",
        description:
            "Test your website performance with Google PageSpeed Insights API. Get detailed insights into Core Web Vitals and optimization recommendations.",
        category: "Web Platform",
        image: speedInsightImage,
        link: "https://speed-insight.youssef.tn/",
        slug: "speed-insight",
    },
    */
];

// Maximum services to show on homepage
export const MAX_HOMEPAGE_SERVICES = 6;

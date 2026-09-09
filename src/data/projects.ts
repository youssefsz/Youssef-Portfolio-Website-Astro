/**
 * Projects Data - Single source of truth for all projects
 * Used by both the homepage preview and the full projects page
 */
import type { ImageMetadata } from 'astro';

// Import project images for Astro optimization
import invoxImage from '../assets/projects/invox.png';
import velocareImage from '../assets/projects/velocare.png';
import pdfImage from '../assets/projects/pdf.png';
import speedInsightImage from '../assets/projects/speed-insight.png';
import planGptImage from '../assets/projects/plan-gpt.png';
import apostropheImage from '../assets/projects/apostrophe.png';
import widgetAiImage from '../assets/projects/WIdgetAI.webp';
import chartAiImage from '../assets/projects/chart-ai.png';
import humidscanImage from '../assets/projects/humidscan.png';
import uptimeImage from '../assets/projects/uptime.png';
import productTrackerImage from '../assets/projects/product-tracker.webp';
import githubExtractorImage from '../assets/projects/github-extractor.png';
import allerSnapImage from '../assets/projects/allersnap.png';
import gitReadImage from '../assets/projects/gitread.png';
import sysMonitorImage from '../assets/projects/sys-monitor.png';
import quranlakeImage from '../assets/projects/quranlake.png';
import docscannerImage from '../assets/projects/docscanner.png';
import mkvPlayerImage from '../assets/projects/mkv-player-macos.png';
import urlxImage from '../assets/projects/urlx.png';
import ecommerceStoreImage from '../assets/projects/ecommerce-store.png';

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
        title: "VeloCare AI",
        description:
            "AI-assisted bike checks, maintenance planning, and GPS ride tracking in one native app for iPhone and iPad.",
        category: "Mobile App",
        image: velocareImage,
        link: "https://ridekept.com/ai-bike-maintenance-app/",
        slug: "velocare-ai",
    },
    {
        title: "WidgetAI",
        description:
            "AI website widgets made simple. Control your assistant behavior, design, and placement with a single script tag.",
        category: "Web Platform",
        image: widgetAiImage,
        link: "https://widgetai.youssef.tn/",
        slug: "widget-ai",
    },
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
        title: "Product Tracker",
        description:
            "Track products, monitor stock levels, and review sales activity from a clean operational dashboard.",
        category: "Web Platform",
        image: productTrackerImage,
        link: "https://product-tracker.youssef.tn/",
        slug: "product-tracker",
    },
    {
        title: "DocScanner",
        description:
            "Scan, enhance, and organize your documents in seconds with a fast and clean mobile scanning experience.",
        category: "Mobile App",
        image: docscannerImage,
        link: "https://youssef.tn/DocScanner/",
        slug: "docscanner",
    },
    {
        title: "Brasserie Restaurant",
        description:
            "Restaurant website for Apostrophe in Olsene, Belgium, showcasing fine dining, seasonal menus, and local ingredients.",
        category: "Website",
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
        title: "PDF Tools",
        description:
            "Every tool you need to work with PDFs. Convert, compress, and edit your PDF files with ease. Fast, secure, and completely free.",
        category: "Web Platform",
        image: pdfImage,
        link: "https://pdf-tools.youssef.tn/",
        slug: "pdf-tools",
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
        title: "Quran Lake",
        description:
            "Discover accurate prayer times and stream Quran recitations with the Quran Lake app.",
        category: "Mobile App",
        image: quranlakeImage,
        link: "https://youssef.tn/quranlake/",
        slug: "quran-lake",
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
        title: "PlanGPT",
        description:
            "Transform simple prompts into powerful, detailed instructions for AI. Access curated templates and enhance your AI workflow.",
        category: "Mobile App",
        image: planGptImage,
        link: "https://youssef.tn/plangpt/",
        slug: "plangpt",
    },
    {
        title: "URLX",
        description:
            "Free, focused URL tools for shortening links, generating QR codes, cleaning URLs, inspecting metadata, and converting webpages.",
        category: "Web Platform",
        image: urlxImage,
        link: "https://urlx.tn/",
        slug: "urlx",
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
        title: "E-Commerce Store",
        description:
            "A multilingual e-commerce storefront with product search, category browsing, advanced filters, pagination, and shopping bag functionality.",
        category: "Web Platform",
        image: ecommerceStoreImage,
        link: "https://e-commerce.dhibi.tn/",
        slug: "ecommerce-store",
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
        title: "MKV Player",
        description:
            "A focused, native macOS video player built with AppKit and libmpv, with hardware-accelerated playback for MKV and other common formats.",
        category: "macOS App",
        image: mkvPlayerImage,
        link: "https://youssefsz.github.io/mkv-player-macos/",
        slug: "mkv-player-macos",
    },
    {
        title: "sys-monitor",
        description:
            "A fast, minimal terminal system monitor built with Rust. Real-time CPU, memory, and process monitoring with a clean, keyboard-driven interface.",
        category: "CLI Tool",
        image: sysMonitorImage,
        link: "https://sys-monitor.youssef.tn/",
        slug: "sys-monitor",
    },
];

// Maximum projects to show on homepage
export const MAX_HOMEPAGE_PROJECTS = 6;

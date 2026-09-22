import type { APIRoute } from "astro";
import { projects } from "../data/projects";

export const prerender = true;

export const GET: APIRoute = () => new Response(`# Youssef Dhibi

> Portfolio of Youssef Dhibi, a full-stack developer in Tunisia who builds web, mobile, desktop, and CLI applications for clients worldwide.

## English

- [Portfolio](https://youssef.tn/): Profile, selected projects, skills, experience, education, client testimonials, and contact details.
- [All projects](https://youssef.tn/projects/): Complete catalog of ${projects.length} web, mobile, desktop, and CLI projects.

## Français

- [Portfolio en français](https://youssef.tn/fr/): Profil, projets, compétences, expérience, formation, témoignages clients et coordonnées.
- [Tous les projets](https://youssef.tn/fr/projects/): Catalogue complet de ${projects.length} projets web, mobiles, de bureau et en ligne de commande.

## Extended content

- [Complete agent-readable content](https://youssef.tn/llms-full.txt): Combined English and French portfolio content.
`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Signal": "ai-train=yes, search=yes, ai-input=yes" } });

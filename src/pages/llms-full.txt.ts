import type { APIRoute } from "astro";
import { buildHomeMarkdown, buildProjectsMarkdown } from "../lib/agentMarkdown";

export const prerender = true;

export const GET: APIRoute = () => new Response([
  buildHomeMarkdown("en"),
  "\n\n---\n\n",
  buildProjectsMarkdown("en"),
  "\n\n---\n\n",
  buildHomeMarkdown("fr"),
  "\n\n---\n\n",
  buildProjectsMarkdown("fr"),
].join(""), { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Signal": "ai-train=yes, search=yes, ai-input=yes" } });

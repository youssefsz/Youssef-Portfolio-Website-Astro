import type { APIRoute } from "astro";
import { buildProjectsMarkdown, markdownResponse } from "../../../lib/agentMarkdown";

export const prerender = true;
export const GET: APIRoute = () => markdownResponse(buildProjectsMarkdown("fr"));

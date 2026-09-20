import type { APIRoute } from "astro";
import { buildHomeMarkdown, markdownResponse } from "../../lib/agentMarkdown";

export const prerender = true;
export const GET: APIRoute = () => markdownResponse(buildHomeMarkdown("en"));

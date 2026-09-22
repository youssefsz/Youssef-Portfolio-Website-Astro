import type { Locale } from "../i18n/content";
import { getExperience, getProjects, getSkills, getTestimonials, siteContent } from "../i18n/content";

const contact = {
  email: "dhibi.ywsf@gmail.com",
  phone: "+216 27 084 318",
  upwork: "https://www.upwork.com/freelancers/youssefsz",
  github: "https://github.com/youssefsz",
  linkedin: "https://www.linkedin.com/in/youssefsz",
};

export function buildHomeMarkdown(locale: Locale) {
  const t = siteContent[locale];
  const projects = getProjects(locale).slice(0, 6);
  const skills = getSkills(locale);
  const timeline = getExperience(locale);
  const testimonials = getTestimonials(locale);
  const fr = locale === "fr";

  return `---
title: "${t.title}"
description: "${t.description}"
canonical: "https://youssef.tn${t.homePath}"
language: "${locale}"
author: "Youssef Dhibi"
---

# Youssef Dhibi

${t.description}

## ${fr ? "Services et profil" : "Services and profile"}

- ${t.jobTitle} ${fr ? "basé en Tunisie" : "based in Tunisia"}
- ${fr ? "Applications web, mobiles, de bureau et outils en ligne de commande" : "Web, mobile, desktop, and CLI applications"}
- Top Rated Plus ${fr ? "sur Upwork avec 100 % de réussite" : "on Upwork with 100% Job Success"}

## ${t.sections.projectsBottom}

${projects.map((project) => `### [${project.title}](${project.link})\n\n${project.description}\n\n**${project.category}**`).join("\n\n")}

[${t.showAll}](https://youssef.tn${t.projectsPath})

## ${t.sections.skillsBottom}

${skills.map((group) => `- **${group.category}:** ${group.items.map((item) => item.name).join(", ")}`).join("\n")}

## ${t.sections.experienceLabel}

${timeline.experience.map((item) => `### ${item.title}, ${item.company}\n\n${item.date}. ${item.description}${item.stats ? `\n\n${item.stats.map((stat) => `${stat.value} ${stat.label}`).join("; ")}.` : ""}`).join("\n\n")}

## ${t.sections.educationLabel}

${timeline.education.map((item) => `### ${item.degree}, ${item.school}\n\n${item.date}.${item.description ? ` ${item.description}` : ""}`).join("\n\n")}

## ${t.sections.testimonialsBottom}

${t.testimonialDialog.translation ? `${t.testimonialDialog.translation}\n\n` : ""}${testimonials.map((item) => `> ${item.text}\n>\n> ${item.name}, ${item.project} (${item.rating}/5)`).join("\n\n")}

## ${fr ? "Contact et profils vérifiables" : "Contact and verifiable profiles"}

- Email: [${contact.email}](mailto:${contact.email})
- Phone: [${contact.phone}](tel:+21627084318)
- [Upwork](${contact.upwork})
- [GitHub](${contact.github})
- [LinkedIn](${contact.linkedin})
`;
}

export function buildProjectsMarkdown(locale: Locale) {
  const t = siteContent[locale];
  const projects = getProjects(locale);
  return `---
title: "${t.allProjects.title}"
description: "${t.allProjects.description}"
canonical: "https://youssef.tn${t.projectsPath}"
language: "${locale}"
author: "Youssef Dhibi"
---

# ${t.allProjects.top} ${t.allProjects.bottom}

${t.allProjects.intro}

${projects.map((project) => `## [${project.title}](${project.link})\n\n${project.description}\n\n**${project.category}**`).join("\n\n")}

[${t.allProjects.back}](https://youssef.tn${t.homePath})
`;
}

export function markdownResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
      "Vary": "Accept",
    },
  });
}

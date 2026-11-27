import { education, experience } from "../data/experience";
import { projectCategoryGroups, projects } from "../data/projects";
import type { Project, ProjectGroup } from "../data/projects";
import { skills } from "../data/skills";
import { testimonials } from "../data/testimonials";

export type Locale = "en" | "fr";

export const siteContent = {
  en: {
    title: "Youssef Dhibi | Freelance Software Engineer in Tunisia",
    description: "Tunisian freelance software engineer and full-stack developer building websites, mobile apps, desktop applications, SaaS and custom business software.",
    socialTitle: "Youssef Dhibi | Full-Stack Software Engineer",
    socialDescription: "Freelance software engineer based in Tunisia. I build web, mobile and desktop applications for clients worldwide. Top Rated Plus on Upwork.",
    socialImageAlt: "Youssef Dhibi’s portfolio homepage with his name and portrait",
    jobTitle: "Freelance Full-Stack Software Engineer",
    homePath: "/",
    projectsPath: "/projects/",
    nav: ["Home", "Projects"],
    languageLabel: "Français",
    languageSwitch: "EN FR: switch to French",
    heroIntro: "I'm a freelance full-stack software engineer in Tunisia. I build web, mobile and desktop apps, internal tools and CLIs.",
    heroUpwork: "on",
    heroSuccessPrefix: " with ",
    jobSuccess: "100% Job Success",
    upworkProfileLabel: "View Youssef Dhibi's Upwork profile",
    portraitAlt: "Portrait of Youssef Dhibi",
    location: "Based in Tunisia",
    viewWork: "View My Work",
    scroll: "Scroll",
    resume: {
      button: "View My Resume",
      title: "Choose a resume",
      description: "Select the language you prefer.",
      close: "Close resume dialog",
      english: "English Version",
      french: "French Version",
      format: "PDF Format",
      ukFlag: "United Kingdom flag",
      franceFlag: "France flag",
    },
    testimonialDialog: {
      open: "Read the full testimonial from {name}",
      close: "Close testimonial",
      rating: "Rated {rating} out of 5",
      translation: "",
    },
    sections: {
      projectsTop: "My",
      projectsBottom: "Projects",
      projectsIntro: "A selection of my work, including a website feedback tool, an online store and mobile apps for invoicing and fitness.",
      skillsTop: "My",
      skillsBottom: "Skills",
      skillsIntro: "The languages and tools I use for web, mobile, desktop and command-line development.",
      experienceTop: "Experience &",
      experienceBottom: "Education",
      experienceIntro: "My professional journey and academic background.",
      experienceLabel: "Experience",
      educationLabel: "Education",
      viewProfile: "View Profile",
      testimonialsTop: "Client",
      testimonialsBottom: "Testimonials",
      testimonialsIntro: "What my clients say about working with me.",
      contactTop: "Get In",
      contactBottom: "Touch",
      contactIntro: "Ready to get started? Reach out through any of these channels.",
    },
    cards: { viewProject: "View Project", learnMore: "Learn More" },
    showAll: "Show All Projects",
    more: "more",
    contact: {
      email: "Email",
      phone: "Phone",
      visitProfile: "Visit Profile",
      copyEmail: "Copy email address",
      copyPhone: "Copy phone number",
      emailAddress: "Email address",
      phoneNumber: "Phone number",
    },
    allProjects: {
      title: "Software Development Projects | Youssef Dhibi",
      description: "Browse websites, mobile and desktop apps, inventory software and command-line tools built by Youssef Dhibi, a freelance developer in Tunisia.",
      back: "Back to Home",
      heading: "All Projects",
      intro: "Browse the websites, mobile and desktop apps, and command-line tools I've built, including custom software for managing stock and sales.",
      catalog: "Project catalog",
      search: "Search projects",
      filterLabel: "Project type",
      filters: { all: "All", web: "Web", mobile: "Mobile", desktop: "Desktop", cli: "CLI" } satisfies Record<"all" | ProjectGroup, string>,
      count: { one: "{count} project", other: "{count} projects" },
      clearFilters: "Clear filters",
      noResults: "No matching projects",
      noResultsHint: "Try another search or choose a different project type.",
    },
    footerRights: "All rights reserved.",
    sourceCode: "Open Source",
    scrollTop: "Scroll to top",
    translatedTestimonials: false,
  },
  fr: {
    title: "Youssef Dhibi | Ingénieur logiciel freelance en Tunisie",
    description: "Ingénieur logiciel freelance et développeur full-stack tunisien. Je crée des sites web, des applications mobiles et de bureau, des SaaS et des logiciels métier sur mesure.",
    socialTitle: "Youssef Dhibi | Ingénieur logiciel full-stack",
    socialDescription: "Ingénieur logiciel freelance basé en Tunisie. Je développe des applications web, mobiles et de bureau pour des clients du monde entier. Top Rated Plus sur Upwork.",
    socialImageAlt: "Page d’accueil du portfolio de Youssef Dhibi avec son nom et son portrait",
    jobTitle: "Ingénieur logiciel full-stack freelance",
    homePath: "/fr/",
    projectsPath: "/fr/projects/",
    nav: ["Accueil", "Projets"],
    languageLabel: "English",
    languageSwitch: "EN FR : passer en anglais",
    heroIntro: "Ingénieur logiciel full-stack freelance en Tunisie, je développe des applications web, mobiles et de bureau, des outils internes et des outils en ligne de commande.",
    heroUpwork: "sur",
    heroSuccessPrefix: ", avec ",
    jobSuccess: "100 % de réussite",
    upworkProfileLabel: "Voir le profil Upwork de Youssef Dhibi",
    portraitAlt: "Portrait de Youssef Dhibi",
    location: "Basé en Tunisie",
    viewWork: "Voir mes projets",
    scroll: "Défiler",
    resume: {
      button: "Voir mon CV",
      title: "Choisir un CV",
      description: "Sélectionnez la langue de votre choix.",
      close: "Fermer la fenêtre du CV",
      english: "Version anglaise",
      french: "Version française",
      format: "Format PDF",
      ukFlag: "Drapeau du Royaume-Uni",
      franceFlag: "Drapeau de la France",
    },
    testimonialDialog: {
      open: "Lire le témoignage complet de {name}",
      close: "Fermer le témoignage",
      rating: "Note : {rating} sur 5",
      translation: "Témoignage traduit de l’anglais.",
    },
    sections: {
      projectsTop: "Mes",
      projectsBottom: "Projets",
      projectsIntro: "Parmi mes projets, un outil pour recueillir des retours sur des sites web, une boutique en ligne et des applications mobiles de facturation et de suivi sportif.",
      skillsTop: "Mes",
      skillsBottom: "Compétences",
      skillsIntro: "Les langages et outils que j’utilise pour développer sur le web, sur mobile, sur ordinateur et en ligne de commande.",
      experienceTop: "Expérience et",
      experienceBottom: "Formation",
      experienceIntro: "Mon parcours professionnel et ma formation.",
      experienceLabel: "Expérience",
      educationLabel: "Formation",
      viewProfile: "Voir le profil",
      testimonialsTop: "Témoignages",
      testimonialsBottom: "Clients",
      testimonialsIntro: "Ce que mes clients disent de notre collaboration. Témoignages traduits de l’anglais.",
      contactTop: "Me",
      contactBottom: "Contacter",
      contactIntro: "Vous avez un projet ? Contactez-moi par le canal qui vous convient.",
    },
    cards: { viewProject: "Voir le projet", learnMore: "En savoir plus" },
    showAll: "Voir tous les projets",
    more: "autres",
    contact: {
      email: "E-mail",
      phone: "Téléphone",
      visitProfile: "Voir le profil",
      copyEmail: "Copier l’adresse e-mail",
      copyPhone: "Copier le numéro de téléphone",
      emailAddress: "Adresse e-mail",
      phoneNumber: "Numéro de téléphone",
    },
    allProjects: {
      title: "Projets de développement logiciel | Youssef Dhibi",
      description: "Sites web, applications mobiles et de bureau, logiciels de gestion de stock et outils en ligne de commande par Youssef Dhibi, développeur freelance en Tunisie.",
      back: "Retour à l’accueil",
      heading: "Tous mes projets",
      intro: "Mes sites web, applications mobiles et de bureau, et outils en ligne de commande, dont un logiciel sur mesure pour gérer les stocks et les ventes.",
      catalog: "Catalogue des projets",
      search: "Rechercher des projets",
      filterLabel: "Type de projet",
      filters: { all: "Tous", web: "Web", mobile: "Mobile", desktop: "Bureau", cli: "Terminal" } satisfies Record<"all" | ProjectGroup, string>,
      count: { one: "{count} projet", other: "{count} projets" },
      clearFilters: "Effacer les filtres",
      noResults: "Aucun projet trouvé",
      noResultsHint: "Essayez une autre recherche ou changez de type de projet.",
    },
    footerRights: "Tous droits réservés.",
    sourceCode: "Code source",
    scrollTop: "Retour en haut",
    translatedTestimonials: true,
  },
} as const;

const projectTranslations: Record<string, Pick<Project, "description" | "imageAlt"> & { category: string }> = {
  "looks-done": { description: "Transformez les commentaires laissés directement sur un site en tâches accompagnées d’une capture d’écran et d’informations sur le navigateur.", category: "Plateforme web", imageAlt: "Page d’accueil de LooksDone avec son titre et sa démonstration de révision d’un site web." },
  "fitness-tracker": { description: "Notez vos répétitions, vos charges et vos séries chronométrées hors ligne. Retrouvez votre historique et vos records personnels sans créer de compte.", category: "Application mobile", imageAlt: "Écran de progression de Fitness Tracker à côté d’un graphique de résultats fictifs." },
  "local-chat": { description: "Échangez des messages, des liens et du code entre ordinateurs sur le même réseau local. Disponible sur macOS, Windows et Linux.", category: "Application de bureau", imageAlt: "Fenêtre de Local Chat avec la liste des salons et une conversation contenant un extrait de code." },
  relay: { description: "Modèle de page de présentation interactive pour un produit d’automatisation, avec des animations et un exemple de processus automatisé.", category: "Modèle de site web", imageAlt: "Page d’accueil de Relay avec son titre sur une grande fleur rouge." },
  "the-daily-good": { description: "Concept de site éditorial pour une lettre d’information, avec un journal et un formulaire d’inscription simulé.", category: "Concept de site web", imageAlt: "Page d’accueil de The Daily Good avec son titre sur une photo de bureau ensoleillé." },
  "velocare-ai": { description: "Contrôles de vélo assistés par IA, planification de l’entretien et suivi GPS des sorties dans une application native pour iPhone et iPad.", category: "Application mobile", imageAlt: "Contrôle du vélo et carte GPS d’une sortie sur deux écrans de VeloCare AI." },
  "widget-ai": { description: "Des widgets IA simples à intégrer. Le comportement, le design et l’emplacement de l’assistant se configurent avec une seule balise script.", category: "Plateforme web", imageAlt: "Page d’accueil de WidgetAI avec un bouton pour créer un widget." },
  invox: { description: "Créez et envoyez des factures professionnelles en quelques secondes, gérez vos clients et suivez les paiements.", category: "Application mobile", imageAlt: "Aperçu et liste des factures sur deux écrans d’Invox." },
  "product-tracker": { description: "Suivez les produits, les niveaux de stock et l’activité commerciale depuis un tableau de bord clair.", category: "Plateforme web", imageAlt: "Tableau de bord de Product Tracker avec chiffres de stock et graphique des ventes." },
  docscanner: { description: "Numérisez, améliorez et organisez vos documents en quelques secondes avec une application mobile rapide et épurée.", category: "Application mobile", imageAlt: "Écrans de DocScanner avec des documents numérisés et des miniatures de pages." },
  "brasserie-restaurant": { description: "Site du restaurant Apostrophe à Olsene, en Belgique, présentant sa cuisine, ses menus de saison et ses produits locaux.", category: "Site web", imageAlt: "Page d’accueil du restaurant Apostrophe sur une photo du bâtiment et de sa terrasse." },
  "chart-ai": { description: "Analyse de graphiques financiers assistée par IA pour obtenir plus rapidement des informations utiles au trading.", category: "Application mobile", imageAlt: "Écrans de Chart AI pour importer un graphique et analyser les niveaux de prix." },
  "pdf-tools": { description: "Une suite gratuite et sécurisée pour convertir, compresser et modifier facilement des fichiers PDF.", category: "Plateforme web", imageAlt: "Catalogue PDF Tools avec des outils de conversion, de compression et de modification." },
  humidscan: { description: "Assistant intelligent pour détecter et prévenir l’humidité, les moisissures et les dégâts des eaux dans la maison.", category: "Application mobile", imageAlt: "Écran d’accueil de HumidScan et rapport d’humidité avec photo." },
  "speed-insight": { description: "Analysez la vitesse et les Core Web Vitals d’un site grâce à l’API Google PageSpeed.", category: "Plateforme web", imageAlt: "Page d’accueil de SpeedInsight avec un champ pour l’URL du site à tester." },
  "quran-lake": { description: "Consultez des horaires de prière précis et écoutez des récitations du Coran.", category: "Application mobile", imageAlt: "Accueil de Quran Lake et horaires des prières sur deux écrans." },
  "github-stats-extractor": { description: "Explorez les statistiques d’un profil GitHub, ses contributions et ses dépôts.", category: "Plateforme web", imageAlt: "Page d’accueil de GitHub Stats Extractor avec un champ pour le nom d’utilisateur." },
  plangpt: { description: "Transformez de simples demandes en instructions détaillées pour l’IA grâce à des modèles prêts à l’emploi.", category: "Application mobile", imageAlt: "Éditeur de prompts et bibliothèque de modèles sur deux écrans de PlanGPT." },
  urlx: { description: "Des outils gratuits pour raccourcir des liens, créer des QR codes, nettoyer des URL et inspecter des métadonnées.", category: "Plateforme web", imageAlt: "Catalogue URLX avec des outils pour raccourcir des liens, créer des codes QR et nettoyer des URL." },
  "ecommerce-store": { description: "Boutique en ligne multilingue avec recherche, catégories, filtres avancés, pagination et panier.", category: "Plateforme web", imageAlt: "Catalogue de vêtements avec filtres par catégorie et grille de photos produits." },
  uptime: { description: "Surveillance en temps réel de la disponibilité et de l’état des serveurs.", category: "Plateforme web", imageAlt: "Tableau de bord Uptime avec l’historique de disponibilité des services suivis." },
  "mkv-player-macos": { description: "Lecteur vidéo macOS natif conçu avec AppKit et libmpv, avec accélération matérielle pour les fichiers MKV et d’autres formats courants.", category: "Application macOS", imageAlt: "Page d’accueil de MKV Player avec un aperçu de la fenêtre du lecteur macOS." },
  "sys-monitor": { description: "Moniteur système rapide et minimal conçu en Rust pour suivre en temps réel le processeur, la mémoire et les processus dans le terminal.", category: "Outil en ligne de commande", imageAlt: "Page d’accueil de sys-monitor avec une commande d’installation dans le terminal." },
};

export function getProjects(locale: Locale) {
  return projects.map((project) => ({
    ...project,
    ...(locale === "fr" && project.slug ? projectTranslations[project.slug] : {}),
    group: projectCategoryGroups[project.category],
  }));
}

export function getSkills(locale: Locale) {
  if (locale === "en") return skills;
  const labels = ["Langages de programmation", "Frameworks et bibliothèques frontend", "Frameworks et bibliothèques backend", "Bases de données", "Outils et plateformes", "Matériel et IoT"];
  return skills.map((category, index) => ({ ...category, category: labels[index] }));
}

export function getExperience(locale: Locale) {
  if (locale === "en") return { experience, education };
  return {
    experience: [
      { ...experience[0], date: "Mars 2025 - aujourd’hui", title: "Freelance sur Upwork", company: "Développement full-stack et intégrations IA", description: "Conception et livraison de produits web, mobiles, de bureau et en ligne de commande pour des clients du monde entier.", stats: [{ value: "19", label: "Missions terminées" }, { value: "100 %", label: "Réussite" }, { value: "5,0★", label: "Note client" }] },
      { ...experience[1], date: "Août 2025 - sept. 2025", title: "Stage bancaire", description: "Participation aux processus bancaires numériques et découverte pratique des technologies financières et des systèmes bancaires modernes." },
    ],
    education: [
      { ...education[0], date: "Sept. 2024 - aujourd’hui", degree: "Licence en informatique", description: "Formation en systèmes d’exploitation, paradigmes de programmation, algorithmes et génie logiciel." },
      { ...education[1], date: "Sept. 2023 - juin 2024", degree: "Baccalauréat en informatique", school: "Lycée Houcine Bouzaiene de Gafsa (L.H.B.G)", stats: [{ value: "15,32/20", label: "Moyenne" }, { value: "623/6004", label: "Classement (top 10 %)" }] },
    ],
  };
}

const testimonialTranslations: Record<string, { project: string; date: string; text: string }> = {
  "Berni Cortvriend": { project: "Site web de restaurant", date: "11 sept. 2025 - 16 oct. 2025", text: "Honnêtement, je n’ai rien de négatif à dire sur Youssef. Il écoute attentivement mes demandes et cherche à les mettre en œuvre. Quand un élément ne correspond pas à ce que je souhaite, il le modifie sans difficulté et sans frais supplémentaires. Si vous cherchez encore un bon développeur web, c’est la personne qu’il vous faut !" },
  "Joseph Kim": { project: "Plateforme d’annotation pour l’IA", date: "28 juin 2025 - aujourd’hui", text: "Il développe et déploie très rapidement des plateformes dans le domaine de l’intelligence artificielle. Si vous souhaitez créer un prototype dans les meilleurs délais, n’hésitez pas à le consulter. Son niveau d’expertise est très élevé." },
  "Aiden Samuel": { project: "Détecteur d’allergies par IA", date: "27 juin 2025 - aujourd’hui", text: "Excellent développeur ! Très professionnel, il comprend rapidement les besoins et a livré un code propre et efficace avant l’échéance. La communication a été excellente tout au long du projet. Je recommande vivement de travailler avec lui." },
  "Nurzhol Tabigat": { project: "Création d’une page de présentation", date: "30 mars 2025 - 1 avr. 2025", text: "Youssef Dhibi a réalisé un excellent travail et livré une page de présentation de grande qualité, exactement comme demandé. La page s’adapte parfaitement aux ordinateurs et aux mobiles, comprend un logo soigné et des formulaires de contact fonctionnels en PHP. Il a suivi toutes les consignes avec attention pour produire un résultat propre et professionnel. Je le recommande vivement !" },
  "David Krejci": { project: "Application Chart AI", date: "10 avr. 2025 - 23 juil. 2025", text: "Ce fut un plaisir de travailler avec ce freelance. Il a terminé l’application Flutter avec succès, avec un code très propre, et m’a fourni toutes les explications nécessaires pour la comprendre. Je le recommande." },
  "Calagon Ventures": { project: "Développement frontend", date: "21 août 2025 - 9 oct. 2025", text: "Ce fut un vrai plaisir de travailler avec vous ! Tout a été géré avec professionnalisme, efficacité et une excellente communication. Nous reprendrons certainement contact au lancement d’un nouveau projet. Vivement recommandé !" },
  "George Balch": { project: "Test d’application Android", date: "8 juin 2025", text: "Excellent travail !" },
};

export function getTestimonials(locale: Locale) {
  if (locale === "en") return testimonials;
  return testimonials.map((testimonial) => ({ ...testimonial, ...testimonialTranslations[testimonial.name] }));
}

export type TestimonialDialogLabels = (typeof siteContent)[Locale]["testimonialDialog"];

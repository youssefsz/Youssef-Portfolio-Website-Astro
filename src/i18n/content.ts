import { education, experience } from "../data/experience";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { testimonials } from "../data/testimonials";

export type Locale = "en" | "fr";

export const siteContent = {
  en: {
    title: "Youssef Dhibi | Full-Stack Developer",
    description: "Youssef Dhibi is a full-stack developer in Tunisia building web, mobile, desktop, and CLI applications. Top Rated Plus on Upwork with 100% Job Success.",
    jobTitle: "Full-Stack Developer",
    homePath: "/",
    projectsPath: "/projects/",
    alternateHomePath: "/fr/",
    alternateProjectsPath: "/fr/projects/",
    nav: ["Home", "Projects", "Skills", "Experience", "Testimonials", "Contact"],
    menu: "Menu",
    closeMenu: "Close menu",
    toggleMenu: "Toggle menu",
    exploreProjects: "Explore Projects",
    letsTalk: "Let's Talk",
    languageLabel: "Français",
    languageSwitch: "EN FR: switch to French",
    heroHello: "Hello, I'm",
    heroIntro: "I build full-stack applications across web, mobile, desktop, and CLI.",
    heroUpwork: "on",
    jobSuccess: "100% Job Success",
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
      projectsIntro: "A collection of mobile and web applications built for impact. Click any project to learn more.",
      skillsTop: "My",
      skillsBottom: "Skills",
      skillsIntro: "A comprehensive toolkit I use to build high-quality software solutions.",
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
      title: "All Projects | Youssef Dhibi",
      description: "Explore web, mobile, desktop, and CLI applications built by Youssef Dhibi with a focus on performance, usability, and reliable software.",
      back: "Back to Home",
      count: "Projects Available",
      top: "All",
      bottom: "Projects",
      intro: "A showcase of my work in mobile and web development. Browse the complete catalog.",
      catalog: "Project catalog",
    },
    footerRights: "All rights reserved.",
    sourceCode: "Open Source",
    scrollTop: "Scroll to top",
    translatedTestimonials: false,
  },
  fr: {
    title: "Youssef Dhibi | Développeur full-stack",
    description: "Youssef Dhibi est un développeur full-stack en Tunisie. Il conçoit des applications web, mobiles, de bureau et des outils en ligne de commande. Top Rated Plus sur Upwork avec 100 % de réussite.",
    jobTitle: "Développeur full-stack",
    homePath: "/fr/",
    projectsPath: "/fr/projects/",
    alternateHomePath: "/",
    alternateProjectsPath: "/projects/",
    nav: ["Accueil", "Projets", "Compétences", "Expérience", "Témoignages", "Contact"],
    menu: "Menu",
    closeMenu: "Fermer le menu",
    toggleMenu: "Ouvrir le menu",
    exploreProjects: "Voir les projets",
    letsTalk: "Me contacter",
    languageLabel: "English",
    languageSwitch: "EN FR : passer en anglais",
    heroHello: "Bonjour, je suis",
    heroIntro: "Je conçois des applications full-stack pour le web, le mobile, les ordinateurs et la ligne de commande.",
    heroUpwork: "sur",
    jobSuccess: "100 % de réussite",
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
      projectsIntro: "Une sélection d’applications web et mobiles conçues pour répondre à des besoins concrets. Ouvrez un projet pour en savoir plus.",
      skillsTop: "Mes",
      skillsBottom: "Compétences",
      skillsIntro: "Les technologies que j’utilise pour concevoir des logiciels fiables et soignés.",
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
      title: "Tous les projets | Youssef Dhibi",
      description: "Découvrez les applications web, mobiles, de bureau et en ligne de commande conçues par Youssef Dhibi, avec une attention particulière portée à la performance et à la fiabilité.",
      back: "Retour à l’accueil",
      count: "projets disponibles",
      top: "Tous mes",
      bottom: "Projets",
      intro: "Découvrez l’ensemble de mes projets web et mobiles.",
      catalog: "Catalogue des projets",
    },
    footerRights: "Tous droits réservés.",
    sourceCode: "Code source",
    scrollTop: "Retour en haut",
    translatedTestimonials: true,
  },
} as const;

const projectTranslations: Record<string, { description: string; category: string }> = {
  "velocare-ai": { description: "Contrôles de vélo assistés par IA, planification de l’entretien et suivi GPS des sorties dans une application native pour iPhone et iPad.", category: "Application mobile" },
  "widget-ai": { description: "Des widgets IA simples à intégrer. Le comportement, le design et l’emplacement de l’assistant se configurent avec une seule balise script.", category: "Plateforme web" },
  invox: { description: "Créez et envoyez des factures professionnelles en quelques secondes, gérez vos clients et suivez les paiements.", category: "Application mobile" },
  "product-tracker": { description: "Suivez les produits, les niveaux de stock et l’activité commerciale depuis un tableau de bord clair.", category: "Plateforme web" },
  docscanner: { description: "Numérisez, améliorez et organisez vos documents en quelques secondes avec une application mobile rapide et épurée.", category: "Application mobile" },
  "brasserie-restaurant": { description: "Site du restaurant Apostrophe à Olsene, en Belgique, présentant sa cuisine, ses menus de saison et ses produits locaux.", category: "Site web" },
  "chart-ai": { description: "Analyse de graphiques financiers assistée par IA pour obtenir plus rapidement des informations utiles au trading.", category: "Application mobile" },
  "pdf-tools": { description: "Une suite gratuite et sécurisée pour convertir, compresser et modifier facilement des fichiers PDF.", category: "Plateforme web" },
  humidscan: { description: "Assistant intelligent pour détecter et prévenir l’humidité, les moisissures et les dégâts des eaux dans la maison.", category: "Application mobile" },
  "speed-insight": { description: "Analysez la vitesse et les Core Web Vitals d’un site grâce à l’API Google PageSpeed.", category: "Plateforme web" },
  "quran-lake": { description: "Consultez des horaires de prière précis et écoutez des récitations du Coran.", category: "Application mobile" },
  "github-stats-extractor": { description: "Explorez les statistiques d’un profil GitHub, ses contributions et ses dépôts.", category: "Plateforme web" },
  plangpt: { description: "Transformez de simples demandes en instructions détaillées pour l’IA grâce à des modèles prêts à l’emploi.", category: "Application mobile" },
  urlx: { description: "Des outils gratuits pour raccourcir des liens, créer des QR codes, nettoyer des URL et inspecter des métadonnées.", category: "Plateforme web" },
  allersnap: { description: "Détecteur d’allergènes assisté par IA : prenez un repas en photo ou scannez un code-barres pour identifier les risques.", category: "Application mobile" },
  "ecommerce-store": { description: "Boutique en ligne multilingue avec recherche, catégories, filtres avancés, pagination et panier.", category: "Plateforme web" },
  gitread: { description: "Transformez votre CV en README GitHub professionnel avec l’IA, en mettant en valeur vos compétences et votre expérience.", category: "Plateforme web" },
  uptime: { description: "Surveillance en temps réel de la disponibilité et de l’état des serveurs.", category: "Plateforme web" },
  "mkv-player-macos": { description: "Lecteur vidéo macOS natif conçu avec AppKit et libmpv, avec accélération matérielle pour les fichiers MKV et d’autres formats courants.", category: "Application macOS" },
  "sys-monitor": { description: "Moniteur système rapide et minimal conçu en Rust pour suivre en temps réel le processeur, la mémoire et les processus dans le terminal.", category: "Outil en ligne de commande" },
};

export function getProjects(locale: Locale) {
  if (locale === "en") return projects;
  return projects.map((project) => ({ ...project, ...(project.slug ? projectTranslations[project.slug] : {}) }));
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

export const WHATSAPP_NUMBER = "+5215512345678";
export const EMAIL_CONTACT = "info@hastial.com";
export const PROJECTS_EMAIL = "proyectos@hastial.com";
export const COMPANY_ADDRESS = {
  street: "Av. Insurgentes Sur 1457",
  colonia: "Col. Insurgentes Mixcoac",
  city: "Ciudad de México",
  zipCode: "CP 03920"
};
export const PHONE_NUMBER = "+52 (55) 1234 5678";
export const OFFICE_HOURS = "Lun - Vie: 9:00 - 18:00";
export const COMPANY_FOUNDING_YEAR = 2008;
export const YEARS_OF_EXPERIENCE = new Date().getFullYear() - COMPANY_FOUNDING_YEAR;

export const STATS = [
  { id: 1, count: 150, label: "stats.completedProjects" },
  { id: 2, count: YEARS_OF_EXPERIENCE, label: "stats.yearsExperience" },
  { id: 3, count: 95, label: "stats.satisfiedClients" },
  { id: 4, count: 32, label: "stats.designAwards" }
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Ing. Carlos Martínez",
    title: "team.engineerTitle",
    description: "team.engineerDescription",
    experience: "team.engineerExperience",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "Arq. Miguel Hernández",
    title: "team.architectTitle",
    description: "team.architectDescription",
    experience: "team.architectExperience",
    social: {
      linkedin: "#",
      instagram: "#"
    }
  }
];

export const SERVICES = [
  {
    id: 1,
    icon: "home",
    title: "services.residential.title",
    description: "services.residential.description",
    features: [
      "services.residential.features.1",
      "services.residential.features.2",
      "services.residential.features.3"
    ]
  },
  {
    id: 2,
    icon: "building",
    title: "services.commercial.title",
    description: "services.commercial.description",
    features: [
      "services.commercial.features.1",
      "services.commercial.features.2",
      "services.commercial.features.3"
    ]
  },
  {
    id: 3,
    icon: "compass",
    title: "services.architectural.title",
    description: "services.architectural.description",
    features: [
      "services.architectural.features.1",
      "services.architectural.features.2",
      "services.architectural.features.3"
    ]
  }
];

export const PORTFOLIO_CATEGORIES = [
  { id: "all", label: "portfolio.filters.all" },
  { id: "remodelacion", label: "portfolio.filters.remodeling" },
  { id: "construccion", label: "portfolio.filters.construction" },
  { id: "diseno", label: "portfolio.filters.design" }
];

export const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "portfolio.projects.kitchen.title",
    description: "portfolio.projects.kitchen.description",
    category: "remodelacion",
    imageSrc: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    detailLink: "#",
    beforeAfterLink: "#"
  },
  {
    id: 2,
    title: "portfolio.projects.residence.title",
    description: "portfolio.projects.residence.description",
    category: "construccion",
    imageSrc: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    detailLink: "#",
    galleryLink: "#"
  },
  {
    id: 3,
    title: "portfolio.projects.interior.title",
    description: "portfolio.projects.interior.description",
    category: "diseno",
    imageSrc: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    detailLink: "#",
    galleryLink: "#"
  },
  {
    id: 4,
    title: "portfolio.projects.bathroom.title",
    description: "portfolio.projects.bathroom.description",
    category: "remodelacion",
    imageSrc: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    detailLink: "#",
    beforeAfterLink: "#"
  },
  {
    id: 5,
    title: "portfolio.projects.commercial.title",
    description: "portfolio.projects.commercial.description",
    category: "construccion",
    imageSrc: "https://images.unsplash.com/photo-1486744328743-c1323312f676?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    detailLink: "#",
    galleryLink: "#"
  },
  {
    id: 6,
    title: "portfolio.projects.architectural.title",
    description: "portfolio.projects.architectural.description",
    category: "diseno",
    imageSrc: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    detailLink: "#",
    galleryLink: "#"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    text: "testimonials.1.text",
    author: {
      name: "Laura Méndez",
      initials: "LM",
      position: "testimonials.1.position"
    }
  },
  {
    id: 2,
    rating: 5,
    text: "testimonials.2.text",
    author: {
      name: "Roberto Guzmán",
      initials: "RG",
      position: "testimonials.2.position"
    }
  },
  {
    id: 3,
    rating: 4.5,
    text: "testimonials.3.text",
    author: {
      name: "Carmen Soto",
      initials: "CS",
      position: "testimonials.3.position"
    }
  }
];

export const CONTACT_SERVICE_OPTIONS = [
  { value: "default", label: "contact.form.serviceSelect.default" },
  { value: "remodelacion", label: "contact.form.serviceSelect.remodeling" },
  { value: "construccion", label: "contact.form.serviceSelect.construction" },
  { value: "diseno", label: "contact.form.serviceSelect.design" },
  { value: "otro", label: "contact.form.serviceSelect.other" }
];

export const SOCIAL_LINKS = {
  facebook: "#",
  instagram: "#",
  pinterest: "#",
  linkedin: "#"
};

export const FOOTER_LINKS = {
  quickLinks: [
    { href: "#inicio", label: "footer.quickLinks.home" },
    { href: "#acerca", label: "footer.quickLinks.about" },
    { href: "#servicios", label: "footer.quickLinks.services" },
    { href: "#portafolio", label: "footer.quickLinks.portfolio" },
    { href: "#contacto", label: "footer.quickLinks.contact" }
  ],
  services: [
    { href: "#", label: "footer.services.residential" },
    { href: "#", label: "footer.services.commercial" },
    { href: "#", label: "footer.services.architectural" },
    { href: "#", label: "footer.services.interior" },
    { href: "#", label: "footer.services.sustainable" }
  ],
  legal: [
    { href: "#", label: "footer.legal.privacy" },
    { href: "#", label: "footer.legal.terms" }
  ]
};

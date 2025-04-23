export type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export interface Team {
  id: number;
  name: string;
  title: string;
  description: string;
  experience: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface PortfolioCategory {
  id: string;
  label: string;
}

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  detailLink: string;
  beforeAfterLink?: string;
  galleryLink?: string;
}

export interface Testimonial {
  id: number;
  rating: number;
  text: string;
  author: {
    name: string;
    initials: string;
    position: string;
  };
}

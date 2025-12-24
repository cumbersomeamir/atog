export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceType: 'sale' | 'rent';
  rentPeriod?: 'yearly' | 'monthly' | 'weekly' | 'daily';
  type: 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'studio' | 'duplex' | 'land' | 'commercial';
  status: 'ready' | 'off-plan' | 'under-construction';
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: 'sqft' | 'sqm';
  location: {
    city: string;
    area: string;
    building?: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  features: string[];
  amenities: string[];
  agent: Agent;
  developer?: Developer;
  verified: boolean;
  featured: boolean;
  premium: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  whatsapp?: string;
  avatar: string;
  agency?: Agency;
  bio: string;
  languages: string[];
  specializations: string[];
  propertiesCount: number;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  superAgent: boolean;
  experience: number;
  responseTime: string;
  soldProperties: number;
  activeListings: number;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage?: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  agentsCount: number;
  propertiesCount: number;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  premium: boolean;
  established: number;
}

export interface Developer {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  projectsCount: number;
  completedProjects: number;
  established: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  developer: Developer;
  location: {
    city: string;
    area: string;
    address: string;
  };
  priceFrom: number;
  priceTo: number;
  completionDate: string;
  status: 'upcoming' | 'under-construction' | 'ready';
  propertyTypes: string[];
  unitSizes: {
    min: number;
    max: number;
  };
  images: string[];
  amenities: string[];
  paymentPlan?: string;
  featured: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  readTime: number;
  publishedAt: string;
  featured: boolean;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  city: string;
  description: string;
  image: string;
  propertiesForSale: number;
  propertiesForRent: number;
  averageSalePrice: number;
  averageRentPrice: number;
  highlights: string[];
  nearbyAreas: string[];
}

export interface Transaction {
  id: string;
  propertyType: string;
  transactionType: 'sale' | 'rent';
  price: number;
  area: string;
  size: number;
  date: string;
}

export interface SearchFilters {
  purpose: 'buy' | 'rent';
  location: string;
  propertyType: string;
  status: 'all' | 'ready' | 'off-plan';
  bedroomsMin: number | null;
  bedroomsMax: number | null;
  bathroomsMin: number | null;
  bathroomsMax: number | null;
  priceMin: number | null;
  priceMax: number | null;
  areaMin: number | null;
  areaMax: number | null;
  amenities: string[];
  keywords: string;
}


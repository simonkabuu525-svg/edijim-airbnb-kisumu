export interface Property {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  estate: string;
  landmark: string;
  propertyType: 'Studio' | '1 Bedroom' | '2 Bedroom' | 'Penthouse';
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rating: number;
  reviewCount: number;
  pricePlaceholderText: string;
  indicativeRangeKes: string;
  images: string[];
  featured: boolean;
  amenities: string[];
  description: string;
  highlights: string[];
  houseRules: string[];
  squareMeters: number;
}

export interface Review {
  id: string;
  author: string;
  isLocalGuide?: boolean;
  guideDetails?: string;
  rating: number;
  date: string;
  content: string;
  stayType?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  excerpt: string;
  content: {
    sectionTitle: string;
    paragraphs: string[];
    subsections?: {
      title: string;
      body: string[];
    }[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export type PageView = 'home' | 'apartments' | 'location' | 'blogs' | 'blog-detail' | 'contact';

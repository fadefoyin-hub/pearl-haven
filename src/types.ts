export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Necklaces' | 'Earrings' | 'Bracelets' | 'Rings' | 'Watches' | 'Sets' | 'Gifts';
  collection: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  currency: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  materials: string[];
  colors: string[];
  sizes?: string[];
  stockQuantity: number;
  sku: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  bestsellerFlag: boolean;
  newArrivalFlag: boolean;
  featuredFlag: boolean;
  careInstructions: string;
}

export interface CartItem extends Product {
  quantity: number;
}

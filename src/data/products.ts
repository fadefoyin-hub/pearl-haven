import { Product } from '../types';

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  const categories = [
    { name: 'Necklaces', count: 8, prefix: 'Necklace' },
    { name: 'Earrings', count: 8, prefix: 'Earrings' },
    { name: 'Rings', count: 8, prefix: 'Ring' },
    { name: 'Bracelets', count: 8, prefix: 'Bracelet' },
    { name: 'Watches', count: 6, prefix: 'Watch' },
    { name: 'Sets', count: 6, prefix: 'Set' },
    { name: 'Gifts', count: 4, prefix: 'Gift' },
  ] as const;

  const adjectives = ['Golden', 'Midnight', 'Royal', 'Velvet', 'Eternal', 'Luminous', 'Celestial', 'Radiant', 'Crystal', 'Pearl', 'Diamond', 'Sapphire'];
  const nouns = ['Aura', 'Luxe', 'Glow', 'Spark', 'Charm', 'Dream', 'Whisper', 'Grace', 'Elegance', 'Bloom', 'Tear', 'Heart'];

  let idCounter = 1;

  categories.forEach((cat) => {
    for (let i = 0; i < cat.count; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const name = `${adj} ${noun} ${cat.prefix}`;
      const price = Math.floor(Math.random() * 150000) + 20000; // 20k to 170k NGN
      const hasDiscount = Math.random() > 0.7;
      const discountPercentage = hasDiscount ? Math.floor(Math.random() * 20) + 10 : undefined;
      const oldPrice = hasDiscount ? Math.floor(price / (1 - discountPercentage! / 100)) : undefined;

      products.push({
        id: `sg-${idCounter.toString().padStart(4, '0')}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        category: cat.name,
        collection: ['Everyday Glam', 'Luxury Essentials', 'Bridal Collection', 'Statement Pieces'][Math.floor(Math.random() * 4)],
        price,
        oldPrice,
        discountPercentage,
        currency: '₦',
        images: [
          `https://picsum.photos/seed/${name.replace(/\s+/g, '')}1/800/1000`,
          `https://picsum.photos/seed/${name.replace(/\s+/g, '')}2/800/1000`,
          `https://picsum.photos/seed/${name.replace(/\s+/g, '')}3/800/1000`,
        ],
        shortDescription: `Elevate your style with the ${name}, a masterpiece of elegance and craftsmanship.`,
        fullDescription: `The ${name} is designed for the modern woman who appreciates timeless beauty. Crafted with precision and care, this piece adds a touch of sophistication to any outfit. Whether you're attending a gala or enjoying a casual brunch, its radiant finish ensures you always stand out.`,
        materials: ['18k Gold Plated', 'Sterling Silver', 'Cubic Zirconia', 'Freshwater Pearl'].sort(() => 0.5 - Math.random()).slice(0, 2),
        colors: ['Gold', 'Silver', 'Rose Gold'].sort(() => 0.5 - Math.random()).slice(0, 2),
        sizes: cat.name === 'Rings' ? ['6', '7', '8', '9'] : cat.name === 'Necklaces' ? ['16"', '18"', '20"'] : undefined,
        stockQuantity: Math.floor(Math.random() * 50) + 5,
        sku: `SG-${cat.name.substring(0, 3).toUpperCase()}-${idCounter.toString().padStart(4, '0')}`,
        rating: Number((Math.random() * 1 + 4).toFixed(1)), // 4.0 to 5.0
        reviewCount: Math.floor(Math.random() * 150) + 5,
        tags: ['elegant', 'luxury', 'gift', 'wedding', 'everyday'].sort(() => 0.5 - Math.random()).slice(0, 3),
        bestsellerFlag: Math.random() > 0.8,
        newArrivalFlag: Math.random() > 0.8,
        featuredFlag: Math.random() > 0.9,
        careInstructions: 'Avoid contact with water, perfumes, and lotions. Store in the provided Pearl Haven pouch when not in use. Clean with a soft, dry cloth.',
      });
      idCounter++;
    }
  });

  return products;
};

export const products = generateProducts();

export const getFeaturedProducts = () => products.filter(p => p.featuredFlag).slice(0, 8);
export const getNewArrivals = () => products.filter(p => p.newArrivalFlag).slice(0, 8);
export const getBestSellers = () => products.filter(p => p.bestsellerFlag).slice(0, 8);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Collections() {
  const collections = [
    {
      name: 'Bridal Collection',
      desc: 'Elegant pieces for your special day. Timeless beauty that lasts forever.',
      image: 'https://picsum.photos/seed/bridal/1200/800',
      category: 'Sets'
    },
    {
      name: 'Everyday Glam',
      desc: 'Subtle yet striking jewelry designed for daily wear and effortless style.',
      image: 'https://picsum.photos/seed/everyday/1200/800',
      category: 'Earrings'
    },
    {
      name: 'Luxury Essentials',
      desc: 'The foundation of any jewelry wardrobe. Classic, versatile, and premium.',
      image: 'https://picsum.photos/seed/essentials/1200/800',
      category: 'Necklaces'
    },
    {
      name: 'Statement Pieces',
      desc: 'Bold, eye-catching designs meant to turn heads and spark conversations.',
      image: 'https://picsum.photos/seed/statement/1200/800',
      category: 'Rings'
    }
  ];

  return (
    <div className="bg-cream-ivory min-h-screen py-10 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-deep-charcoal mb-4">Our Collections</h1>
          <div className="w-16 h-0.5 bg-primary-gold mx-auto mb-6" />
          <p className="text-deep-charcoal/70 max-w-2xl mx-auto">
            Explore our thoughtfully curated collections, each telling a unique story of elegance and craftsmanship.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {collections.map((collection, index) => (
            <div key={collection.name} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}>
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden bg-soft-beige/20 group">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-deep-charcoal mb-4">{collection.name}</h2>
                <p className="text-deep-charcoal/80 leading-relaxed mb-8 max-w-md">
                  {collection.desc}
                </p>
                <Link
                  to={`/shop?category=${collection.category}`}
                  className="inline-flex items-center text-sm font-medium uppercase tracking-wider text-deep-charcoal hover:text-primary-gold transition-colors border-b border-deep-charcoal hover:border-primary-gold pb-1 self-start"
                >
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

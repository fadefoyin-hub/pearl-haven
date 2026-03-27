import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Gem, Truck, Clock, Instagram } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { getBestSellers, getNewArrivals } from '../data/products';

export default function Home() {
  const bestSellers = getBestSellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  const categories = [
    { name: 'Necklaces', image: 'https://picsum.photos/seed/necklaces/600/800' },
    { name: 'Earrings', image: 'https://picsum.photos/seed/earrings/600/800' },
    { name: 'Rings', image: 'https://picsum.photos/seed/rings/600/800' },
    { name: 'Bracelets', image: 'https://picsum.photos/seed/bracelets/600/800' },
  ];

  const features = [
    { icon: <Gem size={32} />, title: 'Premium Quality', desc: 'Crafted with the finest materials for lasting brilliance.' },
    { icon: <ShieldCheck size={32} />, title: 'Secure Payments', desc: '100% secure checkout with multiple payment options.' },
    { icon: <Truck size={32} />, title: 'Fast Delivery', desc: 'Nationwide delivery with tracking on all orders.' },
    { icon: <Clock size={32} />, title: '24/7 Support', desc: 'Our dedicated team is here to assist you anytime.' },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/jewelryhero/1920/1080"
            alt="Luxury Jewelry"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-deep-charcoal/40 mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-cream-ivory">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="block text-sm md:text-base uppercase tracking-[0.3em] text-primary-gold mb-4 font-medium"
          >
            Pearl Haven
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 max-w-4xl mx-auto leading-tight"
          >
            Timeless Elegance, Crafted for Your Glow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto text-soft-beige"
          >
            Shop premium jewelry pieces that elevate your style and confidence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="px-8 py-4 bg-primary-gold text-white text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-deep-charcoal transition-colors w-full sm:w-auto"
            >
              Shop Now
            </Link>
            <Link
              to="/collections"
              className="px-8 py-4 bg-transparent border border-cream-ivory text-cream-ivory text-sm font-medium uppercase tracking-widest hover:bg-cream-ivory hover:text-deep-charcoal transition-colors w-full sm:w-auto"
            >
              View Collections
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-32 bg-cream-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-deep-charcoal mb-4">Shop by Category</h2>
            <div className="w-16 h-0.5 bg-primary-gold mx-auto" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name}`}
                className="group relative aspect-[3/4] overflow-hidden block"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl md:text-2xl font-serif text-cream-ivory mb-2">{category.name}</h3>
                  <span className="text-xs text-primary-gold uppercase tracking-widest font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Explore <ArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-deep-charcoal mb-4">Best Sellers</h2>
              <div className="w-16 h-0.5 bg-primary-gold" />
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-sm font-medium uppercase tracking-wider text-deep-charcoal hover:text-primary-gold transition-colors">
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center text-sm font-medium uppercase tracking-wider text-deep-charcoal hover:text-primary-gold transition-colors border-b border-deep-charcoal pb-1">
              View All Best Sellers
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-24 relative overflow-hidden bg-soft-beige/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary-gold text-sm font-medium uppercase tracking-widest mb-4 block">Limited Time Offer</span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-deep-charcoal mb-6 leading-tight">
              Get 10% Off Your First Order
            </h2>
            <p className="text-deep-charcoal/70 mb-10 max-w-xl mx-auto">
              Join the Pearl Haven family and enjoy exclusive access to new arrivals, special promotions, and styling tips.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 bg-white border border-soft-beige focus:outline-none focus:border-primary-gold text-sm transition-colors"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-widest hover:bg-primary-gold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-cream-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-deep-charcoal mb-4">New Arrivals</h2>
            <div className="w-16 h-0.5 bg-primary-gold mx-auto" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white border-t border-soft-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-soft-beige/30 flex items-center justify-center text-primary-gold mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-serif font-medium text-deep-charcoal mb-3">{feature.title}</h3>
                <p className="text-sm text-deep-charcoal/70 leading-relaxed max-w-xs mx-auto">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-20 bg-cream-ivory overflow-hidden">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-deep-charcoal mb-4">@pearlhaven</h2>
          <p className="text-deep-charcoal/70">Follow us on Instagram for daily inspiration</p>
        </div>
        
        <div className="flex w-full overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar gap-4 px-4 md:px-0 md:grid md:grid-cols-5 md:gap-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <a
              key={i}
              href="#"
              className="relative group block min-w-[250px] md:min-w-0 aspect-square overflow-hidden snap-center"
            >
              <img
                src={`https://picsum.photos/seed/insta${i}/600/600`}
                alt={`Instagram post ${i}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-deep-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram size={32} className="text-white" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

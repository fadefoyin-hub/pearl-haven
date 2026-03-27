import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const { wishlist } = useStore();

  return (
    <div className="bg-cream-ivory min-h-screen py-10 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-deep-charcoal mb-4">Your Wishlist</h1>
          <div className="w-16 h-0.5 bg-primary-gold mx-auto mb-6" />
          <p className="text-deep-charcoal/70 max-w-2xl mx-auto">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-soft-beige/30 flex items-center justify-center text-primary-gold mb-6">
              <Heart size={32} />
            </div>
            <h2 className="text-2xl font-serif font-medium text-deep-charcoal mb-4">Your wishlist is empty</h2>
            <p className="text-deep-charcoal/70 mb-8 max-w-md mx-auto">
              Save your favorite pieces here to easily find them later or share with someone special.
            </p>
            <Link
              to="/shop"
              className="px-8 py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
            >
              Discover Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

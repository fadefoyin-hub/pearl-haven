import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    if (isWishlisted) {
      toast('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-soft-beige/20 mb-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.newArrivalFlag && (
            <span className="bg-white text-deep-charcoal text-[10px] font-bold uppercase tracking-wider px-2 py-1 shadow-sm">
              New
            </span>
          )}
          {product.bestsellerFlag && (
            <span className="bg-primary-gold text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 shadow-sm">
              Best Seller
            </span>
          )}
          {product.discountPercentage && (
            <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-deep-charcoal hover:text-primary-gold hover:bg-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          aria-label="Toggle wishlist"
        >
          <Heart size={16} className={cn(isWishlisted && "fill-primary-gold text-primary-gold")} />
        </button>

        {/* Images */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={`${product.name} alternate view`}
          className="w-full h-full object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105 group-hover:scale-100"
        />

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 w-full p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white/90 backdrop-blur-sm text-deep-charcoal text-xs font-medium uppercase tracking-wider py-3 flex items-center justify-center gap-2 hover:bg-primary-gold hover:text-white transition-colors shadow-sm"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center px-2">
        <h3 className="font-serif text-deep-charcoal text-lg mb-1 group-hover:text-primary-gold transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm">
          {product.oldPrice && (
            <span className="text-deep-charcoal/40 line-through">
              {product.currency}{product.oldPrice.toLocaleString()}
            </span>
          )}
          <span className={cn("font-medium", product.oldPrice ? "text-red-500" : "text-deep-charcoal")}>
            {product.currency}{product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

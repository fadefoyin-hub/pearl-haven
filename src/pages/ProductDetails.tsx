import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight, Minus, Plus, Star, Gem } from 'lucide-react';
import { getProductBySlug, getProductsByCategory } from '../data/products';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');
  const { addToCart, toggleWishlist, wishlist } = useStore();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif font-medium text-deep-charcoal mb-4">Product Not Found</h2>
        <p className="text-deep-charcoal/70 mb-8">The jewelry piece you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (isWishlisted) {
      toast('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="bg-cream-ivory min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-deep-charcoal/60 mb-8">
          <Link to="/" className="hover:text-primary-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-primary-gold transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary-gold transition-colors">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-deep-charcoal truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto hide-scrollbar md:w-24 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative aspect-[3/4] w-20 md:w-full overflow-hidden shrink-0 transition-all",
                    selectedImage === idx ? "ring-1 ring-primary-gold" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className={cn("w-full h-full object-center", product.name === 'Mini Zirconia set' ? 'object-contain bg-white' : 'object-cover')} />
                </button>
              ))}
            </div>
            <div className="relative aspect-[3/4] w-full bg-soft-beige/20 overflow-hidden group">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImage]}
                alt={product.name}
                className={cn(
                  "w-full h-full object-center cursor-zoom-in transition-transform duration-500 group-hover:scale-110",
                  product.name === 'Mini Zirconia set' ? 'object-contain bg-white' : 'object-cover'
                )}
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.newArrivalFlag && (
                  <span className="bg-white text-deep-charcoal text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 shadow-sm">
                    New
                  </span>
                )}
                {product.bestsellerFlag && (
                  <span className="bg-primary-gold text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 shadow-sm">
                    Best Seller
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-deep-charcoal mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-primary-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-primary-gold" : "fill-transparent"} />
                  ))}
                  <span className="text-sm text-deep-charcoal/60 ml-2">({product.reviewCount} reviews)</span>
                </div>
                <span className="text-sm text-deep-charcoal/40">|</span>
                <span className="text-sm text-deep-charcoal/60">SKU: {product.sku}</span>
              </div>
              <div className="flex items-center gap-3 text-2xl font-serif">
                {product.oldPrice && (
                  <span className="text-deep-charcoal/40 line-through text-xl">
                    {product.currency}{product.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className={cn("font-medium", product.oldPrice ? "text-red-500" : "text-deep-charcoal")}>
                  {product.currency}{product.price.toLocaleString()}
                </span>
                {product.discountPercentage && (
                  <span className="text-xs font-sans font-bold uppercase tracking-wider bg-red-100 text-red-600 px-2 py-1 ml-2">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            <p className="text-deep-charcoal/80 leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium uppercase tracking-wider text-deep-charcoal">Size</span>
                    <button className="text-xs text-deep-charcoal/60 underline hover:text-primary-gold">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className="w-12 h-12 border border-soft-beige flex items-center justify-center text-sm hover:border-primary-gold hover:text-primary-gold transition-colors focus:border-primary-gold focus:text-primary-gold"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-3 block">Quantity</span>
                <div className="flex items-center border border-soft-beige w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-deep-charcoal hover:text-primary-gold transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-grow text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-deep-charcoal hover:text-primary-gold transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-grow py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-widest hover:bg-primary-gold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className="p-4 border border-soft-beige text-deep-charcoal hover:border-primary-gold hover:text-primary-gold transition-colors flex items-center justify-center"
                aria-label="Toggle wishlist"
              >
                <Heart size={20} className={cn(isWishlisted && "fill-primary-gold text-primary-gold")} />
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-soft-beige mb-8">
              <div className="flex items-center gap-3 text-sm text-deep-charcoal/80">
                <Truck size={20} className="text-primary-gold" />
                <span>Free delivery over ₦50k</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-deep-charcoal/80">
                <RotateCcw size={20} className="text-primary-gold" />
                <span>14-day easy returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-deep-charcoal/80">
                <ShieldCheck size={20} className="text-primary-gold" />
                <span>1-year warranty</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-deep-charcoal/80">
                <Gem size={20} className="text-primary-gold" />
                <span>Premium packaging</span>
              </div>
            </div>

            {/* Accordion/Tabs */}
            <div className="space-y-4">
              <div className="flex gap-6 border-b border-soft-beige">
                {['description', 'details', 'delivery'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-3 text-sm font-medium uppercase tracking-wider transition-colors relative",
                      activeTab === tab ? "text-primary-gold" : "text-deep-charcoal/60 hover:text-deep-charcoal"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-gold" />
                    )}
                  </button>
                ))}
              </div>
              <div className="py-4 text-sm text-deep-charcoal/80 leading-relaxed min-h-[120px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'description' && (
                    <motion.div
                      key="desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.fullDescription}
                    </motion.div>
                  )}
                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <p><strong>Materials:</strong> {product.materials.join(', ')}</p>
                      <p><strong>Colors:</strong> {product.colors.join(', ')}</p>
                      <p><strong>Collection:</strong> {product.collection}</p>
                      <p className="mt-4"><strong>Care Instructions:</strong><br/>{product.careInstructions}</p>
                    </motion.div>
                  )}
                  {activeTab === 'delivery' && (
                    <motion.div
                      key="delivery"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <p><strong>Standard Delivery:</strong> 3-5 business days (₦2,500)</p>
                      <p><strong>Express Delivery:</strong> 1-2 business days (₦5,000)</p>
                      <p>Free standard delivery on all orders above ₦50,000.</p>
                      <p className="text-xs text-deep-charcoal/60 mt-2">All orders are shipped in our signature Pearl Haven luxury packaging, perfect for gifting.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="py-16 border-t border-soft-beige">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-medium text-deep-charcoal mb-4">You May Also Like</h2>
              <div className="w-16 h-0.5 bg-primary-gold mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

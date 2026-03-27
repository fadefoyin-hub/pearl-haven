import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Watches', 'Sets', 'Gifts'];
const SORTS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Best Selling', value: 'bestselling' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'bestselling':
        result.sort((a, b) => (b.bestsellerFlag ? 1 : 0) - (a.bestsellerFlag ? 1 : 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.newArrivalFlag ? 1 : 0) - (a.newArrivalFlag ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-cream-ivory min-h-screen pt-10 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-deep-charcoal mb-4">
            {selectedCategory === 'All' ? 'The Collection' : selectedCategory}
          </h1>
          <div className="w-16 h-0.5 bg-primary-gold mx-auto mb-6" />
          <p className="text-deep-charcoal/70 max-w-2xl mx-auto">
            Discover our curated selection of premium jewelry pieces, designed to elevate your everyday style and celebrate special moments.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-y border-soft-beige py-4 gap-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-deep-charcoal hover:text-primary-gold transition-colors md:hidden"
          >
            <Filter size={18} />
            Filters
          </button>

          <div className="hidden md:flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'text-primary-gold border-b border-primary-gold pb-1'
                    : 'text-deep-charcoal/60 hover:text-deep-charcoal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <span className="text-sm text-deep-charcoal/60 hidden sm:inline-block">{filteredProducts.length} Products</span>
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border border-soft-beige py-2 pl-4 pr-10 text-sm font-medium uppercase tracking-wider text-deep-charcoal focus:outline-none focus:border-primary-gold cursor-pointer"
              >
                {SORTS.map(sort => (
                  <option key={sort.value} value={sort.value}>{sort.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-deep-charcoal/60" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-full max-w-xs bg-cream-ivory z-50 shadow-2xl p-6 md:hidden overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-serif font-medium text-deep-charcoal">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="text-deep-charcoal hover:text-primary-gold">
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-4">Categories</h4>
                  <div className="space-y-3">
                    {CATEGORIES.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => handleCategoryChange(category)}
                          className="accent-primary-gold w-4 h-4"
                        />
                        <span className="text-sm text-deep-charcoal/80">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-4">Price Range</h4>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full bg-transparent border border-soft-beige px-3 py-2 text-sm focus:outline-none focus:border-primary-gold"
                      placeholder="Min"
                    />
                    <span className="text-deep-charcoal/40">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full bg-transparent border border-soft-beige px-3 py-2 text-sm focus:outline-none focus:border-primary-gold"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
                >
                  Apply Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="mb-10">
                <h4 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-6 border-b border-soft-beige pb-2">Categories</h4>
                <div className="space-y-4">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`block text-sm transition-colors ${
                        selectedCategory === category
                          ? 'text-primary-gold font-medium'
                          : 'text-deep-charcoal/70 hover:text-deep-charcoal'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-6 border-b border-soft-beige pb-2">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-deep-charcoal/40 text-sm">₦</span>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full bg-transparent border border-soft-beige pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-primary-gold"
                      />
                    </div>
                    <span className="text-deep-charcoal/40">-</span>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-deep-charcoal/40 text-sm">₦</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full bg-transparent border border-soft-beige pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-primary-gold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-serif font-medium text-deep-charcoal mb-4">No products found</h3>
                <p className="text-deep-charcoal/70 mb-8">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 200000]);
                  }}
                  className="px-8 py-3 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

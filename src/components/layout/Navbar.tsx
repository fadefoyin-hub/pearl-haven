import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function Navbar() {
  const { cart, wishlist, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const hideLogo = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300 bg-cream-ivory/90 backdrop-blur-md border-b',
        isScrolled ? 'border-soft-beige shadow-sm py-3' : 'border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 -ml-2 text-deep-charcoal hover:text-primary-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-deep-charcoal hover:text-primary-gold transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link
          to="/"
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl font-serif font-bold tracking-tight text-deep-charcoal hover:text-primary-gold transition-colors",
            hideLogo ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          Pearl Haven
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="text-deep-charcoal hover:text-primary-gold transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="text-deep-charcoal hover:text-primary-gold transition-colors relative hidden sm:block">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button className="text-deep-charcoal hover:text-primary-gold transition-colors hidden sm:block">
            <User size={20} />
          </button>
          <button
            className="text-deep-charcoal hover:text-primary-gold transition-colors relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-ivory border-b border-soft-beige overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-serif text-deep-charcoal hover:text-primary-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-6 pt-4 border-t border-soft-beige">
                <button className="flex flex-col items-center text-deep-charcoal hover:text-primary-gold">
                  <Search size={24} />
                  <span className="text-xs mt-1">Search</span>
                </button>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center text-deep-charcoal hover:text-primary-gold relative">
                  <Heart size={24} />
                  <span className="text-xs mt-1">Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 bg-primary-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <button className="flex flex-col items-center text-deep-charcoal hover:text-primary-gold">
                  <User size={24} />
                  <span className="text-xs mt-1">Account</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

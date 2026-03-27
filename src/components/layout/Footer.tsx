import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-deep-charcoal text-cream-ivory pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold tracking-tight text-primary-gold">
              Pearl Haven
            </h3>
            <p className="text-soft-beige text-sm leading-relaxed max-w-xs">
              Luxury You Can Wear. Elevate your style and confidence with our premium, timeless jewelry pieces designed for the modern woman.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-soft-beige hover:text-primary-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-soft-beige hover:text-primary-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-soft-beige hover:text-primary-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-6 text-white uppercase tracking-wider">Shop</h4>
            <ul className="space-y-4 text-sm text-soft-beige">
              <li><Link to="/shop?category=Necklaces" className="hover:text-primary-gold transition-colors">Necklaces</Link></li>
              <li><Link to="/shop?category=Earrings" className="hover:text-primary-gold transition-colors">Earrings</Link></li>
              <li><Link to="/shop?category=Rings" className="hover:text-primary-gold transition-colors">Rings</Link></li>
              <li><Link to="/shop?category=Bracelets" className="hover:text-primary-gold transition-colors">Bracelets</Link></li>
              <li><Link to="/collections" className="hover:text-primary-gold transition-colors">All Collections</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-6 text-white uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-4 text-sm text-soft-beige">
              <li><Link to="/faq" className="hover:text-primary-gold transition-colors">FAQ & Help</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-gold transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-primary-gold transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/care" className="hover:text-primary-gold transition-colors">Jewelry Care</Link></li>
              <li><Link to="/contact" className="hover:text-primary-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-6 text-white uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm text-soft-beige">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-gold shrink-0 mt-0.5" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-gold shrink-0" />
                <span>+2347013092648</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-gold shrink-0" />
                <a href="mailto:esezoborsophia@gmail.com" className="hover:text-primary-gold transition-colors">
                  esezoborsophia@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-soft-beige/70">
          <p>&copy; {new Date().getFullYear()} Pearl Haven. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, Mail } from 'lucide-react';

export default function OrderConfirmation() {
  const orderNumber = `SG-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="bg-cream-ivory min-h-[80vh] flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white p-8 md:p-12 shadow-sm text-center"
      >
        <div className="w-20 h-20 bg-soft-beige/30 rounded-full flex items-center justify-center mx-auto mb-8 text-primary-gold">
          <CheckCircle2 size={40} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-deep-charcoal mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-deep-charcoal/70 mb-8 max-w-md mx-auto leading-relaxed">
          Your order <strong className="text-deep-charcoal">#{orderNumber}</strong> has been successfully placed. We'll send you an email with your order details and tracking information shortly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-y border-soft-beige py-8">
          <div className="flex flex-col items-center text-center">
            <Mail size={24} className="text-primary-gold mb-3" />
            <h3 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-1">Order Confirmed</h3>
            <p className="text-xs text-deep-charcoal/60">Check your email for details</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Package size={24} className="text-primary-gold mb-3" />
            <h3 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-1">Processing</h3>
            <p className="text-xs text-deep-charcoal/60">We are preparing your items</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Truck size={24} className="text-primary-gold mb-3" />
            <h3 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-1">Shipping</h3>
            <p className="text-xs text-deep-charcoal/60">Usually within 24-48 hours</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="px-8 py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="px-8 py-4 border border-soft-beige text-deep-charcoal text-sm font-medium uppercase tracking-wider hover:border-primary-gold hover:text-primary-gold transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

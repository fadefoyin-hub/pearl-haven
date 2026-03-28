import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-deep-charcoal/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cream-ivory shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-soft-beige">
              <h2 className="text-2xl font-serif font-medium text-deep-charcoal">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-deep-charcoal hover:text-primary-gold transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-soft-beige/30 flex items-center justify-center text-primary-gold">
                    <ShoppingBag size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-medium text-deep-charcoal">Your cart is empty</h3>
                    <p className="text-sm text-deep-charcoal/70 max-w-[250px] mx-auto">
                      Discover our elegant collections and find your next favorite piece.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-3 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-24 h-32 bg-soft-beige/20 overflow-hidden relative">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className={cn(
                            "w-full h-full object-cover object-center transition-transform duration-500",
                            (item.name === 'Knuckle Ring' || item.name === 'Nuckle Rings' || item.name.includes('Knuckle')) ? "scale-125 group-hover:scale-150" : "group-hover:scale-105"
                          )}
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-serif font-medium text-deep-charcoal line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-deep-charcoal/60 mt-1 uppercase tracking-wider">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-deep-charcoal/40 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-soft-beige">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-deep-charcoal hover:text-primary-gold transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-deep-charcoal hover:text-primary-gold transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-medium text-deep-charcoal">
                            {item.currency}{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-soft-beige p-6 bg-cream-ivory/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium uppercase tracking-wider text-deep-charcoal/70">Subtotal</span>
                  <span className="text-xl font-serif font-medium text-deep-charcoal">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-deep-charcoal/60 mb-6 text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lock, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 2500;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-confirmation');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-cream-ivory">
        <h2 className="text-3xl font-serif font-medium text-deep-charcoal mb-4">Your Cart is Empty</h2>
        <p className="text-deep-charcoal/70 mb-8">Add some elegant pieces to proceed to checkout.</p>
        <Link
          to="/shop"
          className="px-8 py-3 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-ivory min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-deep-charcoal/60 mb-8">
          <Link to="/cart" className="hover:text-primary-gold transition-colors">Cart</Link>
          <ChevronRight size={12} />
          <span className={step >= 1 ? "text-deep-charcoal font-medium" : ""}>Information</span>
          <ChevronRight size={12} />
          <span className={step >= 2 ? "text-deep-charcoal font-medium" : ""}>Shipping</span>
          <ChevronRight size={12} />
          <span className={step >= 3 ? "text-deep-charcoal font-medium" : ""}>Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder}>
              {/* Step 1: Contact & Shipping */}
              <div className={`space-y-8 ${step !== 1 && 'hidden'}`}>
                <div>
                  <h2 className="text-2xl font-serif font-medium text-deep-charcoal mb-6">Contact Information</h2>
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold mb-4"
                  />
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="accent-primary-gold w-4 h-4" />
                    <span className="text-sm text-deep-charcoal/80">Email me with news and offers</span>
                  </label>
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-medium text-deep-charcoal mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="First name"
                      required
                      className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      required
                      className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold mb-4"
                  />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="City"
                      required
                      className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold"
                    />
                    <select
                      required
                      className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold appearance-none"
                    >
                      <option value="" disabled selected>State</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="rivers">Rivers</option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold mb-8"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </div>

              {/* Step 2: Shipping Method */}
              <div className={`space-y-8 ${step !== 2 && 'hidden'}`}>
                <div>
                  <h2 className="text-2xl font-serif font-medium text-deep-charcoal mb-6">Shipping Method</h2>
                  <div className="border border-soft-beige rounded-sm overflow-hidden">
                    <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-soft-beige/10 transition-colors border-b border-soft-beige">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" defaultChecked className="accent-primary-gold w-4 h-4" />
                        <span className="text-sm text-deep-charcoal font-medium">Standard Delivery (3-5 Business Days)</span>
                      </div>
                      <span className="text-sm text-deep-charcoal font-medium">₦2,500</span>
                    </label>
                    <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-soft-beige/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" className="accent-primary-gold w-4 h-4" />
                        <span className="text-sm text-deep-charcoal font-medium">Express Delivery (1-2 Business Days)</span>
                      </div>
                      <span className="text-sm text-deep-charcoal font-medium">₦5,000</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-4 border border-soft-beige text-deep-charcoal text-sm font-medium uppercase tracking-wider hover:border-primary-gold hover:text-primary-gold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>

              {/* Step 3: Payment */}
              <div className={`space-y-8 ${step !== 3 && 'hidden'}`}>
                <div>
                  <h2 className="text-2xl font-serif font-medium text-deep-charcoal mb-2">Payment</h2>
                  <p className="text-sm text-deep-charcoal/60 mb-6 flex items-center gap-2">
                    <Lock size={14} /> All transactions are secure and encrypted.
                  </p>
                  
                  <div className="border border-soft-beige rounded-sm overflow-hidden">
                    <label className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-b border-soft-beige ${paymentMethod === 'card' ? 'bg-soft-beige/20' : 'hover:bg-soft-beige/10'}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-primary-gold w-4 h-4"
                        />
                        <span className="text-sm text-deep-charcoal font-medium flex items-center gap-2">
                          <CreditCard size={18} /> Credit / Debit Card
                        </span>
                      </div>
                    </label>
                    
                    <AnimatePresence>
                      {paymentMethod === 'card' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="p-4 bg-soft-beige/10 border-b border-soft-beige space-y-4"
                        >
                          <input
                            type="text"
                            placeholder="Card number"
                            className="w-full bg-white border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Expiration date (MM/YY)"
                              className="w-full bg-white border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold"
                            />
                            <input
                              type="text"
                              placeholder="Security code"
                              className="w-full bg-white border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Name on card"
                            className="w-full bg-white border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <label className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-b border-soft-beige ${paymentMethod === 'transfer' ? 'bg-soft-beige/20' : 'hover:bg-soft-beige/10'}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'transfer'}
                          onChange={() => setPaymentMethod('transfer')}
                          className="accent-primary-gold w-4 h-4"
                        />
                        <span className="text-sm text-deep-charcoal font-medium flex items-center gap-2">
                          <Wallet size={18} /> Bank Transfer
                        </span>
                      </div>
                    </label>

                    <AnimatePresence>
                      {paymentMethod === 'transfer' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="p-4 bg-soft-beige/10 text-sm text-deep-charcoal/80 leading-relaxed"
                        >
                          <p className="mb-2">Please transfer the total amount to the following bank account:</p>
                          <p><strong>Bank:</strong> Zenith Bank</p>
                          <p><strong>Account Name:</strong> Pearl Haven Ltd</p>
                          <p><strong>Account Number:</strong> 1012345678</p>
                          <p className="mt-2 text-xs">Your order will not ship until we receive payment in our account.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-4 border border-soft-beige text-deep-charcoal text-sm font-medium uppercase tracking-wider hover:border-primary-gold hover:text-primary-gold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-2/3 py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <>
                        <Lock size={16} /> Pay ₦{total.toLocaleString()}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-soft-beige/20 p-6 sticky top-24">
              <h3 className="text-xl font-serif font-medium text-deep-charcoal mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 hide-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-white relative shrink-0">
                      <img src={item.images[0]} alt={item.name} className={cn("w-full h-full object-center", item.name === 'Mini Zirconia set' ? "object-contain bg-white" : "object-cover")} />
                      <span className="absolute -top-2 -right-2 bg-deep-charcoal text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="font-serif font-medium text-deep-charcoal text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-deep-charcoal/60 mt-1 uppercase tracking-wider">{item.category}</p>
                      <p className="font-medium text-deep-charcoal text-sm mt-1">
                        {item.currency}{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-y border-soft-beige py-4 space-y-3 mb-4">
                <div className="flex justify-between text-sm text-deep-charcoal/80">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-deep-charcoal/80">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-serif font-medium text-deep-charcoal">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

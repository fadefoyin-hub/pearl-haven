import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse our collections, select the items you love, and add them to your cart. Once you are ready, proceed to checkout, enter your shipping details, and choose your preferred payment method to complete your order.'
  },
  {
    question: 'Do you offer nationwide delivery?',
    answer: 'Yes, we deliver across all states in Nigeria. Standard delivery takes 3-5 business days, while express delivery takes 1-2 business days.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Orders within Lagos typically arrive within 1-2 business days. Orders outside Lagos take 3-5 business days depending on the location. You will receive a tracking link once your order is dispatched.'
  },
  {
    question: 'Do you accept returns?',
    answer: 'We offer a 14-day return policy for items in their original, unworn condition with all tags and packaging intact. Please note that earrings cannot be returned for hygiene reasons unless faulty.'
  },
  {
    question: 'How do I care for my jewelry?',
    answer: 'To keep your Pearl Haven pieces looking their best, avoid contact with water, perfumes, lotions, and harsh chemicals. Store them in the provided pouch or a jewelry box when not in use, and clean gently with a soft, dry cloth.'
  },
  {
    question: 'Can I order through WhatsApp?',
    answer: 'Absolutely! You can send us a message on WhatsApp with the picture or name of the item you want, and our team will assist you with placing the order manually.'
  },
  {
    question: 'Are your products tarnish-resistant?',
    answer: 'Our jewelry is crafted with high-quality materials, including 18k gold plating and sterling silver, designed to resist tarnishing with proper care. Following our care instructions will significantly extend the life and brilliance of your pieces.'
  },
  {
    question: 'Do you offer gift packaging?',
    answer: 'Yes! All Pearl Haven orders come in our signature luxury packaging, making them perfect for gifting. You can also add a personalized gift note during checkout.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-cream-ivory min-h-screen py-10 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-deep-charcoal mb-4">Frequently Asked Questions</h1>
          <div className="w-16 h-0.5 bg-primary-gold mx-auto mb-6" />
          <p className="text-deep-charcoal/70">
            Find answers to common questions about our products, shipping, and returns.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-soft-beige bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-soft-beige/10 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-serif font-medium text-lg text-deep-charcoal pr-8">{faq.question}</span>
                <span className="text-primary-gold shrink-0">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-deep-charcoal/70 leading-relaxed border-t border-soft-beige/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-soft-beige/20 p-8 border border-soft-beige">
          <h3 className="text-xl font-serif font-medium text-deep-charcoal mb-4">Still have questions?</h3>
          <p className="text-deep-charcoal/70 mb-6">
            If you couldn't find the answer you were looking for, our customer care team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

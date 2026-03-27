import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Free Delivery on Orders Above ₦50,000",
  "New Arrivals Just Dropped",
  "Shop Elegant Gifts for Every Occasion"
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-deep-charcoal text-cream-ivory text-xs md:text-sm py-2 px-4 text-center overflow-hidden relative h-8 md:h-9 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full font-medium tracking-wide"
        >
          {messages[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-cream-ivory min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/abouthero/1920/1080"
            alt="About Pearl Haven"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-deep-charcoal/50 mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-cream-ivory">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 max-w-4xl mx-auto"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-light max-w-2xl mx-auto text-soft-beige"
          >
            Pearl Haven is for women who want to feel beautiful, classy, confident, and radiant every day.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-deep-charcoal mb-8">The Essence of Elegance</h2>
            <div className="w-16 h-0.5 bg-primary-gold mx-auto mb-12" />
            
            <div className="space-y-8 text-deep-charcoal/80 leading-relaxed text-lg md:text-xl font-light text-left md:text-center">
              <p>
                Founded with a passion for timeless beauty, Pearl Haven was born from the desire to create jewelry that isn't just worn, but experienced. We believe that every piece of jewelry should tell a story, evoke an emotion, and celebrate the unique radiance of the woman wearing it.
              </p>
              <p>
                Our collections are meticulously curated to blend classic elegance with modern sophistication. From the delicate shimmer of everyday essentials to the breathtaking brilliance of our statement pieces, every item is crafted with premium materials and an unwavering attention to detail.
              </p>
              <p>
                We source only the finest 18k gold plating, sterling silver, and ethically sourced stones to ensure that your Pearl Haven pieces remain as beautiful as the day you first put them on. Luxury, to us, means quality that endures and style that never fades.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mt-24">
            <div className="relative aspect-[3/4] overflow-hidden bg-soft-beige/20">
              <img
                src="https://picsum.photos/seed/craftsmanship/800/1000"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-deep-charcoal mb-6">Our Mission</h3>
              <p className="text-deep-charcoal/80 leading-relaxed mb-6">
                To empower women through accessible luxury. We strive to provide premium, beautifully crafted jewelry that inspires confidence and celebrates individuality, without the traditional luxury markup.
              </p>
              <p className="text-deep-charcoal/80 leading-relaxed">
                Whether you are treating yourself, celebrating a milestone, or finding the perfect gift for someone special, Pearl Haven is here to add a touch of magic to your moments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

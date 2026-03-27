import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-cream-ivory min-h-screen py-10 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-deep-charcoal mb-4">Contact Us</h1>
          <div className="w-16 h-0.5 bg-primary-gold mx-auto mb-6" />
          <p className="text-deep-charcoal/70 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our collections, need styling advice, or require assistance with an order, our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-serif font-medium text-deep-charcoal mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-soft-beige/30 rounded-full flex items-center justify-center text-primary-gold shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-1">Phone & WhatsApp</h3>
                    <p className="text-deep-charcoal/70">+2347013092648</p>
                    <a href="https://wa.me/2347013092648" target="_blank" rel="noreferrer" className="text-primary-gold text-sm hover:underline mt-1 inline-block">
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-soft-beige/30 rounded-full flex items-center justify-center text-primary-gold shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-1">Email</h3>
                    <a href="mailto:esezoborsophia@gmail.com" className="text-deep-charcoal/70 hover:text-primary-gold transition-colors">
                      esezoborsophia@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-soft-beige/30 rounded-full flex items-center justify-center text-primary-gold shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-1">Location</h3>
                    <p className="text-deep-charcoal/70">Lagos, Nigeria</p>
                    <p className="text-xs text-deep-charcoal/50 mt-1">Online Store Only</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-soft-beige/30 rounded-full flex items-center justify-center text-primary-gold shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-deep-charcoal mb-1">Business Hours</h3>
                    <p className="text-deep-charcoal/70">Monday - Friday: 9am - 6pm</p>
                    <p className="text-deep-charcoal/70">Saturday: 10am - 4pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-medium text-deep-charcoal mb-6">Follow Us</h2>
              <a href="#" className="inline-flex items-center gap-2 text-deep-charcoal hover:text-primary-gold transition-colors">
                <Instagram size={24} />
                <span className="font-medium">@pearlhaven</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 shadow-sm border border-soft-beige/50">
            <h2 className="text-2xl font-serif font-medium text-deep-charcoal mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-medium uppercase tracking-wider text-deep-charcoal/70 mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-medium uppercase tracking-wider text-deep-charcoal/70 mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-deep-charcoal/70 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium uppercase tracking-wider text-deep-charcoal/70 mb-2">Subject</label>
                <select
                  id="subject"
                  className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors appearance-none"
                  required
                >
                  <option value="" disabled selected>Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Information</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-deep-charcoal/70 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-transparent border border-soft-beige px-4 py-3 text-sm focus:outline-none focus:border-primary-gold transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-deep-charcoal text-cream-ivory text-sm font-medium uppercase tracking-wider hover:bg-primary-gold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

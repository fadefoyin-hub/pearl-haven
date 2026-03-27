import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnnouncementBar } from './AnnouncementBar';
import { CartDrawer } from '../ui/CartDrawer';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-ivory font-sans text-deep-charcoal">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#FFFDF8',
          color: '#2C2C2C',
          border: '1px solid #E8DCCF',
        },
        className: 'font-sans rounded-none shadow-lg',
      }} />
    </div>
  );
}

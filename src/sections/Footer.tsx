import { Facebook, MessageCircle, Instagram } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/share/18GQgrYbn7/', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://wa.me/2348149946136', label: 'WhatsApp' },
  { icon: Instagram, href: 'https://instagram.com/thepeterstouchmerchants', label: 'Instagram'},
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-navy-primary z-[80] border-t border-white/5 overflow-hidden">
      
      <div className="section-padding py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          
          {/* LEFT: Company Name & Tagline + Logo (as per your sketches) */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-bold text-xl md:text-2xl tracking-tight text-text-primary text-left"
              style={{ fontFamily: 'Space Grotesk, sans-serif'}}
            >
              The Peterstouch Merchants
            </button>
            
            <div className="flex items-center gap-4">
              <p className="text-text-secondary text-sm italic">
                ...visual comfort
              </p>
              <img 
                src="images/logoB.png" 
                alt="Logo" 
                className="w-24 h-auto md:w-32 lg:w-48 object-contain brightness-200 transition-all duration-300"
              />
            </div>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="flex flex-col md:items-center justify-center h-full">
            <nav className="flex flex-wrap gap-4 md:gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* RIGHT: Social Media Icons */}
          <div className="flex md:justify-end items-start">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-cyan-accent hover:bg-cyan-accent/10 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: Copyright & Credits */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-text-secondary/60 text-xs leading-relaxed space-y-2">
            <span className="block mb-2">© 2025 The Peterstouch Merchants. All rights reserved.</span>
            <span className="block">
              <a href='https://haywee39.github.io/tagstechie/' target="_blank" rel="noreferrer" className="hover:text-cyan-accent transition-colors">
                Developer: Tagstechie Solutions
              </a>
            </span>
            <span className="block mt-1">
              <a href='https://wa.me/2349056910840' target="_blank" rel="noreferrer" className="hover:text-cyan-accent transition-colors">
                +234-905-691-0840
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
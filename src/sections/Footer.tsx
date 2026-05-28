import { Facebook, MessageCircle, Instagram, ExternalLink } from 'lucide-react';

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
          
          {/* LEFT: Company Name & Tagline + Logo */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-bold text-xl md:text-2xl tracking-tight text-text-primary text-left focus:outline-none"
              style={{ fontFamily: 'Space Grotesk, sans-serif'}}
              aria-label="Scroll to top"
            >
              The Peterstouch Merchants
            </button>
            
            <div className="flex items-center gap-4">
              <p className="text-text-secondary text-sm italic">
                ...visual comfort
              </p>
              <img 
                src="images/logoB.png" 
                alt="The Peterstouch Merchants Logo" 
                className="w-24 h-auto md:w-32 lg:w-48 object-contain brightness-200 transition-all duration-300"
              />
            </div>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="flex md:justify-center items-center">
            <nav className="flex flex-wrap gap-4 md:gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium focus:outline-none"
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
                  aria-label={`Visit our ${social.label}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: Copyright & Credits */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <div className="text-text-secondary/60 text-xs flex flex-col items-center gap-2">
            <span>© 2025 The Peterstouch Merchants. All rights reserved.</span>
            
            <a 
              href="https://haywee39.github.io/tagstechie/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-cyan-accent transition-colors py-0.5"
            >
              <span>Developer: Tagstechie Solutions</span>
              <ExternalLink size={12} className="shrink-0 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
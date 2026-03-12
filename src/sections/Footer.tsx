import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { PhoneCall } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
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
    <footer className="relative w-full bg-navy-primary z-[80] border-t border-white/5">
      <div className="section-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left - Logo & Tagline */}
          <div>
            <a
              href="Hero.tsx"
              className="font-bold text-2xl tracking-tight text-text-primary block mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif'}}
            >
              The Peterstouch Merchants
            </a>
            <p className="text-text-secondary text-sm leading-relaxed">
              ...visual comfort
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex flex-col md:items-center">
            <nav className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right - Social */}
          <div className="flex md:justify-end">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-cyan-accent hover:bg-cyan-accent/10 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-text-secondary/60 text-xs text-center">
            © 2025 The Peterstouch Merchants. <br />
             All rights reserved. <br /><br />
              <a href='https://haywee39.github.io/tagstechie/'>Developer: Tagstechie Solutions</a> <br />
              <a href='https://wa.me/+23490 5691 0840 target=_blank'>+234-905-691-0840</a>
          </p>
        </div>
        
      </div>
    </footer>
  );
}

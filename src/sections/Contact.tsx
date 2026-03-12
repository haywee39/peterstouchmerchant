import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, PhoneCall, Send } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        form,
        { x: 40, opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Inquiry sent! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', eventDate: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-navy-secondary py-16 md:py-24 z-[70]"
    >
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div ref={leftRef}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-[1.05] mb-6">
              Ready to start your next 
              <br />
              audio-visuals project?
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
              Tell us what you're building. We'll reply with a system plan and a
              clear quote.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-accent/20 flex items-center justify-center">
                  <Mail size={18} className="text-cyan-accent" />
                </div>
                <span className="text-text-primary text-sm">
                  thepeterstouch@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-accent/20 flex items-center justify-center">
                  <MapPin size={18} className="text-cyan-accent" />
                </div>
                <span className="text-text-primary text-sm">
                  3B, Remi Ibidapo Street, Ojokoro Lagos- Nigeria
                </span>
              </div>

               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-accent/20 flex items-center justify-center">
                  <PhoneCall size={18} className="text-cyan-accent" />
                </div>
                <span className="text-text-primary text-sm">
                  +234-814-994-6136
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-xl p-6 md:p-8"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-navy-primary/50 border border-white/10 rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-cyan-accent/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-navy-primary/50 border border-white/10 rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-cyan-accent/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full bg-navy-primary/50 border border-white/10 rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-cyan-accent/50 transition-colors"
                  />
                </div> */}

                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-navy-primary/50 border border-white/10 rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-cyan-accent/50 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full gap-2"
                >
                  <Send size={16} />
                  Send inquiry
                </button>

                <p className="text-text-secondary/60 text-xs text-center">
                  We keep your request details confidential.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

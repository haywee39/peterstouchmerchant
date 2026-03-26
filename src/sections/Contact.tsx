import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, PhoneCall, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // ACTIVE FORM SUBMIT LOGIC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Sending to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f3fa9ca7-399b-4d0b-86af-a05f47a8474b", // GET YOUR KEY AT web3forms.com
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Inquiry from ${formData.name}`,
          // ADD THESE TO CUSTOMIZE THE EMAIL YOU RECEIVE:
            from_name: "The Peterstouch Merchants Website Contact Form",
            subject: `New Project Inquiry from ${formData.name}`,
            replyto: formData.email, // This lets you click "Reply" in Gmail to email the client back directly!
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Inquiry sent! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
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
              className="glass-card rounded-xl p-6 md:p-8 border border-white/5"
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
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send inquiry'}
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
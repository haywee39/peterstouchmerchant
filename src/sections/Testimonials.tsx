import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Zero drama under tight production clocks.',
    text: "We handed The Peterstouch Merchants a brutal 6-hour load-in window for a three-city corporate exhibition. They didn't just meet the deadline—they delivered a flawlessly rigged, ground-stacked LED wall and a perfectly tuned audio array. Absolute professionals end-to-end",
    name: 'Maya Chen',
    role: 'Production Lead, Northwind Events',
    avatar: 'MC',
  },
  {
    quote: 'Flawless pixel alignment and color depth',
    text: 'For a high-profile live broadcast, camera-friendly refresh rates and zero glare are non-negotiable. The Peterstouch team provided a massive curved LED canvas that looked incredibly sharp both in the venue and on the broadcast stream. Their attention to cabinet alignment is unmatched.For a high-profile live broadcast, camera-friendly refresh rates and zero glare are non-negotiable. The Peterstouch team provided a massive curved LED canvas that looked incredibly sharp both in the venue and on the broadcast stream. Their attention to cabinet alignment is unmatched.',
    name: 'Jonas Reid',
    role: 'Tour Manager, Atlas Live',
    avatar: 'JR',
  },
  {
    quote: 'Rock-solid stability when it matters most.',
    text: 'Live concerts leave no room for error. The Peterstouch Merchants handled our main-stage playback and live camera mixing with absolute precision. Knowing they build real-time signal redundancy into their systems gave our production team complete peace of mind.',
    name: 'Sofia Marin',
    role: 'Creative Director, Pulse Agency',
    avatar: 'SM',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const heading = q('.test-heading');
      const cards = q('.testimonial-card');

      // Heading animation
      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.6,
          },
        }
      );

      // Optimized Staggered Cards Animation (Single ScrollTrigger instance)
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cards[0], // Triggers as soon as the first card enters
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-navy-primary py-16 md:py-24 z-[60]"
    >
      <div className="section-padding">
        <h2 className="test-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-[1.05] text-center mb-12 md:mb-16 opacity-0">
          What Our Customers Say...
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card glass-card rounded-xl p-6 md:p-8 opacity-0"
            >
              <Quote
                size={24}
                className="text-cyan-accent/50 mb-4"
              />
              <h3 className="text-lg md:text-xl font-bold text-text-primary mb-3">
                "{testimonial.quote}"
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cyan-accent/20 flex items-center justify-center">
                  <span className="text-cyan-accent font-medium text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-text-primary font-medium text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-text-secondary text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
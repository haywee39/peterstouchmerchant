import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Flawless alignment, every time.',
    text: "We've worked with Lumiere on three launches. Their LED alignment is the cleanest we've seen.",
    name: 'Maya Chen',
    role: 'Production Lead, Northwind Events',
    avatar: 'MC',
  },
  {
    quote: 'Fast load-in, zero drama.',
    text: 'They delivered a full stage system in a tight venue window—professional end-to-end.',
    name: 'Jonas Reid',
    role: 'Tour Manager, Atlas Live',
    avatar: 'JR',
  },
  {
    quote: 'Audience was blown away.',
    text: 'The brightness, the color accuracy, the sound—it felt like a stadium show.',
    name: 'Sofia Marin',
    role: 'Creative Director, Pulse Agency',
    avatar: 'SM',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardsContainer = cardsRef.current;

    if (!section || !heading || !cardsContainer) return;

    const ctx = gsap.context(() => {
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
            scrub: true,
          },
        }
      );

      // Cards animation
      const cards = cardsContainer.querySelectorAll('.testimonial-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-navy-primary py-16 md:py-24 z-[60]"
    >
      <div className="section-padding">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-[1.05] text-center mb-12 md:mb-16"
        >
          What Our Customers Say...
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card glass-card rounded-xl p-6 md:p-8"
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

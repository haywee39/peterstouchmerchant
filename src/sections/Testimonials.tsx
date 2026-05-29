import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Elevating Our Worship Experience',
    text: "The transformation of our sanctuary has been incredible. The new LED installation has completely elevated our worship experience, providing crystal-clear clarity for our congregation both in-person and for our online stream. The professionalism and attention to detail during the setup were exceptional.",
    name: 'Pastor Daramola',
    role: 'RCCG New Dawn Assembly, Ayobo',
    avatar: 'PD',
  },
  {
    quote: 'A Sophisticated Display for a Prestigious Club',
    text: 'We needed a sophisticated visual solution that matched the prestige of the Port Harcourt Club. The premium LED display installed in our main lounge is absolutely stunning. It delivers crisp imagery, operates flawlessly, and has drawn immense praise from our distinguished members.',
    name: 'Barrister Briggs',
    role: 'The President, Port Harcourt Club',
    avatar: 'BB',
  },
  {
    quote: 'Exceptional Precision and Guest Engagement',
    text: 'As an engineer, I highly appreciate precision and quality hardware. The external and indoor LED installations at our hotel have significantly enhanced our guest engagement and hospitality branding. The display brightness, seamless panels, and energy efficiency exceeded our expectations.',
    name: 'Engr. Ibrahim',
    role: 'M.D, Valentino Hotel & Suites',
    avatar: 'EI',
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
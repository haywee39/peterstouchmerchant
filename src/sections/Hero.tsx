import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const card = cardRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    if (!section || !headline || !subheadline || !card || !cta || !bg) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.1 })
        .fromTo(headline, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(subheadline, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')
        .fromTo(card, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo(cta, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.6');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headline, subheadline, card, cta], { opacity: 1, x: 0, y: 0 });
            gsap.set(bg, { opacity: 1, scale: 1 });
          },
        },
      });

      // Exit animations (70% - 100%)
      scrollTl
        .fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: '-22vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          subheadline,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(
          card,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cta,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          bg,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0.85, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero_stage_led.jpg"
          alt="LED Stage"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(5,11,20,0.25), rgba(5,11,20,0.75))',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[3] h-full flex flex-col justify-center items-center px-6">
        {/* Center Headline Block */}
        <div className="text-center max-w-[1100px] mx-auto" style={{ marginTop: '-20vh' }}>
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[45px] font-bold text-text-primary leading-[0.95] tracking-tight"
            style={{ opacity: 0 }}
          >
            Transforming Spaces with 
            <br />
            Brilliant LED Displays 
            <br />
            and Audio-Visual Solutions.
          </h1>
          <p
            ref={subheadlineRef}
            className="label-mono mt-5 md:mt-8 xl:text-[25px] text-[20px]"
            style={{ opacity: 0 }}
          >
            LED DISPLAYS • AUDIO • STAGING
          </p>
        </div>
      </div>

      {/* Bottom Left Info Card */}
      <div
        ref={cardRef}
        className="absolute left-6 md:left-[6vw] xl:bottom-[8vh] bottom-[20vh] z-[4] w-full max-w-[420px]"
        style={{ opacity: 0 }}
      >
        <div className="glass-card rounded-xl p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
            Turnkey event technology
          </h3>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            We deliver displays and installations characterized by
              high brightness and high definition visuals ensuring
              impactful and clear communication.
          </p>
        </div>
      </div>

      {/* Bottom Right CTA Cluster */}
              {/* Outer container handles centering on mobile / right-align on desktop */}
        <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[6vw] md:bottom-[10vh] z-[4] w-[90%] max-w-[250px]">
          
          {/* Inner div handles the GSAP animation via the ref */}
          <div ref={ctaRef} className="flex flex-col items-center md:items-start" style={{ opacity: 0 }}>
            <button 
              onClick={() => scrollToSection('#contact')} 
              className="btn-primary w-full mb-4"
            >
              Request a quote
            </button>
            <button
              onClick={() => scrollToSection('#portfolio')}
              className="flex items-center justify-center md:justify-start gap-2 text-text-secondary hover:text-cyan-accent transition-colors duration-300 text-md font-medium group"
            >
              View selected work
              <ArrowRight
                size={20}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Scoped selectors mean we don't need individual useRef hooks for everything
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      
      const bg = q('.hero-bg');
      const headline = q('.hero-headline');
      const subheadline = q('.hero-subheadline');
      const card = q('.hero-card');
      const cta = q('.hero-cta');

      // 1. Initial entry load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.1 })
        .fromTo(headline, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(subheadline, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')
        .fromTo(card, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo(cta, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.6');

      // 2. Scroll-driven fade out animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          // onLeaveBack removed: GSAP scrub naturally restores positions on scroll up
        },
      });

      scrollTl
        .fromTo(headline, { y: 0, opacity: 1 }, { y: '-22vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(subheadline, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo(card, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(cta, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0.85, ease: 'power2.in' }, 0.7);
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
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-10">
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 z-[1]" style={{ opacity: 0 }}>
        <img
          src="images/hero_stage_led.jpg"
          alt="LED Stage"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(5,11,20,0.25), rgba(5,11,20,0.75))',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[3] h-full flex flex-col justify-center items-center px-6">
        <div className="text-center max-w-[1100px] mx-auto mt-[-20vh]">
          <h1
            className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[0.95] tracking-tight"
            style={{ opacity: 0 }}
          >
            Transforming Spaces with 
            <br />
            Brilliant LED Displays 
            <br />
            and Audio-Visual Solutions.
          </h1>
          <p
            className="hero-subheadline label-mono mt-5 md:mt-8 text-[13px] sm:text-base md:text-lg xl:text-[22px]"
            style={{ opacity: 0 }}
          >
            LED DISPLAYS • AUDIO • STAGING
          </p>
        </div>
      </div>

      {/* Bottom Left Info Card */}
      <div
        className="hero-card absolute left-6 md:left-[6vw] xl:bottom-[8vh] bottom-[20vh] z-[4] w-full max-w-[420px]"
        style={{ opacity: 0 }}
      >
        <div className="glass-card rounded-xl p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
            Quality Deliverables
          </h3>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            We deliver displays and installations characterized by high brightness and high definition visuals ensuring impactful and clear communication.
          </p>
        </div>
      </div>

      {/* Bottom Right CTA Cluster */}
      <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[6vw] md:bottom-[10vh] z-[4] w-[90%] max-w-[250px]">
        <div className="hero-cta flex flex-col items-center md:items-start" style={{ opacity: 0 }}>
          <button 
            onClick={() => scrollToSection('#contact')} 
            className="btn-primary w-full mb-4"
          >
            Request a Quote
          </button>
          <button
            onClick={() => scrollToSection('#portfolio')}
            className="flex items-center justify-center md:justify-start gap-2 text-text-secondary hover:text-cyan-accent transition-colors duration-300 text-md font-medium group"
          >
            View selected work
            <ArrowRight
              size={25}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
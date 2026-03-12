import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    label: 'LED WALLS',
    description: 'Indoor & outdoor, 2.6–4.8mm pitch',
  },
  {
    label: 'AUDIO SYSTEMS',
    description: 'Line array, point source, wireless mics',
  },
  {
    label: 'LIGHTING DESIGN',
    description: 'Wash, spot, beam, pixel-mapped',
  },
  {
    label: 'STAGING & RIGGING',
    description: 'Modular decks, truss, motors',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const list = listRef.current;
    const paragraph = paragraphRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    if (!section || !headline || !list || !paragraph || !cta || !bg) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Background
      scrollTl.fromTo(
        bg,
        { scale: 1.1, x: '8vw', opacity: 0.6 },
        { scale: 1, x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline
      scrollTl.fromTo(
        headline,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Service list items
      const listItems = list.querySelectorAll('.service-item');
      scrollTl.fromTo(
        listItems,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.08
      );

      // Paragraph
      scrollTl.fromTo(
        paragraph,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // CTA
      scrollTl.fromTo(
        cta,
        { y: '10vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        listItems,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, stagger: 0.01, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [paragraph, cta],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bg,
        { scale: 1, opacity: 1 },
        { scale: 1.05, opacity: 0.8, ease: 'power2.in' },
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
      id="services"
      className="relative w-full h-screen overflow-hidden z-20"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-[1]">
        <img
          src="/images/services_truss_rig.jpg"
          alt="Stage Truss Rig"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-primary/55" />
      </div>

      {/* Content */}
      <div className="relative z-[3] h-full section-padding pt-[19vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Headline */}
          <div>
            <h2
              ref={headlineRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[45px] font-bold text-text-primary [leading-1.05]"
            >
              LED. Audio.
              <br />
              Light. Staging.
            </h2>
          </div>

          {/* Right Service List */}
          <div ref={listRef} className="space-y-1 md:space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-item border-b border-white/70 pb-4 md:pb-5"
              >
                <p className="label-mono mb-0 text-lg">{service.label}</p>
                <p className="text-text-primary text-md md:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-[6vh] left-6 md:left-[6vw] right-6 md:right-auto min-w-[50vw]">
        {/* Use 'relative' by default, then 'absolute' for tablets and laptops (md) */}
         {/* <div className="relative mt-2 md:absolute md:mt-0 md:bottom-[3vh] left-6 md:left-[6vw] right-6 md:max-w-[40vw]"> */}
          <p
            ref={paragraphRef}
            className="text-text-secondary text-sm md:text-base leading-relaxed mb-0"
          >
            We design the system, deliver the gear, and operate it on-site—so
            your team can focus on the show.
          </p>
          <button
            ref={ctaRef}
            onClick={() => scrollToSection('#capabilities')}
            className="flex items-center gap-2 text-cyan-accent hover:text-text-primary transition-colors duration-300 text-sm font-medium group"
          >
            See packages
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

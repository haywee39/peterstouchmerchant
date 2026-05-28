import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: '12m', label: 'Curved LED span' },
  { value: '6 hrs', label: 'Load-in time' },
  { value: '3 cities', label: 'Tour stops' },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      
      const imageFrame = q('.port-image-frame');
      const image = q('.port-image');
      const textBlock = q('.port-text-block');
      const metricItems = q('.metric-item');
      const bg = q('.port-bg');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          imageFrame,
          { xPercent: -50, opacity: 0, scale: 0.98 },
          { xPercent: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(
          image,
          { scale: 1.1 },
          { scale: 1, ease: 'none' },
          0
        )
        .fromTo(
          textBlock,
          { xPercent: 30, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          metricItems,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.12
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          imageFrame,
          { xPercent: 0, opacity: 1 },
          { xPercent: -20, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          textBlock,
          { xPercent: 0, opacity: 1 },
          { xPercent: 20, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          bg,
          { opacity: 1 },
          { opacity: 0.85, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full h-screen overflow-hidden z-40"
    >
      {/* Background */}
      <div
        className="port-bg absolute inset-0 z-[1] bg-navy-primary"
        style={{
          background: 'radial-gradient(ellipse at 70% 0%, rgba(11,22,38,0.8) 0%, #050B14 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[3] h-full section-padding pt-[18vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Image Frame */}
          <div className="port-image-frame relative w-full aspect-[16/10] lg:aspect-auto lg:h-[64vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl opacity-0">
            <img
              className="port-image w-full h-full object-cover"
              src="images/portfolio_curved_led.jpg"
              alt="Curved LED Installation"
            />
          </div>

          {/* Right Text Block */}
          <div className="port-text-block lg:pt-4 opacity-0">
            <p className="label-mono mb-4">CASE STUDY</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-[1.05] mb-6">
              Built for the
              <br />
              spotlight.
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
              A multi-city product launch with a 12m curved LED canvas, spatial audio, and real-time content sync—installed in under 6 hours.
            </p>

            {/* Metrics */}
            <div className="flex gap-8 md:gap-12 mb-8">
              {metrics.map((metric, index) => (
                <div key={index} className="metric-item opacity-0">
                  <p className="text-2xl md:text-3xl font-bold text-cyan-accent mb-1">
                    {metric.value}
                  </p>
                  <p className="text-text-secondary text-xs md:text-sm">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-cyan-accent hover:text-text-primary transition-colors duration-300 text-sm font-medium group focus:outline-none">
              Explore the work
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
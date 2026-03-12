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
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageFrame = imageFrameRef.current;
    const image = imageRef.current;
    const textBlock = textBlockRef.current;
    const metricsContainer = metricsRef.current;
    const bg = bgRef.current;

    if (!section || !imageFrame || !image || !textBlock || !metricsContainer || !bg) return;

    const ctx = gsap.context(() => {
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
      // Image frame
      scrollTl.fromTo(
        imageFrame,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Image parallax
      scrollTl.fromTo(
        image,
        { x: '-6vw', scale: 1.08 },
        { x: 0, scale: 1.02, ease: 'none' },
        0
      );

      // Text block
      scrollTl.fromTo(
        textBlock,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Metrics
      const metricItems = metricsContainer.querySelectorAll('.metric-item');
      scrollTl.fromTo(
        metricItems,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.16
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageFrame,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textBlock,
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
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
        ref={bgRef}
        className="absolute inset-0 z-[1] bg-navy-primary"
        style={{
          background:
            'radial-gradient(ellipse at 70% 0%, rgba(11,22,38,0.8) 0%, #050B14 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[3] h-full section-padding pt-[18vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Image Frame */}
          <div
            ref={imageFrameRef}
            className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[64vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              ref={imageRef}
              src="/images/portfolio_curved_led.jpg"
              // src="/images/ptm.jpg"
              alt="Curved LED Installation"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text Block */}
          <div ref={textBlockRef} className="lg:pt-4">
            <p className="label-mono mb-4">CASE STUDY</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-[1.05] mb-6">
              Built for the
              <br />
              spotlight.
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
              A multi-city product launch with a 12m curved LED canvas, spatial
              audio, and real-time content sync—installed in under 6 hours.
            </p>

            {/* Metrics */}
            <div
              ref={metricsRef}
              className="flex gap-8 md:gap-12 mb-8"
            >
              {metrics.map((metric, index) => (
                <div key={index} className="metric-item">
                  <p className="text-2xl md:text-3xl font-bold text-cyan-accent mb-1">
                    {metric.value}
                  </p>
                  <p className="text-text-secondary text-xs md:text-sm">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-cyan-accent hover:text-text-primary transition-colors duration-300 text-sm font-medium group">
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

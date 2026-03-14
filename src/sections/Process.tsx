import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Consultation & Custom Design',
    description: 'Expert planning, visual certainty.',
  },
  {
    number: '02',
    title: 'Professional Installation and Setup',
    description: 'Expert setup. Perfect performance.',
  },
  {
    number: '03',
    title: 'Delivery & Ongoing Support',
    description: 'Delivery. Support. Performance.',
  },
 
 
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const imageCard = imageCardRef.current;
    const stepsContainer = stepsRef.current;
    const bg = bgRef.current;

    if (!section || !headline || !imageCard || !stepsContainer || !bg) return;

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
      // Headline
      scrollTl.fromTo(
        headline.querySelector('h2'),
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headline.querySelector('p'),
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Image card
      scrollTl.fromTo(
        imageCard,
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.06
      );

      // Steps
      const stepItems = stepsContainer.querySelectorAll('.step-chip');
      scrollTl.fromTo(
        stepItems,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.14
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageCard,
        { x: 0, opacity: 1 },
        { x: '16vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        stepsContainer,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full h-screen overflow-hidden z-50"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-[1]">
        <img
          src="./images/process_lighting_beams.jpg"
          alt="Stage Lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-[3] h-full section-padding pt-[18vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Headline */}
          <div ref={headlineRef}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-text-primary leading-[1.05] mb-4">
              Plan. Build. Run.
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              A clear workflow—so there are no surprises on show day.
            </p>
          </div>

          {/* Right Image Card */}
          <div
            ref={imageCardRef}
            className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[46vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              // src="/images/process_lighting_beams.jpg"
              src="./images/logoB.png"
              alt="Process Lighting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Steps */}
        <div
          ref={stepsRef}
          className="absolute bottom-[10vh] left-6 md:left-[6vw] right-6 md:right-[6vw]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-chip glass-card rounded-xl p-5 md:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-cyan-accent font-mono text-sm font-medium">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* <button className="flex items-center gap-2 text-cyan-accent hover:text-text-primary transition-colors duration-300 text-sm font-medium group mt-6">
            <Download size={16} />
            Download our process PDF
          </button> */}
        </div>
      </div>
    </section>
  );
}

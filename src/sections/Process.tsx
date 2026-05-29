import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      
      const headlineH2 = q('.proc-h2');
      const headlineP = q('.proc-p');
      const imageCard = q('.proc-img-card');
      const stepItems = q('.step-chip');
      const headlineWrap = q('.proc-headline-wrap');
      const stepsContainer = q('.proc-steps-wrap');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          pinSpacing: true,      // Stabilizes layout spacing in the DOM
          anticipatePin: 1,      // Eliminates the entry jerk before the lock triggers
          fastScrollEnd: true,   // Gracefully runs layout completions on quick scrolls
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          headlineH2,
          { xPercent: -50, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          headlineP,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          imageCard,
          { xPercent: 40, opacity: 0, scale: 0.98 },
          { xPercent: 0, opacity: 1, scale: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          stepItems,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.14
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          headlineWrap,
          { y: 0, opacity: 1 },
          { y: '-14vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          imageCard,
          { xPercent: 0, opacity: 1 },
          { xPercent: 20, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
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
      <div className="absolute inset-0 z-[1]">
        <img
          src="./images/process_lighting_beams.jpg"
          alt="Stage Lighting Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-[3] h-full section-padding pt-[18vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Headline */}
          <div className="proc-headline-wrap">
            <h2 className="proc-h2 text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-text-primary leading-[1.05] mb-4 opacity-0">
              Plan. Build. Run.
            </h2>
            <p className="proc-p text-text-secondary text-base md:text-lg leading-relaxed opacity-0">
              A clear workflow—so there are no surprises on show day.
            </p>
          </div>

          {/* Right Image Card */}
          <div className="proc-img-card relative w-full aspect-[16/10] lg:aspect-auto lg:h-[46vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl opacity-0">
            <img
              src="./images/logoB.png"
              alt="The Peterstouch Merchants Process Branding Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Steps */}
        <div className="proc-steps-wrap absolute bottom-[10vh] left-6 md:left-[6vw] right-6 md:right-[6vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-chip glass-card rounded-xl p-5 md:p-6 opacity-0"
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
        </div>

      </div>
    </section>
  );
}
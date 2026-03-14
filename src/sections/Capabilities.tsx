import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  'Seamless cabinets with magnetic corner locks',
  'Ground-stack or flown—up to 6m height',
  'Real-time redundancy + backup switching',
  'Content playback + live camera mixing',
];

const cards = [
  {
    title: 'Corporate Events',
    description: 'Keynotes, product launches, expos',
    image: 'public/images/capabilities_corporate_event.jpg',
  },
  {
    title: 'Concerts & Festivals',
    description: 'Tour-ready builds, weather-rated',
    image: 'public/images/capabilities_festival_stage.jpg',
  },
  {
    title: 'Broadcast & Streaming',
    description: 'Camera-friendly refresh rates, low reflection',
    image: 'public/images/capabilities_broadcast_studio.jpg',
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const bullets = bulletsRef.current;
    const cardsContainer = cardsRef.current;

    if (!section || !heading || !bullets || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Bullet lines animation
      const bulletItems = bullets.querySelectorAll('li');
      bulletItems.forEach((item) => {
        gsap.fromTo(
          item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 65%',
              scrub: true,
            },
          }
        );
      });

      // Cards animation
      const cardElements = cardsContainer.querySelectorAll('.capability-card');
      cardElements.forEach((card) => {
        const img = card.querySelector('img');

        gsap.fromTo(
          card,
          { x: 60, opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );

        // Parallax on image
        if (img) {
          gsap.fromTo(
            img,
            { y: -12 },
            {
              y: 12,
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full bg-navy-secondary py-16 md:py-24 z-30"
    >
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div>
            <div ref={headingRef}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-[1.05] mb-6">
                Modular. Scalable.
                <br />
                Precise.
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
                Our systems are built for real-world events—fast load-in, clean
                cabling, and pixel-perfect alignment.
              </p>
            </div>

            <ul ref={bulletsRef} className="space-y-4">
              {capabilities.map((cap, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-accent/20 flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-cyan-accent" />
                  </div>
                  <span className="text-text-secondary text-sm md:text-base">
                    {cap}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Cards */}
          <div ref={cardsRef} className="space-y-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="capability-card glass-card rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="h-40 md:h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-text-primary mb-1">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Cpu, Radio, Layers, Tv, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilitiesData = [
  {
    icon: Monitor,
    title: 'Indoor & Outdoor LED Displays',
    description: 'High-brightness, high-definition seamless video walls engineered for concerts, corporate environments, houses of worship, and digital billboards.',
    tags: ['P2.5 / P3 / P4', 'Rental & Fixed', 'High Refresh Rate'],
  },
  {
    icon: Cpu,
    title: 'Multi-Screen Video Processing',
    description: 'Advanced media server integration and ultra-low latency switching systems to manage complex multi-display arrays perfectly.',
    tags: ['Novastar Splicing', '4K Media Servers', 'Live Feed Switching'],
  },
  {
    icon: Radio,
    title: 'Professional Sound Reinforcement',
    description: 'Precision acoustic tuning, line array deployments, and digital mixing infrastructure scaled perfectly for both intimate venues and massive stadiums.',
    tags: ['Line Arrays', 'Digital Consoles', 'Acoustic Tuning'],
  },
  {
    icon: Layers,
    title: 'Concert Roof & Stage Structures',
    description: 'Certified aluminum truss layout designs, durable stage builds, and secure rigging setups prioritized heavily for absolute structural safety.',
    tags: ['Aluminum Truss', 'Modular Staging', 'Rigging Safety'],
  },
  {
    icon: Tv,
    title: 'Broadcast & Live Streaming',
    description: 'Multi-camera production systems, broadcast switchers, and hardware encoding to deliver seamless live transmissions across global networks.',
    tags: ['Multi-Cam Setup', 'Hardware Encoding', 'NDI Workflow'],
  },
  {
    icon: Video,
    title: 'Projections & Creative Lighting',
    description: 'High-lumens laser projection mapping combined with intelligent moving head fixtures to craft unforgettable, immersive environmental visual designs.',
    tags: ['Laser Projection', 'Intelligent Lighting', 'Timecode Sync'],
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      
      // Animate cards smoothly with a subtle layout stagger effect on scroll
      gsap.fromTo(
        q('.cap-card'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-navy-primary py-20 md:py-28 z-[70] overflow-hidden"
    >
      <div className="section-padding">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <p className="text-cyan-accent font-mono text-xs tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-[1.1]">
            Comprehensive Audio-Visual
            <br />
            and Production Capabilities.
          </h2>
        </div>

        {/* Dynamic Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {capabilitiesData.map((cap, index) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={index}
                className="cap-card glass-card rounded-xl p-6 md:p-8 border border-white/5 flex flex-col justify-between h-full transition-all duration-300 hover:border-cyan-accent/20 opacity-0"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-lg bg-cyan-accent/10 flex items-center justify-center mb-6">
                    <IconComponent size={24} className="text-cyan-accent" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                {/* Sub-Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {cap.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[11px] font-mono bg-white/5 text-text-secondary px-2.5 py-1 rounded-md tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
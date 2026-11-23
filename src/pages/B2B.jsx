import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CheckCircle2, Compass, Ruler } from 'lucide-react';
import kitchenOne from '../../images/kitchen-01.avif';
import kitchenTwo from '../../images/kitchen-02.avif';
import kitchenWardrobe from '../../images/collection-wardrobes.webp';

const PARTNERS = [
  {
    id: 'interior-designers',
    title: 'Interior designers',
    subtitle: 'A considered kitchen, in step with your wider vision',
    description:
      'Bring the kitchen into the conversation early. Explore layouts, materials, and storage options that complement the character and flow of the home.',
    image: kitchenOne,
    icon: Compass,
    features: [
      'Coordinate kitchen choices with the surrounding interiors',
      'Explore cabinetry and finish directions together',
      'Shape storage around the client’s routines',
    ],
  },
  {
    id: 'architects-builders',
    title: 'Architects & builders',
    subtitle: 'Clear thinking from plan to finished space',
    description:
      'Collaborate on kitchen and wardrobe planning as part of the wider project, with attention to spatial flow, practical use, and visual continuity.',
    image: kitchenTwo,
    icon: Ruler,
    features: [
      'Discuss kitchen layouts alongside the project plan',
      'Consider dimensions, circulation, and everyday use',
      'Align finishes with the architectural palette',
    ],
  },
  {
    id: 'project-teams',
    title: 'Project teams',
    subtitle: 'A shared vision for kitchen and storage',
    description:
      'Explore modular kitchens and kitchen wardrobes for residential projects, with a design conversation focused on the needs of the space.',
    image: kitchenWardrobe,
    icon: Building2,
    features: [
      'Explore kitchen and wardrobe design together',
      'Plan purposeful storage for each space',
      'Discuss material and finish preferences',
    ],
  },
];

export default function B2B() {
  const [activePartner, setActivePartner] = useState(PARTNERS[0].id);
  const reduceMotion = useReducedMotion();
  const currentPartner = PARTNERS.find((partner) => partner.id === activePartner) ?? PARTNERS[0];

  return (
    <main className="b2b-page min-h-screen">
      <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#C5A059]/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.25em] text-[#9A7410] font-medium mb-6"
          >
            For design professionals
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-serif font-light tracking-tight mb-8 leading-[1.15]"
          >
            Good design begins
            <br />
            <span className="italic font-normal text-[#9A7410]">with collaboration.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10"
          >
            ALTEZZA works with interior designers, architects, and project teams
            to shape kitchens and kitchen wardrobes around the space and the
            people who use it.
          </motion.p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] hover:bg-[#9A7410] text-white font-semibold text-xs uppercase tracking-widest transition-colors"
          >
            Discuss a project <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="partners" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#9A7410] font-medium mb-3">Working together</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">A shared approach to better spaces</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Every project is different. Start with the people, the plan, and the
            way the kitchen needs to work.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PARTNERS.map((partner) => {
            const Icon = partner.icon;
            const isActive = activePartner === partner.id;
            return (
              <button
                key={partner.id}
                type="button"
                onClick={() => setActivePartner(partner.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-3 px-6 py-3.5 text-xs md:text-sm uppercase tracking-wider transition-colors ${
                  isActive ? 'bg-[#1A1A1A] text-white' : 'bg-white text-gray-600 border border-black/10 hover:text-black'
                }`}
              >
                <Icon className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                {partner.title}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={currentPartner.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -20 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
            className="grid lg:grid-cols-2 gap-10 items-center bg-white border border-black/5 p-6 md:p-10"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={currentPartner.image} alt={currentPartner.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-serif text-white mb-1">{currentPartner.title}</h3>
                <p className="text-sm text-white/85 font-light">{currentPartner.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-600 text-base leading-relaxed font-light mb-8">
                {currentPartner.description}
              </p>
              <h4 className="text-xs uppercase tracking-widest text-[#9A7410] font-bold mb-4">A thoughtful starting point</h4>
              <ul className="space-y-4 mb-8">
                {currentPartner.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                state={{ interest: currentPartner.title }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] hover:text-[#9A7410] transition-colors"
              >
                Start a project conversation <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>
    </main>
  );
}

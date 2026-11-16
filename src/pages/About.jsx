import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import kitchenOne from '../../images/kitchen-01.avif';
import craftsmanshipKitchen from '../../images/craftsmanship-kitchen.webp';

const principles = [
  'Layouts shaped around your space and routines',
  'Materials and finishes chosen with care',
  'Storage planned for the way you use your kitchen',
  'Details considered as part of the whole',
];

function ScrollImage({ src, alt, className = '' }) {
  const imageRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start 90%', 'end 10%'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['7%', '-7%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.08, 1.02]);

  return (
    <motion.div
      ref={imageRef}
      className={`about-image-reveal ${className}`}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{ y: imageY, scale: imageScale }}
      />
    </motion.div>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="about-page bg-cream overflow-hidden">
      <section className="about-intro pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="about-intro__heading text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.75 }}
            className="about-intro__eyebrow text-sm font-semibold tracking-[0.2em] text-gold uppercase mb-2"
          >
            Our approach
          </motion.p>
          <div className="about-intro__title-mask">
            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : '105%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0.01 : 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-serif text-charcoal mb-6"
            >
              Designed around living
            </motion.h1>
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
            ALTEZZA brings architectural thinking to the heart of the home, with
            modular kitchens and kitchen wardrobes planned around real life.
          </p>
          <div className="about-intro__rule h-1 w-24 bg-gold mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="about-story-image relative">
            <div className="absolute inset-0 bg-gold/10 transform -translate-x-4 translate-y-4" />
            <ScrollImage
              className="relative z-10 aspect-[4/3] shadow-2xl"
              src={kitchenOne}
              alt="Contemporary kitchen with considered timber and stone finishes"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">A place to gather</p>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
              Where thoughtful design meets everyday function.
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              A well-designed kitchen makes daily routines feel effortless. We
              bring together considered layouts, purposeful storage, and
              carefully chosen finishes to create a space that feels distinctly
              yours.
            </p>
            <ul className="space-y-4 pt-2">
              {principles.map((item) => (
                <li key={item} className="flex items-start text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-gold mr-4 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/collections" className="text-link inline-flex items-center gap-2 pt-2">
              Explore kitchens and wardrobes <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-charcoal text-white border-y-4 border-gold">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-sm tracking-[0.2em] text-gold uppercase mb-4">The ALTEZZA point of view</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">
            A kitchen should be as considered as the life that unfolds in it.
          </h2>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">Made to work beautifully</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal">The details make the difference.</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              From the relationship between work surfaces and storage to the
              warmth of a finish, each decision contributes to a more intuitive
              kitchen. We keep the whole space in view, so form and function
              belong together.
            </p>
            <Link to="/b2b-hospitality" className="text-link inline-flex items-center gap-2">
              For design professionals <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ScrollImage
            className="about-exhibition-image aspect-[4/3]"
            src={craftsmanshipKitchen}
            alt="Contemporary kitchen island with carefully finished cabinetry"
          />
        </div>
      </section>

      <section className="py-24 bg-cream text-center px-6">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase mb-3">Begin with a conversation</p>
        <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">Let’s make room for living.</h2>
        <Link to="/contact" className="text-link inline-flex items-center gap-2">
          Book a consultation <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}

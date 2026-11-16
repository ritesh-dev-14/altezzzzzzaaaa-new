import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import heroKitchen from '../../images/hero-kitchen.avif';
import kitchenOne from '../../images/kitchen-01.avif';
import kitchenTwo from '../../images/kitchen-02.avif';
import kitchenWardrobe from '../../images/collection-wardrobes.webp';
import storageDetail from '../../images/about-interior.avif';
import craftsmanshipKitchen from '../../images/craftsmanship-kitchen.webp';

const collections = [
  {
    number: '01',
    name: 'Kitchens',
    detail: 'Thoughtful design, made for living.',
    image: heroKitchen,
  },
  {
    number: '02',
    name: 'Kitchen wardrobes',
    detail: 'A considered place for everything.',
    image: kitchenWardrobe,
  },
  {
    number: '03',
    name: 'Intelligent storage',
    detail: 'Beautifully in its place.',
    image: storageDetail,
  },
];

const spaces = [
  {
    name: 'Contemporary kitchens',
    detail: 'Designed around your everyday.',
    image: kitchenOne,
    alt: 'Light-filled contemporary kitchen with a generous island',
  },
  {
    name: 'Kitchen wardrobes',
    detail: 'A place for everything.',
    image: kitchenWardrobe,
    alt: 'Warm timber kitchen wardrobe with integrated shelves and lighting',
  },
  {
    name: 'Warm minimalism',
    detail: 'A softer balance of stone and timber.',
    image: kitchenTwo,
    alt: 'Minimal timber kitchen with a bright stone worktop',
  },
  {
    name: 'Craftsmanship',
    detail: 'Details to live with for years.',
    image: craftsmanshipKitchen,
    alt: 'Carefully finished contemporary modular kitchen',
  },
  {
    name: 'Thoughtful storage',
    detail: 'A place for the little things.',
    image: storageDetail,
    alt: 'Custom kitchen drawer with organised storage compartments',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function CollectionCard({ item, index }) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 90%', 'end 10%'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['7%', '-7%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.45, 1], reduceMotion ? [1, 1, 1] : [1.08, 1, 1.04]);
  const imageReveal = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    reduceMotion ? ['inset(0)', 'inset(0)', 'inset(0)'] : ['inset(12% 0 12% 0)', 'inset(0)', 'inset(0)']
  );

  return (
    <motion.article
      ref={cardRef}
      className={`collection-card${index === 1 ? ' collection-card--offset' : ''}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/collections" className="collection-card__link">
        <div className="collection-card__image">
          <motion.img
            src={item.image}
            alt={`${item.name} kitchen design`}
            loading="lazy"
            style={{ y: imageY, scale: imageScale, clipPath: imageReveal }}
          />
          <span className="collection-card__arrow"><ArrowUpRight size={20} /></span>
          <span className="collection-card__image-label">ALTEZZA</span>
        </div>
        <div className="collection-card__caption">
          <span className="collection-card__number">{item.number}</span>
          <div>
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Single Word reveal helper component for smooth scroll highlighting
function ScrollWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [24, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}

function EditorialSection() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 45%'],
  });

  const paragraphText =
    "Crafted spaces built for modern living. Every culinary routine demands precision, warmth, and intuitive flow. Our modular designs integrate seamlessly into your lifestyle, balancing striking architectural stone finishes with warm, organic timber textures.";

  const words = paragraphText.split(' ');

  return (
    <section className="editorial-section" aria-label="Altezza kitchen design philosophy">
      <div className="editorial-heading">
        <p className="editorial-kicker">ALTEZZA · KITCHEN WARDROBE</p>
        <p className="editorial-intro">
          A kitchen is more than a place to prepare a meal. It is where considered
          materials, thoughtful storage, and the rhythms of everyday life come together.
        </p>
      </div>

      {/* Word-by-word scroll reveal block */}
      <div ref={containerRef} className="editorial-word-container">
        <p className="editorial-huge-text">
          {words.map((word, index) => {
            if (reduceMotion) {
              return <span key={index} style={{ marginRight: '0.25em' }}>{word}</span>;
            }
            const start = index / words.length;
            const end = start + 1 / words.length;
            return (
              <ScrollWord
                key={index}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </p>
      </div>

      <div className="editorial-footer">
        <span>Thoughtful design. Considered spaces.</span>
        <span>Scroll to discover <ArrowDown size={15} aria-hidden="true" /></span>
      </div>
    </section>
  );
}

function FullscreenFeature() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  const frameScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.86, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.8, 1]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [36, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.12, 1]);
  const copyOpacity = useTransform(scrollYProgress, [0.35, 0.85], reduceMotion ? [1, 1] : [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.35, 0.85], reduceMotion ? [0, 0] : [24, 0]);

  return (
    <section ref={sectionRef} className="fullscreen-feature" aria-label="Altezza kitchen interiors">
      <motion.div
        className="fullscreen-feature__frame"
        style={{ opacity: frameOpacity, scale: frameScale, y: frameY }}
      >
        <motion.img
          className="fullscreen-feature__image"
          src={kitchenTwo}
          alt="Warm timber kitchen with refined stone finishes"
          loading="lazy"
          style={{ scale: imageScale }}
        />
        <div className="fullscreen-feature__shade" />
        <motion.div className="fullscreen-feature__copy" style={{ opacity: copyOpacity, y: copyY }}>
          <p className="fullscreen-feature__eyebrow">Made for the way you live</p>
          <h2>Everyday rituals,<br /><em>beautifully considered.</em></h2>
          <Link to="/collections" className="fullscreen-feature__link">
            Explore our kitchens <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </motion.div>
        <span className="fullscreen-feature__caption">ALTEZZA · Designed around you</span>
      </motion.div>
    </section>
  );
}

function SpacesShowcase() {
  const [activeSpace, setActiveSpace] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="spaces-section" aria-label="Explore our spaces">
      <div className="spaces-showcase">
        <div
          className="spaces-showcase__image"
          style={{ '--active-space': activeSpace }}
        >
          <div className="spaces-showcase__preview">
            <AnimatePresence mode="sync" initial={false}>
              <motion.img
                key={spaces[activeSpace].image}
                src={spaces[activeSpace].image}
                alt={spaces[activeSpace].alt}
                initial={{
                  opacity: 0,
                  clipPath: reduceMotion ? 'inset(0)' : 'inset(0 0 100% 0)',
                  scale: reduceMotion ? 1 : 1.035,
                }}
                animate={{ opacity: 1, clipPath: 'inset(0)', scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <span className="spaces-showcase__count">
              0{activeSpace + 1} <span>/</span> 0{spaces.length}
            </span>
          </div>
        </div>

        <div className="spaces-showcase__list" aria-label="Spaces and collections">
          {spaces.map((space, index) => (
            <button
              className={`spaces-showcase__item${activeSpace === index ? ' is-active' : ''}`}
              key={space.name}
              type="button"
              onMouseEnter={() => setActiveSpace(index)}
              onFo cus={() => setActiveSpace(index)}
              onClick={() => setActiveSpace(index)}
              aria-pressed={activeSpace === index}
            >
              <span className="spaces-showcase__copy">
                <span className="spaces-showcase__name">{space.name}</span>
              </span>
              <span className="spaces-showcase__arrow">
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </button>
          ))}
          <Link to="/collections" className="spaces-showcase__link">
            Discover our collections <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '16%']);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.12]);

  return (
    <main className="home-page">
      <section ref={heroRef} className="home-hero">
        <motion.img
          className="home-hero__image"
          style={{ y: heroImageY, scale: heroImageScale }}
          src={heroKitchen}
          alt="Architectural modular kitchen with a sculptural island"
          fetchPriority="high"
        />
        <div className="home-hero__shade" />
        <div className="home-hero__content">
          <motion.p
            className="home-hero__eyebrow"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.25, duration: reduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            ALTEZZA · KITCHEN WARDROBE
          </motion.p>
          <h1 className="home-hero__title" aria-label="The art of living, reimagined">
            <span className="home-hero__title-line">
              <motion.span
                initial={{ y: reduceMotion ? 0 : '110%', opacity: reduceMotion ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.4, duration: reduceMotion ? 0.01 : 1, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                The art of
              </motion.span>
            </span>
            <span className="home-hero__title-line">
              <motion.span
                initial={{ y: reduceMotion ? 0 : '110%', opacity: reduceMotion ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.58, duration: reduceMotion ? 0.01 : 1.05, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <em>living, reimagined.</em>
              </motion.span>
            </span>
          </h1>
          <motion.div
            className="home-hero__bottom"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.95, duration: reduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>Thoughtfully designed modular kitchens where architectural elegance meets everyday functionality.</p>
            <Link to="/collections" className="home-round-link" aria-label="Explore our kitchens">
              <ArrowUpRight size={21} />
            </Link>
          </motion.div>
        </div>
        <a className="home-hero__scroll" href="#our-story">
          <span>Scroll to explore</span>
          <ArrowDown size={15} aria-hidden="true" />
        </a>
        <span className="home-hero__index">01 / 04</span>
      </section>

      <div id="our-story">
        <EditorialSection />
      </div>

      <section
        className="home-marquee"
        aria-label="Thoughtful design, considered spaces, bespoke kitchens, crafted wardrobes"
      >
        <div className="home-marquee__track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="home-marquee__group" key={copy}>
              <span>Thoughtful design</span>
              <span>Considered spaces</span>
              <span>Bespoke kitchens</span>
              <span>Crafted wardrobes</span>
            </div>
          ))}
        </div>
      </section>

      <SpacesShowcase />

      <FullscreenFeature />

      <section className="collection-section">
        <div className="collection-heading">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={reveal}
          >
            <p className="section-eyebrow">Made around the way you live</p>
            <h2>Spaces that<br /><em>make room for life.</em></h2>
          </motion.div>
          <motion.p
            className="collection-heading__note"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={reveal}
          >
            From the layout to the last detail, explore kitchens shaped around
            your routines, your space, and your point of view.
          </motion.p>
        </div>

        <div className="collection-grid">
          {collections.map((item, index) => (
            <CollectionCard item={item} index={index} key={item.number} />
          ))}
        </div>
        <div className="collection-cta">
          <Link to="/collections" className="text-link">
            Explore all collections <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="craft-section">
        <motion.div
          className="craft-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={craftsmanshipKitchen}
            alt="Contemporary kitchen finished with careful attention to detail"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          className="craft-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <p className="section-eyebrow">Designed with intention</p>
          <h2>Thoughtful by nature.<br /><em>Beautiful by design.</em></h2>
          <p className="craft-copy__body">
            We bring together considered layouts, refined materials, and
            intelligent storage to create kitchens that feel personal and work
            beautifully, every day.
          </p>
          <Link to="/about" className="text-link">
            Get to know us <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
        <span className="craft-caption">Considered materials, made for living.</span>
      </section>

      <section className="home-contact">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <p className="section-eyebrow">Your space, thoughtfully reimagined</p>
          <h2>Let’s design a kitchen<br /><em>that feels like yours.</em></h2>
          <Link to="/contact" className="home-contact__button">
            Book a consultation <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

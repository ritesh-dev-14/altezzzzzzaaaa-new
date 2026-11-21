import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroKitchen from '../../images/hero-kitchen.avif';
import kitchenOne from '../../images/kitchen-01.avif';
import kitchenTwo from '../../images/kitchen-02.avif';
import kitchenWardrobe from '../../images/collection-wardrobes.webp';
import storageDetail from '../../images/about-interior.avif';
import craftsmanshipKitchen from '../../images/craftsmanship-kitchen.webp';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
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

const finishes = [
  {
    id: 'stone',
    name: 'Calacatta & Jura Stone',
    category: 'Natural Stone',
    description: 'Sourced from European quarries, honed to a velvet touch, and engineered for daily resilience against heat and wear.',
    image: kitchenTwo,
  },
  {
    id: 'timber',
    name: 'Smoked Oak & Walnut',
    category: 'Organic Wood',
    description: 'Deep, tactile grains finished with natural plant oils that bring organic warmth and age with breathtaking grace.',
    image: kitchenWardrobe,
  },
  {
    id: 'lacquer',
    name: 'Soft-Touch Matte Lacquer',
    category: 'Bespoke Finish',
    description: 'Anti-fingerprint, ultra-matte surfaces absorbing ambient light for a serene, architectural monolithic look.',
    image: heroKitchen,
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Initial Consultation',
    desc: 'We sit down to understand your daily culinary rituals, aesthetic preferences, and spatial flow.',
  },
  {
    num: '02',
    title: 'Architectural Rendering',
    desc: 'Our designers craft immersive 3D visualisations tailored precisely to your home’s exact floor plan.',
  },
  {
    num: '03',
    title: 'Bespoke Crafting',
    desc: 'Each cabinet, drawer system, and stone countertop is precision-manufactured to order in our workshops.',
  },
  {
    num: '04',
    title: 'Seamless Installation',
    desc: 'Our master craftsmen assemble your kitchen on-site with microscopic attention to alignment and detail.',
  },
];

const testimonials = [
  {
    quote: "Altezza transformed our kitchen from a mere cooking space into the architectural anchor of our entire home. Every drawer glides like silk.",
    author: "Aarav & Meera Kapoor",
    location: "New Delhi Residence",
    publication: "Architectural Digest Feature",
  },
  {
    quote: "The balance between raw stone and warm smoked oak is extraordinary. Their storage solutions eliminated clutter we didn't even realize we had.",
    author: "Vikramaditya Singh",
    location: "Chandigarh Villa",
    publication: "Elle Decor India",
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

// --- HELPER COMPONENTS ---

// Magnetic Hover Wrapper for Buttons & Links
function MagneticButton({ children, className = '' }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (reduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

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

function ScrollWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [16, 0]);

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
  const canvasRef = useRef(null);
  const ambientCanvasRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ambientCanvas = ambientCanvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx2d = canvas.getContext('2d');
    const ambCtx = ambientCanvas ? ambientCanvas.getContext('2d') : null;
    const TOTAL = 200;
    const images = new Array(TOTAL);
    let killed = false;
    let currentRenderedIndex = 0;

    const pad = (n) => String(n).padStart(3, '0');

    // Draw frame on canvas with natural contain fit:
    // Keeps the natural aspect ratio with ZERO zoom, zero stretching, and zero distortion
    const drawFrame = (img) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return;

      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      // Natural proportion contain: preserves true aspect ratio, never stretched or over-zoomed
      const scale = Math.min(cw / nw, ch / nh);
      const dw = nw * scale;
      const dh = nh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx2d.clearRect(0, 0, cw, ch);
      ctx2d.drawImage(img, dx, dy, dw, dh);

      // Ambient reflection: draw scaled to fill to diffuse living colors into side blank spaces
      if (ambCtx && ambientCanvas && ambientCanvas.width && ambientCanvas.height) {
        ambCtx.drawImage(img, 0, 0, ambientCanvas.width, ambientCanvas.height);
      }
    };

    const render = (targetIndex) => {
      const idx = Math.max(0, Math.min(TOTAL - 1, Math.round(targetIndex)));

      // Live update sequence counter & progress rail in the side margins
      if (counterRef.current) {
        counterRef.current.textContent = `${pad(idx + 1)} / ${TOTAL}`;
      }
      if (progressRef.current) {
        const pct = ((idx + 1) / TOTAL) * 100;
        progressRef.current.style.height = `${pct}%`;
      }

      const targetImg = images[idx];
      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        currentRenderedIndex = idx;
        drawFrame(targetImg);
        return;
      }

      let nearest = currentRenderedIndex;
      let minDiff = Infinity;
      for (let i = 0; i < TOTAL; i++) {
        const item = images[i];
        if (item && item.complete && item.naturalWidth > 0) {
          const diff = Math.abs(i - idx);
          if (diff < minDiff) {
            minDiff = diff;
            nearest = i;
          }
        }
      }
      currentRenderedIndex = nearest;
      if (images[nearest]) {
        drawFrame(images[nearest]);
      }
    };

    const resizeCanvas = () => {
      const stage = canvas.parentElement?.parentElement || section;
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      if (ambientCanvas) {
        // High-efficiency low-res buffer for GPU ambient light blur
        ambientCanvas.width = 320;
        ambientCanvas.height = 180;
      }

      render(currentRenderedIndex);
    };

    const firstImg = new Image();
    firstImg.src = `/frames2/ezgif-frame-001.jpg`;
    images[0] = firstImg;
    firstImg.onload = () => {
      if (killed) return;
      resizeCanvas();
    };

    for (let i = 1; i < TOTAL; i++) {
      const img = new Image();
      img.src = `/frames2/ezgif-frame-${pad(i + 1)}.jpg`;
      images[i] = img;
    }

    const proxy = { frame: 0 };
    const gsapCtx = gsap.context(() => {
      gsap.to(proxy, {
        frame: TOTAL - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: () => {
            render(proxy.frame);
          },
        },
      });
    }, section);

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      killed = true;
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert();
      images.fill(null);
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className="fullscreen-feature-scroll" aria-label="Altezza kitchen interiors">
      <div className="fullscreen-feature-scroll__stage">
        {/* Dynamic ambient backdrop that diffuses the live frame colors into the blank margins */}
        <canvas
          ref={ambientCanvasRef}
          className="fullscreen-feature-scroll__ambient"
          aria-hidden="true"
        />

        {/* Ambient atmospheric dark gradient overlay */}
        <div className="fullscreen-feature-scroll__glow-mask" aria-hidden="true" />

        {/* Crisp contained video frame canvas */}
        <div className="fullscreen-feature-scroll__viewport">
          <canvas ref={canvasRef} className="fullscreen-feature-scroll__canvas" aria-hidden="true" />
        </div>

        {/* Aesthetic architectural side bars & metadata (in the blank spaces) */}
        <div className="fullscreen-aesthetic-decor" aria-hidden="true">
          {/* Left blank-space accents */}
          <aside className="aesthetic-sidebar aesthetic-sidebar--left">
            <div className="aesthetic-sidebar__top">
              <span className="aesthetic-crosshair">+</span>
              <span className="aesthetic-tag">ALTEZZA STUDIO</span>
            </div>
            <div className="aesthetic-sidebar__middle">
              <span className="aesthetic-vertical-text">SPATIAL TRANSFORMATION</span>
            </div>
            <div className="aesthetic-sidebar__bottom">
              <span className="aesthetic-coord">N° 45°28&apos;01&quot; E 9°11&apos;24&quot;</span>
              <span className="aesthetic-subtag">MILANO · ARCHITECTURE</span>
            </div>
          </aside>

          {/* Right blank-space accents */}
          <aside className="aesthetic-sidebar aesthetic-sidebar--right">
            <div className="aesthetic-sidebar__top">
              <div className="aesthetic-counter-block">
                <span className="aesthetic-counter-label">SEQUENCE</span>
                <span ref={counterRef} className="aesthetic-counter-val">001 / 200</span>
              </div>
            </div>
            <div className="aesthetic-sidebar__middle">
              <div className="aesthetic-progress-track">
                <div ref={progressRef} className="aesthetic-progress-fill" style={{ height: '0%' }} />
              </div>
            </div>
            <div className="aesthetic-sidebar__bottom">
              <span className="aesthetic-tag">BESPOKE JOINERY</span>
              <span className="aesthetic-subtag">CANALETTO WALNUT</span>
            </div>
          </aside>
        </div>
      </div>
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
              onFocus={() => setActiveSpace(index)}
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

// --- NEW EXTENDED SECTIONS ---

function MaterialitySection() {
  const [activeFinish, setActiveFinish] = useState(0);
  const reduceMotion = useReducedMotion();
  const finish = finishes[activeFinish];

  return (
    <section className="materiality-section py-24 px-6 md:px-16 bg-[#0f0e0d] text-[#f7f5f0]" aria-label="Materiality and Finishes">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <p className="section-eyebrow text-xs tracking-[0.2em] uppercase text-[#a39e93] mb-3">
            Uncompromising Materials
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight">
            Built from the ground up <br /><em>with tactile permanence.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {finishes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFinish(index)}
                className={`text-left p-6 transition-all duration-500 border-l-2 ${activeFinish === index
                  ? 'border-[#f7f5f0] bg-white/5 pl-8'
                  : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
              >
                <span className="text-xs uppercase tracking-widest text-[#a39e93] block mb-1">
                  0{index + 1} · {item.category}
                </span>
                <h3 className="text-xl md:text-2xl font-light">{item.name}</h3>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 relative h-[420px] md:h-[520px] overflow-hidden rounded-lg bg-neutral-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={finish.id}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={finish.image}
                  alt={finish.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sm md:text-base text-[#d1ccc0] font-light max-w-xl leading-relaxed">
                    {finish.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="process-section py-24 px-6 md:px-16 bg-[#141312] text-[#f7f5f0] border-t border-white/10" aria-label="Our Process">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <div>
            <p className="section-eyebrow text-xs tracking-[0.2em] uppercase text-[#a39e93] mb-3">
              The Altezza Experience
            </p>
            <h2 className="text-3xl md:text-5xl font-light">
              From vision <br /><em>to reality.</em>
            </h2>
          </div>
          <p className="text-[#a39e93] max-w-sm mt-4 md:mt-0 text-sm leading-relaxed">
            A collaborative journey dedicated to making your home feel effortlessly complete.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? {} : { y: -6 }}
              className="p-8 bg-white/[0.02] border border-white/10 rounded-lg flex flex-col justify-between hover:bg-white/[0.05] transition-colors"
            >
              <div>
                <span className="text-xs font-mono text-[#a39e93] block mb-6">{step.num}</span>
                <h3 className="text-xl font-light mb-3">{step.title}</h3>
                <p className="text-sm text-[#b0a99c] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PressAndTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  return (
    <section className="testimonials-section py-24 px-6 md:px-16 bg-[#0f0e0d] text-[#f7f5f0] border-t border-white/10" aria-label="Client Stories and Press">
      <div className="max-w-5xl mx-auto text-center">
        <Quote size={32} className="mx-auto mb-8 text-[#a39e93] opacity-60" />

        <div className="min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="text-2xl md:text-4xl font-light leading-snug mb-8 italic">
                “{current.quote}”
              </blockquote>
              <div className="text-xs uppercase tracking-[0.2em] text-[#a39e93]">
                <span className="text-[#f7f5f0] font-medium">{current.author}</span> · {current.location} — <em>{current.publication}</em>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${activeIndex === i ? 'w-10 bg-[#f7f5f0]' : 'w-3 bg-white/25 hover:bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Global top scroll progress bar
  const { scrollYProgress: globalScroll } = useScroll();
  const scaleX = useSpring(globalScroll, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  // ── Frame-sequence scroll animation (Apple-style) ───────────────────────
  // Frames: /frames/ezgif-frame-001.jpg … ezgif-frame-200.jpg (in public/)
  // All 200 Images are pre-loaded into memory on mount.
  // GSAP scrubs a proxy.frame value; on each tick we drawImage() — instant,
  // zero codec decode, zero stutter, full smooth scroll.
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = heroRef.current;
    if (!canvas || !section) return;

    const ctx2d = canvas.getContext('2d');
    const TOTAL = 200;
    const images = new Array(TOTAL);
    let killed = false;
    let currentRenderedIndex = 0;

    const pad = (n) => String(n).padStart(3, '0');

    // Draw frame on canvas with full cover fit:
    // Seamlessly covers the entire screen edge-to-edge with zero bars or gaps
    const drawFrame = (img) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return;

      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      // Full-screen cover: fills 100% of width and height edge-to-edge
      const scale = Math.max(cw / nw, ch / nh);
      const dw = nw * scale;
      const dh = nh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx2d.clearRect(0, 0, cw, ch);
      ctx2d.drawImage(img, dx, dy, dw, dh);
    };

    // Render target frame with instant fallback to nearest loaded frame
    const render = (targetIndex) => {
      const idx = Math.max(0, Math.min(TOTAL - 1, Math.round(targetIndex)));
      const targetImg = images[idx];
      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        currentRenderedIndex = idx;
        drawFrame(targetImg);
        return;
      }

      // Fallback: find nearest loaded frame so the screen never flickers or goes blank
      let nearest = currentRenderedIndex;
      let minDiff = Infinity;
      for (let i = 0; i < TOTAL; i++) {
        const item = images[i];
        if (item && item.complete && item.naturalWidth > 0) {
          const diff = Math.abs(i - idx);
          if (diff < minDiff) {
            minDiff = diff;
            nearest = i;
          }
        }
      }
      currentRenderedIndex = nearest;
      if (images[nearest]) {
        drawFrame(images[nearest]);
      }
    };

    // Size canvas accurately based on stage container & DPR
    const resizeCanvas = () => {
      const stage = canvas.parentElement || section;
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      render(currentRenderedIndex);
    };

    // Preload frame 1 immediately
    const firstImg = new Image();
    firstImg.src = `/frames/ezgif-frame-001.jpg`;
    images[0] = firstImg;
    firstImg.onload = () => {
      if (killed) return;
      resizeCanvas();
    };

    // Preload all remaining frames in parallel
    for (let i = 1; i < TOTAL; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${pad(i + 1)}.jpg`;
      images[i] = img;
    }

    // Set up GSAP ScrollTrigger
    const proxy = { frame: 0 };
    const gsapCtx = gsap.context(() => {
      gsap.to(proxy, {
        frame: TOTAL - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: () => {
            render(proxy.frame);
          },
        },
      });
    }, section);

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      killed = true;
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert();
      images.fill(null);
    };
  }, [reduceMotion]);

  return (
    <main className="home-page">
      {/* Subtle Architectural Scroll Progress Bar */}
      {!reduceMotion && (
        <motion.div
          style={{ scaleX, transformOrigin: '0%' }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#d4c5b0] z-50 pointer-events-none"
        />
      )}

      {/* 1. HERO SECTION — frame-sequence scroll animation */}
      <section ref={heroRef} className="home-hero">
        <div className="home-hero__stage">
          {/* Canvas displays pre-loaded frames as you scroll — zero stutter */}
          <canvas
            ref={canvasRef}
            className="home-hero__canvas"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* 2. EDITORIAL WORD-BY-WORD REVEAL */}
      <div id="our-story">
        <EditorialSection />
      </div>

      {/* 3. INFINITE MARQUEE */}
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

      {/* 4. INTERACTIVE SPACES SHOWCASE */}
      <SpacesShowcase />

      {/* 5. FULLSCREEN EXPANDING FEATURE */}
      <FullscreenFeature />

      {/* 6. NEW: INTERACTIVE MATERIALITY & FINISHES EXPLORER */}
      <MaterialitySection />

      {/* 7. COLLECTIONS GRID */}
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

      {/* 8. CRAFTSMANSHIP SECTION */}
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

      {/* 9. NEW: 4-STEP CLIENT PROCESS JOURNEY */}
      <ProcessSection />

      {/* 10. NEW: PRESS & CLIENT TESTIMONIALS */}
      <PressAndTestimonials />

      {/* 11. FINAL CONTACT CALL-TO-ACTION */}
      <section className="home-contact">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <p className="section-eyebrow">Your space, thoughtfully reimagined</p>
          <h2>Let’s design a kitchen<br /><em>that feels like yours.</em></h2>
          <MagneticButton>
            <Link to="/contact" className="home-contact__button">
              Book a consultation <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </MagneticButton>
        </motion.div>
      </section>
    </main>
  );
}
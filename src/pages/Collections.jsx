import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import kitchenOne from '../../images/kitchen-01.avif';
import kitchenTwo from '../../images/kitchen-02.avif';
import heroKitchen from '../../images/hero-kitchen.avif';
import kitchenWardrobe from '../../images/collection-wardrobes.webp';
import storageDetail from '../../images/about-interior.avif';

const CATEGORIES = ['All', 'Kitchens', 'Kitchen wardrobes', 'Materials & finishes', 'Smart storage'];

const COLLECTIONS = [
  {
    id: 1,
    title: 'The contemporary kitchen',
    category: 'Kitchens',
    subtitle: 'A balanced meeting of form and function',
    desc: 'A tailored modular kitchen brings clean architectural lines together with practical work zones, refined finishes, and space to gather.',
    image: heroKitchen,
    specs: ['Layout planned for your space', 'Island and peninsula options', 'Coordinated cabinetry and work surfaces'],
  },
  {
    id: 2,
    title: 'The warm minimal kitchen',
    category: 'Kitchens',
    subtitle: 'Quiet lines, natural character',
    desc: 'A thoughtful mix of warm wood tones and calm surfaces creates a contemporary kitchen with a welcoming, lived-in feel.',
    image: kitchenTwo,
    specs: ['Wood-look and neutral finish palettes', 'Integrated storage planning', 'Details coordinated across the space'],
  },
  {
    id: 3,
    title: 'Kitchen wardrobes',
    category: 'Kitchen wardrobes',
    subtitle: 'A considered place for everything',
    desc: 'Bring order to the kitchen with cabinetry designed to make everyday essentials easy to reach and the room feel beautifully resolved.',
    image: kitchenWardrobe,
    specs: ['Storage planned around daily routines', 'Open and closed storage options', 'Finish choices that complement your kitchen'],
  },
  {
    id: 4,
    title: 'Materials & finishes',
    category: 'Materials & finishes',
    subtitle: 'Texture, tone, and lasting appeal',
    desc: 'Explore a considered language of cabinetry, worktop, and hardware finishes to bring warmth and character to your kitchen.',
    image: kitchenOne,
    specs: ['Coordinated surface and cabinet tones', 'Natural and contemporary textures', 'Selected to suit your overall design'],
  },
  {
    id: 5,
    title: 'Intelligent storage',
    category: 'Smart storage',
    subtitle: 'The useful details, thoughtfully placed',
    desc: 'Make the most of your kitchen with storage ideas that bring everyday tools, ingredients, and essentials into easy reach.',
    image: storageDetail,
    specs: ['Storage zones planned with your layout', 'Space-conscious cabinet interiors', 'A place for everyday essentials'],
  },
];

function CollectionImageLayer({ item, index, count, progress }) {
  const segment = 1 / count;
  const fade = segment * 0.26;
  let inputRange;
  let outputRange;

  if (count === 1) {
    inputRange = [0, 1];
    outputRange = [1, 1];
  } else if (index === 0) {
    inputRange = [0, segment - fade / 2, segment + fade / 2];
    outputRange = [1, 1, 0];
  } else {
    const fadeStart = index * segment - fade / 2;
    const fadeEnd = index * segment + fade / 2;
    inputRange = [fadeStart, fadeEnd, 1];
    outputRange = [0, 1, 1];
  }

  const opacity = useTransform(progress, inputRange, outputRange);
  return (
    <motion.div
      className="collection-gallery__image-layer"
      style={{ opacity, zIndex: index + 1 }}
      aria-hidden="true"
    >
      <img
        src={item.image}
        alt=""
        className="collection-gallery__image-backdrop"
        loading={index === 0 ? 'eager' : 'lazy'}
      />
      <motion.img
        src={item.image}
        alt=""
        className="collection-gallery__image"
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchPriority={index === 0 ? 'high' : 'auto'}
      />
    </motion.div>
  );
}

export default function Collections() {
  const galleryRef = useRef(null);
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.includes(location.state?.category) ? location.state.category : 'All'
  );
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const filteredCollections = activeCategory === 'All'
    ? COLLECTIONS
    : COLLECTIONS.filter((item) => item.category === activeCategory);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start start', 'end end'],
  });
  const activeItem = filteredCollections[Math.min(activeSceneIndex, filteredCollections.length - 1)];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (CATEGORIES.includes(location.state?.category)) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    setActiveSceneIndex(0);
  }, [activeCategory]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIndex = Math.min(
      filteredCollections.length - 1,
      Math.floor(progress * filteredCollections.length)
    );
    setActiveSceneIndex((currentIndex) => (
      currentIndex === nextIndex ? currentIndex : nextIndex
    ));
  });

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSceneIndex(0);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <main className="collection-page">
      <section
        ref={galleryRef}
        className="collection-gallery"
        style={{ height: `${(filteredCollections.length + 1) * 100}svh` }}
        aria-label="Explore Altezza concepts"
      >
        <div className="collection-gallery__stage">
          {filteredCollections.map((item, index) => (
            <CollectionImageLayer
              key={item.id}
              item={item}
              index={index}
              count={filteredCollections.length}
              progress={scrollYProgress}
            />
          ))}
          <div className="collection-gallery__shade" />

          <div className="collection-gallery__content">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeItem.id}
                className="collection-gallery__copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="collection-gallery__eyebrow">
                  CONCEPT · {activeItem.category}
                </p>
                <h1>{activeItem.title}</h1>
                <p className="collection-gallery__subtitle">{activeItem.subtitle}</p>
                <button
                  type="button"
                  className="collection-gallery__explore"
                  onClick={() => setSelectedItem(activeItem)}
                >
                  Explore this design <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </motion.div>
            </AnimatePresence>

            <div
              className="collection-gallery__progress"
              role="img"
              aria-label={`Concept ${activeSceneIndex + 1} of ${filteredCollections.length}`}
            >
              <span className="collection-gallery__progress-current">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activeSceneIndex}
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {String(activeSceneIndex + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="collection-gallery__progress-total">
                / {String(filteredCollections.length).padStart(2, '0')}
              </span>
              <span className="collection-gallery__progress-ticks" aria-hidden="true">
                {filteredCollections.map((item, index) => (
                  <span
                    key={item.id}
                    className={index === activeSceneIndex ? 'is-active' : ''}
                  />
                ))}
              </span>
            </div>

            <div className="collection-gallery__filters" role="group" aria-label="Filter concepts">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={activeCategory === category}
                  className={`collection-gallery__filter${activeCategory === category ? ' is-active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8">
            <motion.button
              type="button"
              aria-label="Close design details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60"
            />
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="collection-detail-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 grid md:grid-cols-2"
            >
              <div className="relative min-h-64 md:min-h-full">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#9A7410] font-bold">{selectedItem.category}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-500 hover:text-black text-xl leading-none p-1"
                      aria-label="Close design details"
                    >
                      ×
                    </button>
                  </div>
                  <h2 id="collection-detail-title" className="text-3xl font-serif text-[#1A1A1A] mb-2">{selectedItem.title}</h2>
                  <p className="text-xs text-gray-500 tracking-wide uppercase mb-4">{selectedItem.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{selectedItem.desc}</p>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-black mb-3">Design considerations</h3>
                  <ul className="space-y-2 mb-8">
                    {selectedItem.specs.map((spec) => (
                      <li key={spec} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mr-2 mt-2 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  state={{ interest: selectedItem.title }}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#9A7410] text-white text-xs uppercase tracking-widest font-semibold text-center transition-colors"
                >
                  Book a design consultation
                </Link>
              </div>
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

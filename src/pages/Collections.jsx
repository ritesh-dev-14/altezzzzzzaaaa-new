import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    badge: 'Made around you',
    specs: ['Layout planned for your space', 'Island and peninsula options', 'Coordinated cabinetry and work surfaces'],
    colors: ['#EDE7D9', '#8C745B', '#343430'],
  },
  {
    id: 2,
    title: 'The warm minimal kitchen',
    category: 'Kitchens',
    subtitle: 'Quiet lines, natural character',
    desc: 'A thoughtful mix of warm wood tones and calm surfaces creates a contemporary kitchen with a welcoming, lived-in feel.',
    image: kitchenTwo,
    badge: 'Considered materials',
    specs: ['Wood-look and neutral finish palettes', 'Integrated storage planning', 'Details coordinated across the space'],
    colors: ['#C4A980', '#E3D8C8', '#77736B'],
  },
  {
    id: 3,
    title: 'Kitchen wardrobes',
    category: 'Kitchen wardrobes',
    subtitle: 'A considered place for everything',
    desc: 'Bring order to the kitchen with cabinetry designed to make everyday essentials easy to reach and the room feel beautifully resolved.',
    image: kitchenWardrobe,
    badge: 'Thoughtful storage',
    specs: ['Storage planned around daily routines', 'Open and closed storage options', 'Finish choices that complement your kitchen'],
    colors: ['#D8C4A7', '#8A735E', '#F3F0E8'],
  },
  {
    id: 4,
    title: 'Materials & finishes',
    category: 'Materials & finishes',
    subtitle: 'Texture, tone, and lasting appeal',
    desc: 'Explore a considered language of cabinetry, worktop, and hardware finishes to bring warmth and character to your kitchen.',
    image: kitchenOne,
    badge: 'A personal palette',
    specs: ['Coordinated surface and cabinet tones', 'Natural and contemporary textures', 'Selected to suit your overall design'],
    colors: ['#E6DFD2', '#9A8061', '#56544F'],
  },
  {
    id: 5,
    title: 'Intelligent storage',
    category: 'Smart storage',
    subtitle: 'The useful details, thoughtfully placed',
    desc: 'Make the most of your kitchen with storage ideas that bring everyday tools, ingredients, and essentials into easy reach.',
    image: storageDetail,
    badge: 'Designed for daily use',
    specs: ['Storage zones planned with your layout', 'Space-conscious cabinet interiors', 'A place for everyday essentials'],
    colors: ['#B69A76', '#E8E2D6', '#6D675D'],
  },
];

export default function Collections() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.includes(location.state?.category) ? location.state.category : 'All'
  );
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (CATEGORIES.includes(location.state?.category)) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  const filteredCollections = activeCategory === 'All'
    ? COLLECTIONS
    : COLLECTIONS.filter((item) => item.category === activeCategory);

  return (
    <main className="py-24 bg-[#FAF8F5] min-h-screen text-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-3"
          >
            ALTEZZA · KITCHEN WARDROBE
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light text-[#1A1A1A] mb-5 tracking-tight"
          >
            Kitchens, made personal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed text-base md:text-lg"
          >
            Explore modular kitchens and kitchen wardrobes shaped by considered
            layouts, purposeful storage, and materials chosen to feel at home.
          </motion.p>
          <div className="h-[2px] w-16 bg-[#C5A059] mx-auto mt-8 opacity-70" />
        </header>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16" aria-label="Filter kitchen designs">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`px-5 py-2 text-xs md:text-sm uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-black border border-gray-200/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredCollections.map((item) => (
              <motion.button
                type="button"
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className="group text-left cursor-pointer bg-white overflow-hidden border border-black/5 flex flex-col"
                aria-label={`View ${item.title}`}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 text-[10px] uppercase tracking-widest text-[#1A1A1A] font-semibold px-3 py-1.5">
                    {item.badge}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-white/95 text-xs uppercase tracking-widest font-medium text-[#1A1A1A] px-4 py-2">
                    Explore design
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#9A7410] font-semibold">{item.category}</span>
                    <h2 className="text-2xl font-serif text-[#1A1A1A] mt-2 mb-2 group-hover:text-[#9A7410] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider">Finish palette</span>
                    <div className="flex gap-1.5" aria-label="Suggested finish palette">
                      {item.colors.map((color) => (
                        <span
                          key={color}
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
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
                <img src={selectedItem.image} alt={selectedItem.title} className="absolute inset-0 w-full h-full object-cover" />
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

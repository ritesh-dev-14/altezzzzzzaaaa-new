import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { NAV_LINKS } from '../data/constants';
import logo from '../../images/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const toggleButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const updateScrollState = () => {
      const frameSequence = document.querySelector('.home-hero');
      const colorThreshold = frameSequence
        ? frameSequence.getBoundingClientRect().bottom + window.scrollY
        : 24;

      setIsScrolled(window.scrollY >= colorThreshold);
    };
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="site-nav__brand" aria-label="Altezza home">
          <img src={logo} alt="ALTEZZA — Kitchen Wardrobe" />
        </Link>

        <p className="site-nav__note">Kitchens &amp; wardrobes<br />made around you</p>

        <button
          ref={toggleButtonRef}
          className={`site-nav__toggle${isOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="site-nav__toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>
    </header>
    {createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="site-menu-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          >
            <button
              className="site-menu-backdrop"
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              id="site-menu"
              className="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="site-menu__top">
                <Link
                  to="/"
                  className="site-menu__brand"
                  onClick={() => setIsOpen(false)}
                  aria-label="Altezza home"
                >
                  <img src={logo} alt="ALTEZZA — Kitchen Wardrobe" />
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="site-menu__close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <span />
                  <span />
                </button>
              </div>

              <div className="site-menu__content">
                <p className="site-menu__eyebrow">Thoughtful kitchens. Considered living.</p>
                <div className="site-menu__links">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.09, duration: 0.55 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`site-menu__link${location.pathname === link.path ? ' is-current' : ''}`}
                        aria-current={location.pathname === link.path ? 'page' : undefined}
                      >
                        <span className="site-menu__number">0{index + 1}</span>
                        <span className="site-menu__name">{link.name}</span>
                        <ArrowUpRight className="site-menu__arrow" size={24} aria-hidden="true" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="site-menu__bottom">
                <span>ALTEZZA · KITCHEN WARDROBE</span>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Plan your kitchen <ArrowDownRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}

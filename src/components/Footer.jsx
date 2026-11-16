import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, NAV_LINKS } from '../data/constants';
import logo from '../../images/logo.png';

const collectionLinks = [
  { label: 'Modular kitchens', category: 'Kitchens' },
  { label: 'Kitchen wardrobes', category: 'Kitchen wardrobes' },
  { label: 'Materials & finishes', category: 'Materials & finishes' },
  { label: 'Smart storage', category: 'Smart storage' },
];

export default function Footer() {
  return (
    <footer className="site-footer bg-[#EDE7D9] text-[#171717] pt-20 pb-10 px-6 md:px-12 border-t-2 border-[#E6B51A]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        <div className="space-y-6">
          <img
            src={logo}
            alt="ALTEZZA — Kitchen Wardrobe"
            className="h-[58px] w-[210px] object-contain object-left"
          />
          <p className="text-[#77736B] text-sm leading-relaxed pr-4">
            {COMPANY_INFO.tagline}. Thoughtfully designed modular kitchens and
            kitchen wardrobes, made around the way you live.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-6">Explore</h3>
          <ul className="space-y-4">
            {NAV_LINKS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-[#77736B] hover:text-[#171717] transition-colors text-sm"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-6">Designed for living</h3>
          <ul className="space-y-4">
            {collectionLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to="/collections"
                  state={{ category: item.category }}
                  className="text-[#77736B] hover:text-[#171717] transition-colors text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-6">Start a conversation</h3>
          <p className="text-[#77736B] text-sm leading-relaxed mb-5">
            Tell us about your space, your plans, and what you need from your
            kitchen.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#8E7010] transition-colors"
          >
            Book a consultation <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#171717]/15 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#77736B] text-xs">
          © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
        </p>
        <span className="text-[#77736B] text-xs uppercase tracking-[0.18em]">
          {COMPANY_INFO.descriptor}
        </span>
      </div>
    </footer>
  );
}

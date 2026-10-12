'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AcademicCapIcon,
  Bars3Icon,
  CubeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { navigationData } from '@/data/navigationData';

const iconMap = {
  HomeIcon,
  ViewGridIcon: Squares2X2Icon,
  CubeIcon,
  CollectionIcon: RectangleGroupIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  EnvelopeIcon,
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [nav] = navigationData;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav className="glass sticky top-3 z-40 mx-3 flex items-center justify-between rounded-full px-5 py-3 font-mona lg:grid lg:grid-cols-[210px_minmax(0,1fr)_auto]" aria-label="Main navigation">
      <Link href={nav.brandHref} className="flex items-center text-lg font-semibold" aria-label={`${nav.brand} home`}>
        <span className="text-[#ff5964]">&lt;/&gt;</span>
        <span className="ml-2 text-white">{nav.brand}</span>
      </Link>

      <div className="hidden items-center justify-center gap-1 lg:flex">
        {nav.items.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-11 items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {isActive ? (
                <motion.span
                  layoutId="desktop-active-route"
                  className="nav-active-pill absolute inset-0"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 34, mass: 0.75 }}
                />
              ) : null}
              {Icon ? <Icon className="relative z-10 h-4 w-4 stroke-1" aria-hidden="true" /> : null}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <a href={nav.resumeHref} target="_blank" rel="noopener noreferrer" className="secondary-button hidden px-5 py-2 text-sm lg:inline-flex">
        {nav.resumeLabel}
      </a>

      <button type="button" className="lg:hidden" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((value) => !value)}>
        <Bars3Icon className="h-6 w-6 text-slate-200" aria-hidden="true" />
      </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 2.25rem) 2.25rem)' }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: 'circle(150% at calc(100% - 2.25rem) 2.25rem)' }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 2.25rem) 2.25rem)' }}
            transition={{ duration: reduceMotion ? 0.15 : 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-menu-glass fixed inset-0 z-[180] flex min-h-dvh flex-col overflow-y-auto px-6 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Link href={nav.brandHref} className="flex items-center text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>
                <span className="text-[#ff5964]">&lt;/&gt;</span>
                <span className="ml-2 text-white">{nav.brand}</span>
              </Link>
              <button type="button" onClick={() => setIsMenuOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-slate-200 backdrop-blur-xl" aria-label="Close menu">
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-1 py-8" role="navigation" aria-label="Mobile navigation">
              {nav.items.map((item, index) => {
                const isActive = pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.055, duration: 0.45 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={item.path}
                      aria-current={isActive ? 'page' : undefined}
                      className={`mobile-menu-link inline-flex justify-center ${isActive ? 'is-active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <a href={nav.resumeHref} target="_blank" rel="noopener noreferrer" className="secondary-button mx-auto px-7 py-3" onClick={() => setIsMenuOpen(false)}>
              {nav.resumeLabel}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

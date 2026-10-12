'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const sessionKey = 'malik-kashif-preloader-seen';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(sessionKey)) {
      setVisible(false);
      return undefined;
    }

    sessionStorage.setItem(sessionKey, 'true');
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 150 : 950);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-label="Loading Malik Kashif Portfolio"
          initial={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[250] grid min-h-dvh place-items-center overflow-hidden bg-[#070812]"
        >
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="font-mona text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              MALIK KASHIF
            </div>
            <div className="mt-2 text-xs font-semibold tracking-[0.42em] text-slate-400 sm:text-sm">
              PORTFOLIO
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.65, delay: reduceMotion ? 0 : 0.18 }}
              className="mx-auto mt-7 h-px w-32 origin-left bg-gradient-to-r from-[#ff4d59] via-[#5b8cff] to-[#9b7cff]"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

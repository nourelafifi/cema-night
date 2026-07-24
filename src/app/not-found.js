'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm,
  faHouse,
  faArrowLeft,
  faClapperboard
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight text-ivory flex flex-col justify-between selection:bg-cinema-gold selection:text-midnight overflow-hidden relative">
      <Navbar />

      {/* Ambient Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cinema-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="flex-1 flex items-center justify-center px-6 py-20 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          
          {/* Animated 404 Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative inline-block"
          >
            <span className="text-9xl sm:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-cinema-gold/80 via-soft-gold/30 to-transparent select-none leading-none">
              404
            </span>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-charcoal/90 border border-dark-gray shadow-2xl backdrop-blur-md flex items-center justify-center text-cinema-gold shadow-cinema-gold/10"
              >
                <FontAwesomeIcon icon={faFilm} className="text-3xl sm:text-4xl" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal/80 border border-dark-gray text-xs font-semibold text-cinema-gold uppercase tracking-widest">
              <FontAwesomeIcon icon={faClapperboard} className="text-xs" />
              <span>Scene Missing</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ivory">
              Lost on the Cutting Room Floor
            </h1>

            <p className="text-muted-gray text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              The page or reel you are looking for has been moved, deleted, or never made it to final cut.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/"
              className="w-full sm:w-auto bg-cinema-gold hover:bg-warm-amber text-midnight font-bold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-cinema-gold/20 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Return to Homepage</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto bg-charcoal/90 hover:bg-slate-dark text-ivory border border-dark-gray hover:border-cinema-gold/50 font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 text-sm backdrop-blur-md"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Go Back</span>
            </button>
          </motion.div>

        </div>
      </main>

      {/* Footer bar */}
      <footer className="py-6 text-center text-xs text-muted-gray border-t border-dark-gray/40 relative z-10">
        <p>Looking for a specific film? Return home to search available titles.</p>
      </footer>
    </div>
  );
}
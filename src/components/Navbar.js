'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTicket, faUser, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-midnight/90 backdrop-blur-md border-b border-dark-border py-3' : 'bg-gradient-to-b from-midnight/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber flex items-center justify-center text-midnight font-bold shadow-gold-glow group-hover:scale-105 transition-transform">
            <FontAwesomeIcon icon={faFilm} className="text-xl" />
          </div>
          <span className="text-2xl font-black tracking-wider text-ivory">
            CEMA <span className="text-gold">NIGHT</span>
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">

          <Link
            href="/#now-showing"
            className="flex items-center gap-2 bg-gradient-to-r from-gold to-amber text-midnight font-bold px-5 py-2.5 rounded-xl hover:shadow-gold-glow hover:scale-105 transition-all text-sm"
          >
            <FontAwesomeIcon icon={faTicket} />
            <span>Book Tickets</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import HeroBanner from '@/components/HeroBanner';
import TrailerModal from '@/components/TrailerModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faTv, faCouch } from '@fortawesome/free-solid-svg-icons';
import { movies } from '@/data/moviesData';

export default function HomePage() {
  const [activeTrailer, setActiveTrailer] = useState(null);

  return (
    <div className="min-h-screen bg-midnight text-ivory">
      <Navbar />

      {/* Hero Section */}
      <HeroBanner onOpenTrailer={(url) => setActiveTrailer(url)} />

      {/* Movie Grid Section */}
      <MovieGrid 
        movies={movies} 
        onOpenTrailer={(url) => setActiveTrailer(url)} 
      />

      {/* Premium Features Section */}
      <section className="bg-charcoal/50 border-y border-dark-border py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cinema-gold uppercase tracking-widest text-xs font-bold">Unrivaled Quality</span>
            <h2 className="text-3xl font-extrabold text-ivory mt-2">The Cema Night Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-card p-8 rounded-2xl border border-dark-border space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cinema-gold/10 text-cinema-gold flex items-center justify-center text-xl">
                <FontAwesomeIcon icon={faTv} />
              </div>
              <h3 className="text-xl font-bold text-ivory">4K Laser IMAX</h3>
              <p className="text-muted-gray text-sm">
                Crystal-clear dual 4K laser projection delivering vibrant colors and deep blacks.
              </p>
            </div>

            <div className="bg-slate-card p-8 rounded-2xl border border-dark-border space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cinema-gold/10 text-cinema-gold flex items-center justify-center text-xl">
                <FontAwesomeIcon icon={faCouch} />
              </div>
              <h3 className="text-xl font-bold text-ivory">VIP Recliners</h3>
              <p className="text-muted-gray text-sm">
                Motorized plush leather seats with built-in seat warmers and wireless phone charging.
              </p>
            </div>

            <div className="bg-slate-card p-8 rounded-2xl border border-dark-border space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cinema-gold/10 text-cinema-gold flex items-center justify-center text-xl">
                <FontAwesomeIcon icon={faCrown} />
              </div>
              <h3 className="text-xl font-bold text-ivory">In-Seat Gourmet Dining</h3>
              <p className="text-muted-gray text-sm">
                Order artisan snacks, craft beverages, and warm snacks directly from your seat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      <TrailerModal
        trailerUrl={activeTrailer}
        onClose={() => setActiveTrailer(null)}
      />

      {/* Footer */}
      <footer className="bg-midnight border-t border-dark-border py-12 text-sm text-muted-gray">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p>© 2026 Cema Night. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cinema-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cinema-gold transition-colors">Terms of Service</a>
            <a href="/admin" className="hover:text-cinema-gold transition-colors font-semibold">Admin Panel</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
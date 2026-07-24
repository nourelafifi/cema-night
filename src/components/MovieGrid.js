'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

export default function MovieGrid({ movies = [], onOpenTrailer }) {
  const [activeTab, setActiveTab] = useState('now-showing');

  const filteredMovies = movies.filter((movie) =>
    activeTab === 'now-showing' ? movie.isNowShowing : !movie.isNowShowing
  );

  return (
    <section id="now-showing" className="max-w-7xl mx-auto px-6 py-20">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-gold uppercase tracking-widest text-xs font-bold">Curated Screenings</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-ivory mt-1">What's On Screen</h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-charcoal border border-dark-border rounded-xl self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('now-showing')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'now-showing'
                ? 'bg-gold text-midnight shadow-md'
                : 'text-muted-gray hover:text-ivory'
            }`}
          >
            Now Showing
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('coming-soon')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'coming-soon'
                ? 'bg-gold text-midnight shadow-md'
                : 'text-muted-gray hover:text-ivory'
            }`}
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* Grid List */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="group relative bg-slate-card rounded-2xl overflow-hidden border border-dark-border hover:border-gold/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
            >
              {/* Movie Poster Box */}
              <div className="relative aspect-[2/3] bg-charcoal overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Poster Link Overlay (clicking empty area goes to movie page) */}
                <Link
                  href={`/movie/${movie.id}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View details for ${movie.title}`}
                />

                {/* Hover Overlay with Play Button */}
                <div className="absolute inset-0 bg-midnight/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-6 text-center pointer-events-none z-10">
                  {/* Play Button - Stop propagation so it opens modal without navigating */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenTrailer?.(movie.trailerUrl);
                    }}
                    className="w-14 h-14 rounded-full bg-gold text-midnight flex items-center justify-center text-lg hover:scale-110 transition-transform shadow-gold-glow pointer-events-auto cursor-pointer"
                    aria-label={`Watch trailer for ${movie.title}`}
                  >
                    <FontAwesomeIcon icon={faPlay} className="ml-1" />
                  </button>

                  <p className="text-xs text-soft-gold line-clamp-3 pointer-events-auto">
                    {movie.synopsis}
                  </p>
                </div>

                {/* Format Badge */}
                <div className="absolute top-3 left-3 bg-midnight/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-dark-border text-xs font-semibold text-gold pointer-events-none z-20">
                  {movie.format || 'IMAX 3D'}
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs text-muted-gray font-medium">{movie.genre}</span>
                  <div className="flex items-center gap-1 text-gold text-xs font-bold">
                    <FontAwesomeIcon icon={faStar} />
                    <span>{movie.rating}</span>
                  </div>
                </div>

                {/* Movie Title -> Goes to /movie/[id] */}
                <h3 className="text-lg font-bold text-ivory truncate group-hover:text-gold transition-colors">
                  <Link href={`/movie/${movie.id}`} className="hover:underline">
                    {movie.title}
                  </Link>
                </h3>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border/60 text-xs text-muted-gray">
                  <span>{movie.duration}</span>

                  {/* Book Button -> Goes to /booking/[id] */}
                  <Link
                    href={`/movie/${movie.id}/booking`}
                    className="flex items-center gap-1.5 font-bold text-gold hover:text-soft-gold transition-colors"
                  >
                    <FontAwesomeIcon icon={faTicketAlt} />
                    <span>Book</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
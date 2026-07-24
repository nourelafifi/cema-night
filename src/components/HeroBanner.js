'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTicket, faStar, faClock, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { movies } from '@/data/moviesData';

export default function HeroBanner({ onOpenTrailer, featuredMovies }) {
  // Use custom featured movies if passed, otherwise grab top featured ones from data file
  const heroMovies = useMemo(() => {
    if (featuredMovies && featuredMovies.length > 0) return featuredMovies;

    // Grab first 3 now-showing or top-rated movies from data file
    return movies.slice(0, 3).map((m) => ({
      id: m.id,
      title: m.title,
      genre: m.genre,
      rating: m.rating,
      duration: m.duration,
      description: m.synopsis,
      backdrop: m.images?.[0] || m.poster,
      trailerUrl: m.trailerUrl,
      format: m.format,
    }));
  }, [featuredMovies]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
  }, [heroMovies.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  }, [heroMovies.length]);

  useEffect(() => {
    if (isPaused || heroMovies.length <= 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, heroMovies.length]);

  const activeMovie = heroMovies[currentIndex];

  if (!activeMovie) return null;

  return (
    <section
      className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-midnight select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMovie.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeMovie.backdrop})` }}
        >
          {/* Multi-Layer Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/55 via-transparent to-midnight" />

          {/* Hero Content Container */}
          <div className="max-w-7xl mx-auto h-full px-6 flex items-center relative z-10">
            <div className="max-w-2xl space-y-6 pt-12">
              
              {/* Badges & Meta */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 text-xs font-semibold"
              >
                <span className="bg-cinema-gold/20 text-cinema-gold px-3.5 py-1 rounded-full border border-cinema-gold/40 shadow-sm">
                  Featured Screening
                </span>
                <span className="bg-charcoal/80 text-ivory px-3 py-1 rounded-md border border-dark-gray">
                  {activeMovie.genre}
                </span>
                <span className="text-muted-gray flex items-center gap-1.5 ml-1">
                  <FontAwesomeIcon icon={faStar} className="text-cinema-gold text-xs" />
                  <strong className="text-ivory">{activeMovie.rating}</strong>
                </span>
                <span className="text-dark-gray">•</span>
                <span className="text-muted-gray flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faClock} className="text-xs text-muted-gray" />
                  {activeMovie.duration}
                </span>
              </motion.div>

              {/* Title Linked directly to Movie Detail Page */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-ivory leading-[1.05] drop-shadow-lg"
              >
                <Link
                  href={`/movie/${activeMovie.id}`}
                  className="hover:text-cinema-gold transition-colors inline-block"
                >
                  {activeMovie.title}
                </Link>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm sm:text-base text-muted-gray leading-relaxed max-w-xl line-clamp-3"
              >
                {activeMovie.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  href={`/movie/${activeMovie.id}`}
                  className="bg-cinema-gold hover:bg-warm-amber text-midnight font-bold px-7 py-3.5 rounded-xl flex items-center gap-2.5 shadow-lg shadow-cinema-gold/20 transition-all hover:scale-105 active:scale-95"
                >
                  <FontAwesomeIcon icon={faTicket} />
                  <span>Get Tickets</span>
                </Link>

                <button
                  onClick={() => onOpenTrailer && onOpenTrailer(activeMovie.trailerUrl)}
                  className="bg-charcoal/90 hover:bg-slate-dark text-ivory border border-dark-gray hover:border-cinema-gold/60 font-medium px-6 py-3.5 rounded-xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-cinema-gold text-xs" />
                  <span>Watch Trailer</span>
                </button>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Slide Arrows (Desktop) */}
      <div className="absolute bottom-8 left-6 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-xl bg-charcoal/80 border border-dark-gray text-ivory hover:text-cinema-gold hover:border-cinema-gold/50 flex items-center justify-center transition-all backdrop-blur-md"
          aria-label="Previous Slide"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-xl bg-charcoal/80 border border-dark-gray text-ivory hover:text-cinema-gold hover:border-cinema-gold/50 flex items-center justify-center transition-all backdrop-blur-md"
          aria-label="Next Slide"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </button>
      </div>

      {/* Slider Indicators & Progress */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3">
        {heroMovies.map((movie, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={movie.id}
              onClick={() => setCurrentIndex(idx)}
              className="relative h-2.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
              style={{ width: isActive ? '2.5rem' : '0.625rem' }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className={`absolute inset-0 ${isActive ? 'bg-cinema-gold' : 'bg-dark-gray hover:bg-muted-gray'}`} />
              {isActive && !isPaused && (
                <motion.span
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 7, ease: 'linear' }}
                  className="absolute inset-0 bg-soft-gold"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
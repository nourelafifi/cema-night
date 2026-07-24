'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faClock,
  faPlay,
  faTicket,
  faExpand,
  faXmark,
  faBookmark,
  faFilm
} from '@fortawesome/free-solid-svg-icons';

import { getMovieById } from '@/data/moviesData'; // Update import path if needed
import Navbar from '@/components/Navbar';
import TrailerModal from '@/components/TrailerModal';

export default function MoviePage({ params }) {
  // Unwrap params for Next.js 15+ compatibility
  const resolvedParams = params?.then ? use(params) : params;
  const movie = getMovieById(resolvedParams?.id);

  const [activeTrailer, setActiveTrailer] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);

  // Keyboard shortcut (ESC) & Body Scroll Lock for modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
        setActiveTrailer(null);
      }
    };

    if (lightboxImage || activeTrailer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage, activeTrailer]);

  // Handle 404 / Missing Movie State
  if (!movie) {
    return (
      <div className="min-h-screen bg-midnight text-ivory flex flex-col items-center justify-center p-6 text-center">
        <Navbar />
        <div className="space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-charcoal border border-dark-gray flex items-center justify-center mx-auto text-cinema-gold text-2xl">
            <FontAwesomeIcon icon={faFilm} />
          </div>
          <h1 className="text-3xl font-bold">Movie Not Found</h1>
          <p className="text-muted-gray text-sm">
            We couldn't find the movie you were looking for. It may have been removed or the URL might be invalid.
          </p>
          <Link
            href="/"
            className="inline-block bg-cinema-gold hover:bg-warm-amber text-midnight font-bold px-6 py-3 rounded-xl transition-all"
          >
            Return to Movies
          </Link>
        </div>
      </div>
    );
  }

  // Parse genres from string "Sci-Fi / Adventure" -> ["Sci-Fi", "Adventure"]
  const genres = Array.isArray(movie.genre)
    ? movie.genre
    : typeof movie.genre === 'string'
      ? movie.genre.split('/').map((g) => g.trim())
      : [];

  const isNowShowing = Boolean(movie.isNowShowing);

  return (
    <div className="min-h-screen bg-midnight text-ivory selection:bg-cinema-gold selection:text-midnight">
      <Navbar />

      {/* 1. HERO BACKDROP SECTION */}
      <section className="relative pt-20 min-h-[70vh] lg:min-h-[75vh] flex items-end justify-center overflow-hidden">
        {movie.images?.[0] && (
          <div className="absolute inset-0">
            <Image
              src={movie.images[0]}
              alt={movie.title}
              fill
              priority
              className="object-cover scale-105 filter blur-[1px] brightness-75"
              sizes="100vw"
            />
            {/* Gradients to smooth into dark background */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-midnight/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/70 to-transparent" />
          </div>
        )}

        <div className="max-w-7xl mx-auto w-full px-6 pb-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* Poster Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 lg:col-span-3 hidden md:block"
          >
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-dark-gray shadow-2xl group">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <div className="absolute top-3 left-3 bg-midnight/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-cinema-gold border border-dark-gray">
                {movie.format}
              </div>
            </div>
          </motion.div>

          {/* Details & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-8 lg:col-span-9 space-y-5"
          >
            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span
                className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] ${
                  isNowShowing
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {isNowShowing ? 'Now Showing' : 'Coming Soon'}
              </span>

              {genres.map((g) => (
                <span
                  key={g}
                  className="bg-charcoal/80 text-soft-gold border border-dark-gray px-3 py-1 rounded-full font-medium"
                >
                  {g}
                </span>
              ))}

              <span className="text-dark-gray hidden sm:inline">•</span>

              <div className="flex items-center gap-1.5 text-cinema-gold font-bold">
                <FontAwesomeIcon icon={faStar} />
                <span>{movie.rating}</span>
                <span className="text-xs text-muted-gray font-normal">/10</span>
              </div>

              <span className="text-dark-gray hidden sm:inline">•</span>

              <span className="text-muted-gray flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} /> {movie.duration}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ivory leading-tight">
                {movie.title}
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {isNowShowing ? (
                <Link
                  href={`/movie/${movie.id}/booking`}
                  className="bg-gradient-to-r from-gold to-amber text-midnight font-bold px-7 py-3.5 rounded-xl flex items-center gap-2.5 shadow-lg shadow-cinema-gold/20 transition-all hover:scale-105 active:scale-95 text-sm"
                >
                  <FontAwesomeIcon icon={faTicket} />
                  <span>Book Tickets</span>
                </Link>
              ) : (
                <button
                  disabled
                  className="bg-charcoal/60 text-muted-gray border border-dark-gray font-bold px-7 py-3.5 rounded-xl flex items-center gap-2.5 cursor-not-allowed opacity-70 text-sm"
                >
                  <FontAwesomeIcon icon={faTicket} />
                  <span>Tickets Available Soon</span>
                </button>
              )}

              {movie.trailerUrl && (
                <button
                  onClick={() => setActiveTrailer(movie.trailerUrl)}
                  className="bg-charcoal/90 hover:bg-slate-dark text-ivory border border-dark-gray hover:border-cinema-gold/50 font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 text-sm backdrop-blur-md"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-cinema-gold text-xs" />
                  <span>Watch Trailer</span>
                </button>
              )}

              <button
                onClick={() => setBookmarked(!bookmarked)}
                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark movie'}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                  bookmarked
                    ? 'bg-cinema-gold/20 text-cinema-gold border-cinema-gold'
                    : 'bg-charcoal/90 text-muted-gray border-dark-gray hover:text-ivory'
                }`}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SYNOPSIS & CAST SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Story Overview */}
        <div className={movie.cast?.length ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 space-y-6'}>
          <h2 className="text-2xl font-bold text-ivory border-l-4 border-cinema-gold pl-4">
            Story Overview
          </h2>
          <p className="text-muted-gray leading-relaxed text-base sm:text-lg">
            {movie.synopsis}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-dark-gray/60">
            <div>
              <span className="text-xs text-muted-gray block mb-1">Projection Format</span>
              <strong className="text-sm text-ivory font-semibold">{movie.format}</strong>
            </div>
            <div>
              <span className="text-xs text-muted-gray block mb-1">Genre</span>
              <strong className="text-sm text-ivory font-semibold">{movie.genre}</strong>
            </div>
            <div>
              <span className="text-xs text-muted-gray block mb-1">Duration</span>
              <strong className="text-sm text-ivory font-semibold">{movie.duration}</strong>
            </div>
          </div>
        </div>

        {/* Cast Grid */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold text-ivory border-l-4 border-cinema-gold pl-4">
              Top Cast
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {movie.cast.map((member, index) => (
                <div
                  key={member.name || index}
                  className="flex items-center gap-3 p-2.5 bg-charcoal/80 border border-dark-gray rounded-xl hover:border-cinema-gold/40 transition-colors"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-dark-gray flex-shrink-0 bg-midnight">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-gray">
                        N/A
                      </div>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-ivory truncate">{member.name}</h4>
                    <p className="text-[11px] text-muted-gray truncate">{member.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. GALLERY / BACKDROPS */}
      {movie.images && movie.images.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-dark-gray/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-cinema-gold uppercase tracking-widest text-xs font-bold">
                Gallery
              </span>
              <h2 className="text-2xl font-bold text-ivory mt-0.5">Stills & Backdrops</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {movie.images.map((imgUrl, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  setLightboxImage({
                    url: imgUrl,
                    caption: `${movie.title} — Still ${index + 1}`
                  })
                }
                className="relative aspect-video rounded-xl overflow-hidden bg-charcoal border border-dark-gray cursor-pointer group"
              >
                <Image
                  src={imgUrl}
                  alt={`${movie.title} still ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-midnight/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cinema-gold text-lg z-10">
                  <FontAwesomeIcon icon={faExpand} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="absolute inset-0 bg-midnight/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full bg-charcoal border border-dark-gray rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setLightboxImage(null)}
                aria-label="Close image preview"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-midnight/80 border border-dark-gray text-ivory hover:text-cinema-gold transition-colors flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <div className="relative w-full h-[65vh] min-h-[300px]">
                <Image
                  src={lightboxImage.url}
                  alt={lightboxImage.caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
              </div>
              <div className="p-4 bg-midnight text-center border-t border-dark-gray">
                <p className="text-sm font-semibold text-soft-gold">{lightboxImage.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TRAILER MODAL */}
      <TrailerModal trailerUrl={activeTrailer} onClose={() => setActiveTrailer(null)} />
    </div>
  );
}
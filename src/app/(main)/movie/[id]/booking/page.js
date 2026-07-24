'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCalendarDays,
  faClock,
  faCouch,
  faCheck,
  faTicket,
  faFilm,
  faCircleInfo,
  faCreditCard,
  faChevronRight,
  faXmark,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

// --- DATA IMPORTS ---
import { movies, getMovieById } from '@/data/moviesData';
import { HALLS } from '@/data/hallsData';
import { SHOWTIMES, OCCUPIED_SEATS } from '@/data/scheduales';

// Grid Configuration: 6 Rows (A to F), 10 Seats per row
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 10;

// Helper to format YYYY-MM-DD into structured display date
function formatScheduleDate(dateStr) {
  if (!dateStr) return { id: '', dayName: 'N/A', dayNum: '--', month: '' };
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return {
    id: dateStr,
    dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
    dayNum: String(day).padStart(2, '0'),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    fullDateStr: dateStr,
  };
}

export default function BookingPage({ movie }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // 1. Extract route params
  const routeMovieId = params?.id || params?.movieId || params?.slug || searchParams.get('id');

  // 2. Resolve Active Movie
  const activeMovie = useMemo(() => {
    if (movie) return movie;

    if (routeMovieId) {
      const foundMovie = getMovieById ? getMovieById(routeMovieId) : movies?.find(m => m.id === routeMovieId);
      if (foundMovie) return foundMovie;
    }

    // Fallback if movie not found in dataset
    const queryTitle = searchParams.get('title');
    const queryPoster = searchParams.get('poster');
    const queryGenre = searchParams.get('genre');
    const queryRating = searchParams.get('rating');

    const formattedTitle = routeMovieId
      ? String(routeMovieId)
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : 'Dune: Part Two';

    return {
      id: routeMovieId || 'dune-part-two',
      title: queryTitle || formattedTitle,
      genre: queryGenre || 'Sci-Fi / Adventure',
      rating: queryRating || '8.8',
      duration: '2h 46m',
      poster: queryPoster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    };
  }, [movie, routeMovieId, searchParams]);

  // 3. Filter Showtimes for Current Movie
  const movieShowtimes = useMemo(() => {
    return SHOWTIMES.filter((st) => st.movieId === activeMovie.id);
  }, [activeMovie.id]);

  // 4. Extract Unique Dates for Current Movie
  const availableDates = useMemo(() => {
    const rawDates = Array.from(new Set(movieShowtimes.map((st) => st.date)));
    rawDates.sort(); // Sort chronologically YYYY-MM-DD
    return rawDates.map(formatScheduleDate);
  }, [movieShowtimes]);

  // State Management
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtimeId, setSelectedShowtimeId] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Sync state when active movie changes
  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate(availableDates[0].id);
    } else {
      setSelectedDate('');
    }
  }, [availableDates]);

  // 5. Showtimes for Selected Date enriched with Hall details
  // 5. Showtimes for Selected Date enriched with Hall details
const filteredShowtimes = useMemo(() => {
  if (!selectedDate) return [];

  // Safely normalize HALLS into a lookup function
  const getHallData = (hallId) => {
    if (!HALLS) return null;
    
    // If HALLS is an Array
    if (Array.isArray(HALLS)) {
      return HALLS.find((h) => h.id === hallId);
    }
    
    // If HALLS is a Key-Value Object (e.g., HALLS['hall-1'] or HALLS.hall1)
    if (typeof HALLS === 'object') {
      return HALLS[hallId] || Object.values(HALLS).find((h) => h?.id === hallId);
    }

    return null;
  };

  return movieShowtimes
    .filter((st) => st.date === selectedDate)
    .map((st) => {
      // Resolve hall meta details safely
      const hall = getHallData(st.hallId) || {
        name: st.hallId,
        format: 'Standard 2D',
        price: 12.00,
      };

      return {
        ...st,
        screen: hall.name || 'Screen 1',
        format: hall.format || 'Standard 2D',
        price: hall.price || st.price || 12.00,
      };
    });
}, [movieShowtimes, selectedDate]);

  // Sync selected showtime whenever filtered showtimes change
  useEffect(() => {
    if (filteredShowtimes.length > 0) {
      // Keep existing selection if still valid, otherwise select first available
      const exists = filteredShowtimes.some((st) => st.id === selectedShowtimeId);
      if (!exists) {
        setSelectedShowtimeId(filteredShowtimes[0].id);
        setSelectedSeats([]);
      }
    } else {
      setSelectedShowtimeId('');
      setSelectedSeats([]);
    }
  }, [filteredShowtimes, selectedShowtimeId]);

  // Active date & showtime objects
  const selectedDateObj = useMemo(
    () => availableDates.find((d) => d.id === selectedDate) || availableDates[0] || { dayName: 'N/A', dayNum: '--', month: '' },
    [availableDates, selectedDate]
  );

  const activeShowtime = useMemo(
    () => filteredShowtimes.find((s) => s.id === selectedShowtimeId) || filteredShowtimes[0] || {
      id: '',
      time: 'N/A',
      format: 'Standard',
      screen: 'Auditorium',
      price: 12.00,
    },
    [filteredShowtimes, selectedShowtimeId]
  );

  // Live Occupied Seats for current selected showtime
  const currentOccupied = useMemo(
    () => (selectedShowtimeId ? OCCUPIED_SEATS[selectedShowtimeId] || [] : []),
    [selectedShowtimeId]
  );

  // Handle seat clicks
  const toggleSeat = (seatId) => {
    if (currentOccupied.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  // Switch showtime & clear invalid seat selections
  const handleSelectShowtime = (showtimeId) => {
    setSelectedShowtimeId(showtimeId);
    const newOccupied = OCCUPIED_SEATS[showtimeId] || [];
    setSelectedSeats((prev) => prev.filter((id) => !newOccupied.includes(id)));
  };

  // Pricing calculations
  const seatPrice = activeShowtime.price || 12.00;
  const vipPriceAddon = 3.00;

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId.charAt(0);
      const isVip = row === 'C' || row === 'D';
      return total + seatPrice + (isVip ? vipPriceAddon : 0);
    }, 0);
  }, [selectedSeats, seatPrice]);

  const bookingFee = selectedSeats.length > 0 ? 1.50 : 0.00;
  const finalGrandTotal = totalPrice + bookingFee;

  const handleProceedToPayment = () => {
  const query = new URLSearchParams({
    movieId: activeMovie.id,
    title: activeMovie.title,
    poster: activeMovie.poster,
    format: activeShowtime.format,
    screen: activeShowtime.screen,
    time: activeShowtime.time,
    dateStr: `${selectedDateObj.dayName}, ${selectedDateObj.dayNum} ${selectedDateObj.month}`,
    seats: selectedSeats.join(','),
    total: finalGrandTotal.toFixed(2),
    subtotal: totalPrice.toFixed(2),
    fee: bookingFee.toFixed(2),
  }).toString();

  router.push(`/payment?${query}`);
};

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F8F5EE] selection:bg-[#F5B942] selection:text-[#0B0B0F] pb-24 lg:pb-12">
      
      {/* --- TOP HEADER NAVBAR --- */}
      <header className="sticky top-0 z-30 bg-[#0B0B0F]/90 backdrop-blur-md border-b border-[#2B2B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href={`/movie/${activeMovie.id}`}
            className="flex items-center gap-2 text-xs font-semibold text-[#A7A7B0] hover:text-[#F8F5EE] transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1D1D26] border border-[#2B2B35] flex items-center justify-center group-hover:border-[#F5B942] transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            </div>
            <span className="hidden sm:inline">Back to Movie</span>
          </Link>

          <div className="text-center">
            <h1 className="text-sm sm:text-base font-bold text-[#F8F5EE] line-clamp-1">
              {activeMovie.title}
            </h1>
            <p className="text-[11px] text-[#A7A7B0] flex items-center justify-center gap-2">
              <span>{activeMovie.genre}</span>
              <span>•</span>
              <span className="text-[#F5B942] flex items-center gap-1 font-semibold">
                <FontAwesomeIcon icon={faStar} className="text-[10px]" />
                {activeMovie.rating}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#FFE3A3] bg-[#14141B] px-3 py-1.5 rounded-full border border-[#2B2B35]">
            <FontAwesomeIcon icon={faFilm} className="text-[#F5B942]" />
            <span className="hidden md:inline">{activeShowtime.screen}</span>
            <span className="md:hidden">{activeShowtime.format}</span>
          </div>
        </div>
      </header>

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Showtimes & Interactive Seat Map */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* 1. DATE SELECTOR */}
          <div className="bg-[#14141B] border border-[#2B2B35] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A7A7B0] uppercase tracking-wider mb-3">
              <FontAwesomeIcon icon={faCalendarDays} className="text-[#F5B942]" />
              <span>Select Date</span>
            </div>

            {availableDates.length === 0 ? (
              <p className="text-xs text-[#A7A7B0] py-2">No dates currently scheduled for this movie.</p>
            ) : (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                {availableDates.map((d) => {
                  const isActive = selectedDate === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDate(d.id)}
                      className={`relative min-w-[72px] sm:min-w-[84px] py-3 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center ${
                        isActive
                          ? 'bg-[#1D1D26] border-[#F5B942] text-[#F8F5EE] shadow-lg shadow-[#F5B942]/10'
                          : 'bg-[#0B0B0F] border-[#2B2B35] text-[#A7A7B0] hover:border-[#A7A7B0]/40'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold text-[#A7A7B0]">
                        {d.dayName}
                      </span>
                      <span className={`text-lg font-black my-0.5 ${isActive ? 'text-[#F5B942]' : 'text-[#F8F5EE]'}`}>
                        {d.dayNum}
                      </span>
                      <span className="text-[10px] font-medium">{d.month}</span>

                      {isActive && (
                        <motion.div
                          layoutId="activeDateGlow"
                          className="absolute -bottom-1 w-6 h-1 bg-[#F5B942] rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. SHOWTIME SELECTOR */}
          <div className="bg-[#14141B] border border-[#2B2B35] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A7A7B0] uppercase tracking-wider mb-3">
              <FontAwesomeIcon icon={faClock} className="text-[#F5B942]" />
              <span>Select Showtime</span>
            </div>

            {filteredShowtimes.length === 0 ? (
              <p className="text-xs text-[#A7A7B0] py-2">No showtimes available for the selected date.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {filteredShowtimes.map((st) => {
                  const isActive = selectedShowtimeId === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => handleSelectShowtime(st.id)}
                      className={`relative p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isActive
                          ? 'bg-[#1D1D26] border-[#F5B942] text-[#F8F5EE] shadow-lg shadow-[#F5B942]/10'
                          : 'bg-[#0B0B0F] border-[#2B2B35] text-[#A7A7B0] hover:border-[#A7A7B0]/40'
                      }`}
                    >
                      <div>
                        <div className={`text-base font-black ${isActive ? 'text-[#F5B942]' : 'text-[#F8F5EE]'}`}>
                          {st.time}
                        </div>
                        <div className="text-[11px] font-medium text-[#A7A7B0] mt-0.5">
                          {st.format}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#2B2B35] flex items-center justify-between text-xs font-semibold">
                        <span className="text-[#FFE3A3]">${st.price.toFixed(2)}</span>
                        {isActive && (
                          <span className="text-[#36C98F] text-[10px] bg-[#36C98F]/10 px-1.5 py-0.5 rounded">
                            Selected
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. CINEMA SEAT MAP */}
          <div className="bg-[#14141B] border border-[#2B2B35] rounded-2xl p-4 sm:p-8 overflow-hidden relative">
            
            {/* Curved Screen */}
            <div className="relative w-full max-w-lg mx-auto mb-10 text-center">
              <div className="relative h-12 overflow-hidden flex items-center justify-center">
                <div className="w-full h-16 border-t-4 border-[#F5B942] rounded-[50%] shadow-[0_-15px_30px_rgba(245,185,66,0.25)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F5B942]/15 via-transparent to-transparent pointer-events-none" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A7A7B0] -mt-6">
                SCREEN
              </p>
            </div>

            {/* Seat Grid Layout */}
            <div className="overflow-x-auto pb-4 scrollbar-none">
              <div className="min-w-[560px] max-w-xl mx-auto space-y-3">
                {ROWS.map((row) => {
                  const isVipRow = row === 'C' || row === 'D';

                  return (
                    <div key={row} className="flex items-center justify-between gap-2">
                      <span className="w-6 text-center text-xs font-bold text-[#A7A7B0]">
                        {row}
                      </span>

                      <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2">
                        {Array.from({ length: SEATS_PER_ROW }).map((_, idx) => {
                          const seatNum = idx + 1;
                          const seatId = `${row}${seatNum}`;
                          const isOccupied = currentOccupied.includes(seatId);
                          const isSelected = selectedSeats.includes(seatId);
                          const hasAisle = seatNum === 3 || seatNum === 7;

                          return (
                            <React.Fragment key={seatId}>
                              <motion.button
                                whileHover={!isOccupied ? { scale: 1.15 } : {}}
                                whileTap={!isOccupied ? { scale: 0.9 } : {}}
                                onClick={() => toggleSeat(seatId)}
                                disabled={isOccupied || !selectedShowtimeId}
                                title={`${seatId} ${isVipRow ? '(VIP Premier)' : '(Standard)'} - ${
                                  isOccupied ? 'Occupied' : 'Available'
                                }`}
                                className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] font-bold transition-all duration-200 flex items-center justify-center border ${
                                  isOccupied
                                    ? 'bg-[#1D1D26] border-[#2B2B35] text-[#2B2B35] cursor-not-allowed'
                                    : isSelected
                                    ? 'bg-[#36C98F] border-[#36C98F] text-[#0B0B0F] shadow-lg shadow-[#36C98F]/30 scale-105'
                                    : isVipRow
                                    ? 'bg-[#1D1D26] border-[#F5B942]/50 text-[#FFE3A3] hover:border-[#F5B942]'
                                    : 'bg-[#1D1D26] border-[#2B2B35] text-[#A7A7B0] hover:border-[#A7A7B0] hover:text-[#F8F5EE]'
                                }`}
                              >
                                {isOccupied ? (
                                  <FontAwesomeIcon icon={faXmark} className="text-xs text-[#EF6262]/50" />
                                ) : isSelected ? (
                                  <FontAwesomeIcon icon={faCheck} className="text-xs stroke-[3]" />
                                ) : (
                                  seatNum
                                )}

                                {isVipRow && !isOccupied && !isSelected && (
                                  <span className="absolute -top-0.5 right-0.5 w-1 h-1 bg-[#F5B942] rounded-full" />
                                )}
                              </motion.button>

                              {hasAisle && <div className="w-3 sm:w-4" />}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      <span className="w-6 text-center text-xs font-bold text-[#A7A7B0]">
                        {row}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEAT LEGEND */}
            <div className="mt-8 pt-6 border-t border-[#2B2B35] flex flex-wrap items-center justify-center gap-6 text-xs text-[#A7A7B0]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#1D1D26] border border-[#2B2B35]" />
                <span>Available (${seatPrice.toFixed(2)})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#1D1D26] border border-[#F5B942] relative">
                  <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-[#F5B942] rounded-full" />
                </div>
                <span>VIP Premier (+${vipPriceAddon.toFixed(2)})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#36C98F] flex items-center justify-center text-[#0B0B0F] font-bold text-[10px]">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <span className="text-[#36C98F] font-semibold">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#1D1D26] border border-[#2B2B35] flex items-center justify-center text-[#EF6262]/50">
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                </div>
                <span>Occupied</span>
              </div>
            </div>

          </div>
        </section>

        {/* RIGHT COLUMN: Order Summary & Checkout Panel */}
        <aside className="lg:col-span-4">
          <div className="bg-[#14141B] border border-[#2B2B35] rounded-2xl p-5 sm:p-6 sticky top-24 space-y-6 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-[#2B2B35] pb-4">
              <h2 className="text-lg font-bold text-[#F8F5EE] flex items-center gap-2">
                <FontAwesomeIcon icon={faTicket} className="text-[#F5B942]" />
                <span>Booking Summary</span>
              </h2>
              <span className="text-xs text-[#A7A7B0]">Step 2 of 3</span>
            </div>

            {/* Dynamic Movie Info Thumbnail */}
            <div className="flex gap-4 items-center bg-[#1D1D26] p-3 rounded-xl border border-[#2B2B35]">
              <img
                src={activeMovie.poster}
                alt={activeMovie.title}
                className="w-14 h-20 object-cover rounded-lg bg-[#0B0B0F]"
              />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#F8F5EE] line-clamp-1">
                  {activeMovie.title}
                </h3>
                <p className="text-xs text-[#A7A7B0]">{activeShowtime.format}</p>
                <div className="text-xs text-[#FFE3A3] font-semibold pt-1">
                  {selectedDateObj.dayName}, {selectedDateObj.dayNum} {selectedDateObj.month} @ {activeShowtime.time}
                </div>
              </div>
            </div>

            {/* Selected Seats Badges */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#A7A7B0] flex items-center justify-between">
                <span>Selected Seats ({selectedSeats.length})</span>
                {selectedSeats.length > 0 && (
                  <button
                    onClick={() => setSelectedSeats([])}
                    className="text-[11px] text-[#EF6262] hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {selectedSeats.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-[#2B2B35] rounded-xl text-xs text-[#A7A7B0] flex flex-col items-center gap-2">
                  <FontAwesomeIcon icon={faCouch} className="text-lg text-[#2B2B35]" />
                  <span>No seats selected. Tap seats on the map above.</span>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1 scrollbar-none">
                  <AnimatePresence>
                    {selectedSeats.map((seatId) => {
                      const row = seatId.charAt(0);
                      const isVip = row === 'C' || row === 'D';
                      return (
                        <motion.div
                          key={seatId}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            isVip
                              ? 'bg-[#1D1D26] border-[#F5B942] text-[#F5B942]'
                              : 'bg-[#1D1D26] border-[#36C98F] text-[#36C98F]'
                          }`}
                        >
                          <span>{seatId}</span>
                          {isVip && <span className="text-[9px] text-[#FFE3A3] uppercase">VIP</span>}
                          <button
                            onClick={() => toggleSeat(seatId)}
                            className="text-[#A7A7B0] hover:text-[#EF6262] ml-1"
                          >
                            <FontAwesomeIcon icon={faXmark} className="text-[10px]" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 pt-4 border-t border-[#2B2B35] text-xs">
              <div className="flex justify-between text-[#A7A7B0]">
                <span>Tickets ({selectedSeats.length}x)</span>
                <span className="text-[#F8F5EE] font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#A7A7B0]">
                <span className="flex items-center gap-1">
                  <span>Convenience Fee</span>
                  <FontAwesomeIcon icon={faCircleInfo} className="text-[10px] text-[#2B2B35]" />
                </span>
                <span className="text-[#F8F5EE] font-semibold">${bookingFee.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-[#2B2B35] flex items-center justify-between text-sm font-black">
                <span className="text-[#F8F5EE]">Grand Total</span>
                <span className="text-xl text-[#F5B942]">${finalGrandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              disabled={selectedSeats.length === 0}
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                selectedSeats.length > 0
                  ? 'bg-[#F5B942] hover:bg-[#D98E2B] text-[#0B0B0F] shadow-lg shadow-[#F5B942]/20 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-[#1D1D26] text-[#A7A7B0] border border-[#2B2B35] cursor-not-allowed'
              }`}
            >
              <FontAwesomeIcon icon={faCreditCard} />
              <span>Proceed to Payment</span>
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            </button>

          </div>
        </aside>
      </main>

      {/* --- MOBILE BOTTOM FIXED CHECKOUT BAR --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14141B]/95 backdrop-blur-md border-t border-[#2B2B35] p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[#A7A7B0] uppercase font-bold">Total Price</p>
          <div className="text-xl font-black text-[#F5B942]">
            ${finalGrandTotal.toFixed(2)}{' '}
            <span className="text-xs font-normal text-[#A7A7B0]">({selectedSeats.length} seats)</span>
          </div>
        </div>

        <button
          onClick={() => setIsCheckoutModalOpen(true)}
          disabled={selectedSeats.length === 0}
          className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
            selectedSeats.length > 0
              ? 'bg-[#F5B942] text-[#0B0B0F]'
              : 'bg-[#1D1D26] text-[#A7A7B0] border border-[#2B2B35]'
          }`}
        >
          <span>Pay Now</span>
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </button>
      </div>

      {/* --- CONFIRMATION CHECKOUT MODAL --- */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0F]/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#14141B] border border-[#2B2B35] rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1D1D26] text-[#A7A7B0] hover:text-[#F8F5EE] flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#36C98F]/20 text-[#36C98F] border border-[#36C98F]/40 flex items-center justify-center mx-auto text-xl">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <h3 className="text-xl font-bold text-[#F8F5EE]">Confirm Reservation</h3>
                <p className="text-xs text-[#A7A7B0]">
                  Your seats are held for <span className="text-[#F5B942] font-bold">09:59</span> minutes.
                </p>
              </div>

              <div className="bg-[#1D1D26] p-4 rounded-xl border border-[#2B2B35] space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A7A7B0]">Movie:</span>
                  <span className="font-bold text-[#F8F5EE]">{activeMovie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A7A7B0]">Showtime:</span>
                  <span className="font-semibold text-[#FFE3A3]">{activeShowtime.time} ({activeShowtime.format})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A7A7B0]">Seats:</span>
                  <span className="font-bold text-[#36C98F]">{selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between border-t border-[#2B2B35] pt-2 text-sm font-black">
                  <span className="text-[#F8F5EE]">Total Amount:</span>
                  <span className="text-[#F5B942]">${finalGrandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-3.5 rounded-xl bg-[#F5B942] hover:bg-[#D98E2B] text-[#0B0B0F] font-bold text-sm transition-colors shadow-lg shadow-[#F5B942]/20"
                >
                  Go to Payment
                </button>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-transparent border border-[#2B2B35] text-[#A7A7B0] hover:text-[#F8F5EE] font-medium text-xs transition-colors"
                >
                  Modify Selection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
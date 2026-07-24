import { movies } from './moviesData.js';
import { HALLS } from './hallsData.js';

/**
 * @typedef {import('./hallsData.js').Hall} Hall
 * @typedef {import('./moviesData.js').Movie} Movie
 */

/**
 * @typedef {Object} Showtime
 * @property {string} id
 * @property {string} movieId
 * @property {string} hallId
 * @property {string} date - YYYY-MM-DD
 * @property {string} time - e.g. '02:30 PM'
 */

/**
 * @typedef {Object} Seat
 * @property {string} id - e.g. 'C5'
 * @property {string} row - e.g. 'C'
 * @property {number} number - e.g. 5
 * @property {boolean} isVip
 * @property {boolean} isOccupied
 * @property {boolean} isAisleAfter
 * @property {number} price
 */

/**
 * @typedef {Object} RowGrid
 * @property {string} rowLabel
 * @property {Seat[]} seats
 */

/**
 * @typedef {Object} BookingSummary
 * @property {string} ticketsTotal
 * @property {string} bookingFee
 * @property {string} grandTotal
 * @property {number} ticketCount
 */

// ==========================================
// ACTIVE MOVIE SHOWTIMES (EXPANDED SCHEDULE)
// ==========================================

/** @type {Showtime[]} */
export const SHOWTIMES = [
  // ----------------------------------------
  // Dune: Part Two
  // ----------------------------------------
  { id: 'st-101', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-24', time: '01:30 PM' },
  { id: 'st-102', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-24', time: '05:15 PM' },
  { id: 'st-103', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-24', time: '09:00 PM' },
  { id: 'st-104', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-25', time: '02:00 PM' },
  { id: 'st-105', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-25', time: '06:30 PM' },
  { id: 'st-106', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-26', time: '01:00 PM' },
  { id: 'st-107', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-26', time: '08:15 PM' },
  { id: 'st-108', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-27', time: '04:00 PM' },
  { id: 'st-109', movieId: 'dune-part-two', hallId: 'auditorium-4', date: '2026-07-28', time: '07:30 PM' },

  // ----------------------------------------
  // Oppenheimer
  // ----------------------------------------
  { id: 'st-201', movieId: 'oppenheimer', hallId: 'screen-2', date: '2026-07-24', time: '02:00 PM' },
  { id: 'st-202', movieId: 'oppenheimer', hallId: 'screen-2', date: '2026-07-24', time: '06:00 PM' },
  { id: 'st-203', movieId: 'oppenheimer', hallId: 'screen-2', date: '2026-07-25', time: '01:15 PM' },
  { id: 'st-204', movieId: 'oppenheimer', hallId: 'screen-2', date: '2026-07-25', time: '08:00 PM' },
  { id: 'st-205', movieId: 'oppenheimer', hallId: 'screen-2', date: '2026-07-26', time: '03:30 PM' },
  { id: 'st-206', movieId: 'oppenheimer', hallId: 'screen-2', date: '2026-07-27', time: '02:00 PM' },
  { id: 'st-207', movieId: 'oppenheimer', hallId: 'screen-2', date: '2026-07-28', time: '06:00 PM' },

  // ----------------------------------------
  // Spider-Man: Across the Spider-Verse
  // ----------------------------------------
  { id: 'st-301', movieId: 'spider-man-across-the-spider-verse', hallId: 'screen-1', date: '2026-07-24', time: '02:30 PM' },
  { id: 'st-302', movieId: 'spider-man-across-the-spider-verse', hallId: 'screen-1', date: '2026-07-24', time: '07:30 PM' },
  { id: 'st-303', movieId: 'spider-man-across-the-spider-verse', hallId: 'screen-1', date: '2026-07-25', time: '03:15 PM' },
  { id: 'st-304', movieId: 'spider-man-across-the-spider-verse', hallId: 'screen-1', date: '2026-07-26', time: '12:30 PM' },
  { id: 'st-305', movieId: 'spider-man-across-the-spider-verse', hallId: 'screen-1', date: '2026-07-26', time: '05:45 PM' },
  { id: 'st-306', movieId: 'spider-man-across-the-spider-verse', hallId: 'screen-1', date: '2026-07-27', time: '06:15 PM' },
  { id: 'st-307', movieId: 'spider-man-across-the-spider-verse', hallId: 'screen-1', date: '2026-07-28', time: '03:00 PM' },

  // ----------------------------------------
  // Interstellar
  // ----------------------------------------
  { id: 'st-401', movieId: 'interstellar', hallId: 'auditorium-4', date: '2026-07-24', time: '10:00 AM' },
  { id: 'st-402', movieId: 'interstellar', hallId: 'auditorium-4', date: '2026-07-25', time: '03:00 PM' },
  { id: 'st-403', movieId: 'interstellar', hallId: 'auditorium-4', date: '2026-07-25', time: '07:00 PM' },
  { id: 'st-404', movieId: 'interstellar', hallId: 'auditorium-4', date: '2026-07-26', time: '04:30 PM' },
  { id: 'st-405', movieId: 'interstellar', hallId: 'auditorium-4', date: '2026-07-27', time: '08:00 PM' },
  { id: 'st-406', movieId: 'interstellar', hallId: 'auditorium-4', date: '2026-07-28', time: '01:30 PM' },

  // ----------------------------------------
  // The Dark Knight
  // ----------------------------------------
  { id: 'st-501', movieId: 'the-dark-knight', hallId: 'screen-1', date: '2026-07-24', time: '11:15 AM' },
  { id: 'st-502', movieId: 'the-dark-knight', hallId: 'screen-1', date: '2026-07-25', time: '04:15 PM' },
  { id: 'st-503', movieId: 'the-dark-knight', hallId: 'screen-1', date: '2026-07-25', time: '08:45 PM' },
  { id: 'st-504', movieId: 'the-dark-knight', hallId: 'screen-1', date: '2026-07-26', time: '02:45 PM' },
  { id: 'st-505', movieId: 'the-dark-knight', hallId: 'screen-1', date: '2026-07-27', time: '01:30 PM' },
  { id: 'st-506', movieId: 'the-dark-knight', hallId: 'screen-1', date: '2026-07-28', time: '08:30 PM' },

  // ----------------------------------------
  // Avatar: The Way of Water
  // ----------------------------------------
  { id: 'st-601', movieId: 'avatar-the-way-of-water', hallId: 'screen-2', date: '2026-07-24', time: '10:30 AM' },
  { id: 'st-602', movieId: 'avatar-the-way-of-water', hallId: 'screen-2', date: '2026-07-25', time: '01:00 PM' },
  { id: 'st-603', movieId: 'avatar-the-way-of-water', hallId: 'screen-2', date: '2026-07-25', time: '05:30 PM' },
  { id: 'st-604', movieId: 'avatar-the-way-of-water', hallId: 'screen-2', date: '2026-07-26', time: '07:00 PM' },
  { id: 'st-605', movieId: 'avatar-the-way-of-water', hallId: 'screen-2', date: '2026-07-27', time: '05:00 PM' },
  { id: 'st-606', movieId: 'avatar-the-way-of-water', hallId: 'screen-2', date: '2026-07-28', time: '02:15 PM' },
];

// ==========================================
// REAL-TIME OCCUPIED SEATS PER SHOWTIME
// ==========================================

/** @type {Record<string, string[]>} */
export const OCCUPIED_SEATS = {
  // Dune: Part Two showtimes
  'st-101': ['A3', 'A4', 'C5', 'C6', 'D4', 'D5', 'D6', 'E1'],
  'st-102': ['B4', 'B5', 'C3', 'C4', 'C5', 'D2', 'D3', 'D7', 'D8', 'E5', 'E6', 'F9', 'F10'],
  'st-103': ['A1', 'A2', 'B8', 'B9', 'C1', 'C2', 'D5', 'E4', 'E5', 'E6'],
  'st-104': ['C4', 'C5', 'C6', 'D4', 'D5', 'D6'],
  'st-105': ['A5', 'A6', 'B5', 'B6', 'C3', 'C4', 'D5', 'E7', 'E8', 'F1', 'F2'],
  'st-106': ['B2', 'B3', 'C4', 'C5', 'D6'],
  'st-107': ['C1', 'C2', 'C3', 'D3', 'D4', 'E5', 'E6', 'E7'],
  'st-108': ['A2', 'B3', 'C4', 'D5'],
  'st-109': ['B4', 'B5', 'C5', 'C6', 'D4', 'D5', 'E6', 'F7', 'F8'],

  // Oppenheimer showtimes
  'st-201': ['B1', 'C9', 'C10', 'D1', 'D2'],
  'st-202': ['D4', 'D5', 'D6', 'E4', 'E5'],
  'st-203': ['A3', 'B4', 'C5', 'D6', 'E7'],
  'st-204': ['C2', 'C3', 'C4', 'D4', 'D5', 'D6', 'E1', 'E2'],
  'st-205': ['A1', 'B2', 'C3', 'D4', 'E5'],
  'st-206': ['B3', 'B4', 'C4', 'C5', 'D5'],
  'st-207': ['A5', 'A6', 'C5', 'C6', 'D7', 'E8', 'F9'],

  // Spider-Man showtimes
  'st-301': ['A5', 'A6', 'B5', 'B6', 'C4', 'C5', 'C6'],
  'st-302': ['A1', 'B2', 'B3', 'C7', 'D8'],
  'st-303': ['B3', 'B4', 'C3', 'C4', 'C5', 'D5', 'D6'],
  'st-304': ['A2', 'A3', 'B4', 'B5'],
  'st-305': ['C4', 'C5', 'C6', 'D4', 'D5', 'D6', 'E5', 'E6', 'F1'],
  'st-306': ['A1', 'A2', 'C3', 'C4', 'D5'],
  'st-307': ['B1', 'B2', 'C5', 'D6', 'E3'],

  // Interstellar showtimes
  'st-401': ['B2', 'C3', 'D4'],
  'st-402': ['C3', 'C4', 'D5', 'D6', 'E7', 'E8'],
  'st-403': ['A2', 'B4', 'C5', 'D6', 'E1', 'F2'],
  'st-404': ['A1', 'A2', 'B3', 'C4', 'C5', 'D6', 'E7'],
  'st-405': ['C5', 'C6', 'D4', 'D5', 'E5', 'E6'],
  'st-406': ['B1', 'C2', 'D3', 'E4'],

  // The Dark Knight showtimes
  'st-501': ['A4', 'B5', 'C6'],
  'st-502': ['B3', 'B4', 'C5', 'C6', 'D3', 'D4'],
  'st-503': ['A1', 'A2', 'C3', 'D4', 'E5', 'F6'],
  'st-504': ['C2', 'C3', 'D3', 'D4', 'E5', 'E6'],
  'st-505': ['B2', 'C3', 'C4', 'D5'],
  'st-506': ['A3', 'A4', 'B5', 'C5', 'C6', 'D6', 'E7', 'F8'],

  // Avatar showtimes
  'st-601': ['A1', 'B2', 'C3'],
  'st-602': ['B1', 'B2', 'C5', 'D6', 'E3', 'E4'],
  'st-603': ['A4', 'A5', 'B6', 'C1', 'C2', 'D3', 'D4'],
  'st-604': ['C3', 'C4', 'C5', 'D5', 'D6', 'E7', 'E8', 'F9'],
  'st-605': ['B3', 'B4', 'C4', 'C5', 'D4', 'D5'],
  'st-606': ['A2', 'B3', 'C4', 'D5', 'E6'],
};

// Re-export HALLS for convenient single-source imports in UI components
export { HALLS };

// ==========================================
// QUERY & FILTER FUNCTIONS
// ==========================================

/**
 * Get all available showtimes for a specific movie, optionally filtered by date.
 * @param {string} movieId
 * @param {string} [date] - YYYY-MM-DD
 * @returns {Showtime[]}
 */
export function getShowtimesByMovie(movieId, date) {
  return SHOWTIMES.filter((st) => {
    const matchesMovie = st.movieId === movieId;
    const matchesDate = date ? st.date === date : true;
    return matchesMovie && matchesDate;
  });
}

/**
 * Get all showtimes on a specific date with enriched movie and linked hall details.
 * @param {string} date - YYYY-MM-DD
 */
export function getSchedulesByDate(date) {
  const showtimes = SHOWTIMES.filter((st) => st.date === date);

  return showtimes.map((st) => {
    const movie = movies.find((m) => m.id === st.movieId);
    const hall = HALLS[st.hallId];
    return {
      ...st,
      movie,
      hall,
    };
  });
}

/**
 * Retrieves full details for a specific showtime along with its assigned movie and linked hall data.
 * @param {string} showtimeId
 */
export function getShowtimeDetails(showtimeId) {
  const showtime = SHOWTIMES.find((s) => s.id === showtimeId) || SHOWTIMES[0];
  const movie = movies.find((m) => m.id === showtime.movieId);
  const hall = HALLS[showtime.hallId];
  return { ...showtime, movie, hall };
}

/**
 * Retrieves all unique dates that currently have scheduled showtimes.
 * @returns {string[]}
 */
export function getAvailableDates() {
  const dates = SHOWTIMES.map((st) => st.date);
  return [...new Set(dates)].sort();
}

// ==========================================
// SEAT GRID & BOOKING COMPUTATIONS
// ==========================================

/**
 * Generates a full array of seat objects using the linked hall configuration and schedule-specific occupied seats.
 * @param {string} showtimeId
 * @returns {RowGrid[]}
 */
export function generateSeatGrid(showtimeId) {
  const showtime = getShowtimeDetails(showtimeId);
  const hall = showtime.hall;
  const occupiedList = OCCUPIED_SEATS[showtimeId] || [];

  if (!hall) return [];

  return hall.rows.map((rowLabel) => {
    const isVipRow = hall.vipRows.includes(rowLabel);

    const seats = Array.from({ length: hall.seatsPerRow }, (_, idx) => {
      const seatNumber = idx + 1;
      const seatId = `${rowLabel}${seatNumber}`;
      const isOccupied = occupiedList.includes(seatId);
      const isAisleAfter = hall.aislesAfter.includes(seatNumber);

      const price = hall.basePrice + (isVipRow ? hall.vipPriceAddon : 0);

      return {
        id: seatId,
        row: rowLabel,
        number: seatNumber,
        isVip: isVipRow,
        isOccupied,
        isAisleAfter,
        price,
      };
    });

    return { rowLabel, seats };
  });
}

/**
 * Calculates subtotal, booking fee, and final grand total for selected seats in a showtime's linked hall.
 * @param {string} showtimeId
 * @param {string[]} selectedSeatIds - Array of seat IDs (e.g. ['C5', 'C6'])
 * @param {number} [bookingFeePerOrder=1.50]
 * @returns {BookingSummary}
 */
export function calculateBookingTotal(showtimeId, selectedSeatIds = [], bookingFeePerOrder = 1.50) {
  const showtime = getShowtimeDetails(showtimeId);
  const hall = showtime.hall;

  if (!hall) {
    return { ticketsTotal: '0.00', bookingFee: '0.00', grandTotal: '0.00', ticketCount: 0 };
  }

  const ticketsTotal = selectedSeatIds.reduce((sum, seatId) => {
    const rowLabel = seatId.charAt(0);
    const isVip = hall.vipRows.includes(rowLabel);
    const seatPrice = hall.basePrice + (isVip ? hall.vipPriceAddon : 0);
    return sum + seatPrice;
  }, 0);

  const appliedFee = selectedSeatIds.length > 0 ? bookingFeePerOrder : 0;
  const grandTotal = ticketsTotal + appliedFee;

  return {
    ticketsTotal: ticketsTotal.toFixed(2),
    bookingFee: appliedFee.toFixed(2),
    grandTotal: grandTotal.toFixed(2),
    ticketCount: selectedSeatIds.length,
  };
}
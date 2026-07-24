/**
 * Halls and Seat Layout Configuration
 */
export const HALLS = {
  'screen-1': {
    id: 'screen-1',
    name: 'Screen 1',
    format: 'Standard 2D',
    basePrice: 12.00,
    rows: ['A', 'B', 'C', 'D', 'E', 'F'],
    seatsPerRow: 10,
    aislesAfter: [3, 7], // Inserts aisle gaps after seat 3 and seat 7
    vipRows: ['C', 'D'],
    vipPriceAddon: 3.00,
  },
  'auditorium-4': {
    id: 'auditorium-4',
    name: 'Auditorium 4 (IMAX)',
    format: 'IMAX 3D',
    basePrice: 18.00,
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    seatsPerRow: 12,
    aislesAfter: [4, 8],
    vipRows: ['D', 'E'],
    vipPriceAddon: 4.50,
  },
  'screen-2': {
    id: 'screen-2',
    name: 'Screen 2',
    format: 'Dolby Cinema',
    basePrice: 16.50,
    rows: ['A', 'B', 'C', 'D', 'E', 'F'],
    seatsPerRow: 10,
    aislesAfter: [3, 7],
    vipRows: ['C', 'D'],
    vipPriceAddon: 3.50,
  },
};

/**
 * Showtimes / Active Movie Sessions
 */
export const SHOWTIMES = [
  { id: 'st-1', hallId: 'screen-1', time: '02:30 PM' },
  { id: 'st-2', hallId: 'auditorium-4', time: '05:15 PM' },
  { id: 'st-3', hallId: 'screen-2', time: '08:00 PM' },
  { id: 'st-4', hallId: 'screen-1', time: '10:45 PM' },
];

/**
 * Real-time Occupied Seats mapped by Showtime ID
 */
export const OCCUPIED_SEATS = {
  'st-1': ['A3', 'A4', 'C5', 'C6', 'D4', 'D5', 'D6', 'E1'],
  'st-2': ['B4', 'B5', 'C3', 'C4', 'C5', 'D2', 'D3', 'D7', 'D8', 'E5', 'E6', 'F9', 'F10'],
  'st-3': ['A1', 'A2', 'B8', 'B9', 'C1', 'C2', 'D5', 'E4', 'E5', 'E6'],
  'st-4': ['B1', 'C9', 'C10', 'D1', 'D2'],
};

// ==========================================
// HELPER UTILITIES FOR DATA ACCESS & CALCULATIONS
// ==========================================

/**
 * Retrieves details for a specific showtime along with its assigned hall data.
 */
export function getShowtimeDetails(showtimeId) {
  const showtime = SHOWTIMES.find((s) => s.id === showtimeId) || SHOWTIMES[0];
  const hall = HALLS[showtime.hallId];
  return { ...showtime, hall };
}

/**
 * Generates a full array of seat objects for rendering a dynamic seat map grid.
 */
export function generateSeatGrid(showtimeId) {
  const showtime = getShowtimeDetails(showtimeId);
  const hall = showtime.hall;
  const occupiedList = OCCUPIED_SEATS[showtimeId] || [];

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
 * Calculates the subtotal, booking fee, and final grand total for selected seats.
 */
export function calculateBookingTotal(showtimeId, selectedSeatIds = [], bookingFeePerOrder = 1.50) {
  const showtime = getShowtimeDetails(showtimeId);
  const hall = showtime.hall;

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
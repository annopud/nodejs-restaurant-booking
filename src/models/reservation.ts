export interface Reservation {
  bookingId: string;
  tableCount: number;
}

export interface ReservationResult {
  bookingId: string;
  bookedTableCount: number;
  remainingTable: number;
}

export interface CancellationResult {
  freedTableCount: number;
  remainingTable: number;
}

import {
  CancellationResult,
  Reservation,
  ReservationResult,
} from "../models/reservation";

export class ReservationService {
  private totalTableCount: number = 0;
  private remainingTable: number = 0;
  private isInitialized: boolean = false;
  private reservationData: { [key: string]: Reservation } = {};

  initializeTable(count: number): string | Error {
    if (this.isInitialized) {
      throw new Error("Tables have already been initialized.");
    }
    this.totalTableCount = count;
    this.remainingTable = count;
    this.isInitialized = true;
    return "Tables initialized successfully.";
  }

  reserveTable(customers: number | null): Error | ReservationResult {
    if (!this.isInitialized) {
      throw new Error("Tables have not been initialized.");
    }

    if (!customers || customers < 1) {
      throw new Error("Invalid number of customers.");
    }

    const requiredTables = Math.ceil(customers / 4);

    if (requiredTables > this.remainingTable) {
      throw new Error("Not enough tables available.");
    }

    const bookingId = `booking_${Date.now()}`;
    this.reservationData[bookingId] = { bookingId, tableCount: requiredTables };
    this.remainingTable -= requiredTables;

    return {
      bookingId,
      bookedTableCount: requiredTables,
      remainingTable: this.remainingTable,
    };
  }

  cancelReservation(bookingId: string | null): Error | CancellationResult {
    if (!this.isInitialized) {
      throw new Error("Tables have not been initialized.");
    }

    if (!bookingId) {
      throw new Error("Invalid bookingId.");
    }

    const reservation = this.reservationData[bookingId];
    if (!reservation) {
      throw new Error("Booking ID not found.");
    }

    this.remainingTable += reservation.tableCount;
    delete this.reservationData[bookingId];

    return {
      freedTableCount: reservation.tableCount,
      remainingTable: this.remainingTable,
    };
  }
}

export default new ReservationService();

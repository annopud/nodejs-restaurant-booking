import {
  CancellationResult,
  Reservation,
  ReservationResult,
} from "../../models/reservation";
import reservationService from "../../services/reservationService";

describe("ReservationService", () => {
  beforeEach(() => {
    reservationService["isInitialized"] = false;
    reservationService["totalTableCount"] = 0;
    reservationService["remainingTable"] = 0;
    reservationService["reservationData"] = {};
  });

  test("initializeTables should initialize tables", () => {
    const result = reservationService.initializeTable(10);
    expect(result).toBe("Tables initialized successfully.");
    expect(reservationService["isInitialized"]).toBe(true);
    expect(reservationService["totalTableCount"]).toBe(10);
    expect(reservationService["remainingTable"]).toBe(10);
  });

  test("initializeTables should get an error after initialize", () => {
    expect(() => {
      reservationService.initializeTable(10);
      reservationService.initializeTable(10);
    }).toThrow("Tables have already been initialized.");
  });

  test("reserveTable should get an error 'Tables have not been initialized.'", () => {
    expect(() => {
      reservationService.reserveTable(null);
    }).toThrow("Tables have not been initialized.");
  });

  test("reserveTable should get 'Invalid number of customers.' error, when invalid input", () => {
    reservationService.initializeTable(10);

    expect(() => {
      reservationService.reserveTable(null);
    }).toThrow("Invalid number of customers.");
  });

  test("reserveTable should get 'Not enough tables available.' error, when Not enough tables left", () => {
    reservationService.initializeTable(10);

    expect(() => reservationService.reserveTable(41)).toThrow(
      "Not enough tables available."
    );
  });

  test("reserveTable should get 'Invalid number of customers.' when invalid input", () => {
    reservationService.initializeTable(10);

    expect(reservationService.reserveTable(6)).toEqual<ReservationResult>({
      bookingId: expect.any(String),
      bookedTableCount: 2,
      remainingTable: 8,
    });
  });

  test("cancelReservation should get an error 'Tables have not been initialized.'", () => {
    expect(() => {
      reservationService.cancelReservation(null);
    }).toThrow("Tables have not been initialized.");
  });

  test("cancelReservation should get an error 'Invalid bookingId.'", () => {
    reservationService.initializeTable(10);

    expect(() => {
      reservationService.cancelReservation(null);
    }).toThrow("Invalid bookingId.");
  });

  test("cancelReservation should get an error 'Booking ID not found.', when booking id does not exist on reservation data", () => {
    reservationService["isInitialized"] = true;
    reservationService["totalTableCount"] = 10;
    reservationService["remainingTable"] = 8;
    reservationService["reservationData"] = {
      booking_1: { bookingId: "booking_1", tableCount: 2 },
    };

    expect(() => {
      reservationService.cancelReservation("booking_2");
    }).toThrow("Booking ID not found.");
  });

  test("cancelReservation should get an error 'Invalid bookingId.'", () => {
    reservationService["isInitialized"] = true;
    reservationService["totalTableCount"] = 10;
    reservationService["remainingTable"] = 8;
    reservationService["reservationData"] = {
      booking_1: { bookingId: "booking_1", tableCount: 2 },
    };

    console.log("reservationService", reservationService);
    const result = reservationService.cancelReservation("booking_1");
    expect(result).toEqual<CancellationResult>({
      freedTableCount: 2,
      remainingTable: 10,
    });

    expect(reservationService["isInitialized"]).toBe(true);
    expect(reservationService["totalTableCount"]).toBe(10);
    expect(reservationService["remainingTable"]).toBe(10);
    expect(reservationService["reservationData"]).toEqual<Reservation>(
      {} as Reservation
    );
  });
});

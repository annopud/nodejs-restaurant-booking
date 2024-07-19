import reservationService from "../../services/reservationService";

describe("ReservationService", () => {
  beforeEach(() => {
    reservationService["isInitialized"] = false;
    reservationService["totalTableCount"] = 0;
    reservationService["remainingTable"] = 0;
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

  test("reserveTable should be called after initialized", () => {
    reservationService.initializeTable(10);

    expect(() => {
      reservationService.reserveTable(null);
    }).not.toThrow("Tables have not been initialized.");
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

    expect(reservationService.reserveTable(6)).toEqual({
      bookingId: expect.any(String),
      bookedTableCount: 2,
      remainingTable: 8,
    });
  });
});

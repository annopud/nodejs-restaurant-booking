import reservationService from "../../services/reservationService";

describe("ReservationService", () => {
  beforeAll(() => {
    reservationService["isInitialized"] = false;
    reservationService["totalTableCount"] = 0;
    reservationService["remainingTable"] = 0;
  });

  test("initializeTables should initialize tables", () => {
    const result = reservationService.initializeTables(10);
    expect(result).toBe("Tables initialized successfully.");
    expect(reservationService["isInitialized"]).toBe(true);
    expect(reservationService["totalTableCount"]).toBe(10);
    expect(reservationService["remainingTable"]).toBe(10);
  });

  test("initializeTables should get an error after initialize", () => {
    expect(() => reservationService.initializeTables(10)).toThrow(
      "Tables have already been initialized."
    );
  });
});

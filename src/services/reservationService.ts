class ReservationService {
  private totalTableCount: number = 0;
  private remainingTable: number = 0;
  private isInitialized: boolean = false;

  initializeTables(count: number): string | Error {
    console.log("initializeTables", this.isInitialized);
    if (this.isInitialized) {
      throw new Error("Tables have already been initialized.");
    }
    this.totalTableCount = count;
    this.remainingTable = count;
    this.isInitialized = true;
    return "Tables initialized successfully.";
  }
}

export default new ReservationService();

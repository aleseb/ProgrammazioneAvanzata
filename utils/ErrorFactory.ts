class DatabaseError extends Error {
    constructor(message: string) {
      super(`Database Error: ${message}`);
      this.name = 'DatabaseError';
    }
  }

  // Factory per la creazione di errori
  class ErrorFactory { 
    static createDatabaseError(message: string): DatabaseError {
      return new DatabaseError(message);
    }
  }

  export {
    DatabaseError,
    ErrorFactory,
  };

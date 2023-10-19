
class CustomValidationError extends Error {
    constructor(errors) {
      super("Validation error");
      this.name = "CustomValidationError";
      this.errors = errors; 
      this.statusCode = 400; // Bad Request
    }
  }
  

  class CustomNotFoundError extends Error {
    constructor(message) {
      super(message || "Resource not found");
      this.name = "CustomNotFoundError";
      this.statusCode = 404; // Not Found
    }
  }
  

  class CustomServerError extends Error {
    constructor(message) {
      super(message || "Internal server error");
      this.name = "CustomServerError";
      this.statusCode = 500; // Internal Server Error
    }
  }
  
  module.exports = {
    CustomValidationError,
    CustomNotFoundError,
    CustomServerError,
  };
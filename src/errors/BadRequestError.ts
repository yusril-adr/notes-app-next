import APIError from "./APIError";

class BadRequestError extends APIError {
  constructor(message: string, errorCode: number = 400) {
    super(message, errorCode);
    this.name = "BadRequestError";
  }
}

export default BadRequestError;

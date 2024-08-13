import APIError from "./APIError";

class NotFoundError extends APIError {
  constructor(message: string, errorCode: number = 404) {
    super(message, errorCode);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;

import APIError from "./APIError";

class AuthenticationError extends APIError {
  constructor(message: string, errorCode: number = 401) {
    super(message, errorCode);
    this.name = "AuthenticationError";
  }
}

export default AuthenticationError;

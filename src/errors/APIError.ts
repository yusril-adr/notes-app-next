class APIError extends Error {
  public readonly errorCode: number;
  constructor(message: string, errorCode: number = 500) {
    super(message);
    this.name = "APIError";
    this.errorCode = errorCode;
  }
}

export default APIError;

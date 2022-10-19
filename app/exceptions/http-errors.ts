class HttpError extends Error {
  constructor(message?: any) {
    super(message);
    this.name = 'HttpError';
    this.message = message;
  }
}

export default HttpError;

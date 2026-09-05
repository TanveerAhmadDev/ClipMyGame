class apiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong",
    data = {},
    errors = [],
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.data = data;

    if (process.env.NODE_ENV !== "production") {
      this.errors = errors;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

export default apiError;

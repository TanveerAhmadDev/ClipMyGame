class apiResponse {
  constructor(statusCode = 200, message = "everthing is ok", data = {}) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export default apiResponse;

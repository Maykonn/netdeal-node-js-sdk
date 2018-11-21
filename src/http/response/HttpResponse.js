class HttpResponse {

  /**
   * HttpResponse
   */
  constructor() {
    this._body = null;
  }

  get body() {
    return this._body;
  }

  set body(value) {
    this._body = value;
  }

}

module.exports = HttpResponse;

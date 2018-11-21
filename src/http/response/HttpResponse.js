class HttpResponse {

  /**
   * HttpResponse
   * @param body
   */
  constructor(body) {
    this.body = body;
  }

  get body() {
    return this._body;
  }

  set body(value) {
    this._body = value;
  }

}

module.exports = HttpResponse;

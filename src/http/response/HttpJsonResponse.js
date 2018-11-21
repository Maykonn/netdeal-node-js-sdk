const HttpResponse = require('./HttpResponse.js');

class HttpJsonResponse extends HttpResponse {

  constructor() {
    super();
  }

  get body() {
    return super.body;
  }

  set body(jsonBody) {
    super.body = (jsonBody ? JSON.parse(jsonBody) : null);
  }

}

module.exports = HttpJsonResponse;

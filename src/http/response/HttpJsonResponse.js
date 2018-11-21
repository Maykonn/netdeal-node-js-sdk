const HttpResponse = require('./HttpResponse.js');

class HttpJsonResponse extends HttpResponse {

  set body(jsonBody) {
    this._body = JSON.parse(jsonBody);
  }

}

module.exports = HttpJsonResponse;

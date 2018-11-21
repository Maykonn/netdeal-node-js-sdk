const HttpJsonResponse = require('./HttpJsonResponse.js');

class AccessTokenHttpResponse extends HttpJsonResponse {

  constructor() {
    super();
  }

  get token() {
    return this.body.token;
  }

}

module.exports = AccessTokenHttpResponse;

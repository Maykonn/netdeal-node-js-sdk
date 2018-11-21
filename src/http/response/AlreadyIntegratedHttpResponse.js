const HttpJsonResponse = require('./HttpJsonResponse.js');

class AlreadyIntegratedHttpResponse extends HttpJsonResponse {

  constructor() {
    super();
  }

  get dataResponse() {
    return {message: "Already Sent"};
  }

}

module.exports = AlreadyIntegratedHttpResponse;

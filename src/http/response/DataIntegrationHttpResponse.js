const HttpJsonResponse = require('./HttpJsonResponse.js');

class DataIntegrationHttpResponse extends HttpJsonResponse {

  constructor() {
    super();
  }

  get body() {
    return super.body;
  }

  set body(jsonBody) {
    super.body = JSON.stringify([{
      'data': jsonBody
    }]);
  }

}

module.exports = DataIntegrationHttpResponse;

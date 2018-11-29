const HttpJsonResponse = require('./HttpJsonResponse.js');

class DataIntegrationHttpResponse extends HttpJsonResponse {

  constructor() {
    super();
  }

  get body() {
    return super.body;
  }

  set body(netdealIntegrationApiResponse) {
    super.body = JSON.stringify({
      message: 'Netdeal integration API response',
      data: netdealIntegrationApiResponse
    });
  }

}

module.exports = DataIntegrationHttpResponse;

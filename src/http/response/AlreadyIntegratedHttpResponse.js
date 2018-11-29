const HttpJsonResponse = require('./HttpJsonResponse.js');

class AlreadyIntegratedHttpResponse extends HttpJsonResponse {

  constructor() {
    super();

    this.body = JSON.stringify({
      message: 'The collection was not sent (the whole collection is already integrated)',
      data: []
    });
  }

}

module.exports = AlreadyIntegratedHttpResponse;

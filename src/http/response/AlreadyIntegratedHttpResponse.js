const HttpJsonResponse = require('./HttpJsonResponse.js');

class AlreadyIntegratedHttpResponse extends HttpJsonResponse {

  constructor() {
    super();

    this.body = JSON.stringify([{
      data: "The collection was not sent (the whole collection was already integrated)"
    }]);
  }

}

module.exports = AlreadyIntegratedHttpResponse;

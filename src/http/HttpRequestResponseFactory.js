const AccessTokenHttpResponse = require('./response/AccessTokenHttpResponse.js');
const DataIntegrationHttpResponse = require('./response/DataIntegrationHttpResponse.js');

/**
 * Current possible responses
 *
 * @type {{AccessTokenHttpResponse: AccessTokenHttpResponse, DataIntegrationHttpResponse: DataIntegrationHttpResponse}}
 * @private
 */
const ResponsesList = {
  AccessTokenHttpResponse: AccessTokenHttpResponse,
  DataIntegrationHttpResponse: DataIntegrationHttpResponse,
};

class HttpRequestResponseFactory {

  /**
   * Create the appropriate HttpResponse instance
   *
   * @param {HttpRequest} Request
   * @return {HttpResponse}
   */
  static createHttpResponse(Request) {
    return new ResponsesList[Request.constructor.name]();
  }

}

module.exports = HttpRequestResponseFactory;

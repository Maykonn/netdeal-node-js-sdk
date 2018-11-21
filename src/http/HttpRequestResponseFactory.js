const AccessTokenHttpResponse = require('./response/AccessTokenHttpResponse.js');
const DataIntegrationHttpResponse = require('./response/DataIntegrationHttpResponse.js');

/**
 * Maps the correct response to each possible request
 *
 * @type {{AccessTokenHttpRequest: AccessTokenHttpResponse, DataIntegrationHttpResponse: DataIntegrationHttpResponse}}
 * @private
 */
const RequestsResponsesMapper = {
  AccessTokenHttpRequest: require('./response/AccessTokenHttpResponse.js'),
  DataIntegrationHttpRequest: require('./response/DataIntegrationHttpResponse.js'),
};

class HttpRequestResponseFactory {

  /**
   * Create the appropriate HttpResponse instance
   *
   * @param {HttpRequest} HttpRequest
   * @return {HttpResponse}
   */
  static createHttpResponse(HttpRequest) {
    return new RequestsResponsesMapper[HttpRequest.constructor.name]();
  }

}

module.exports = HttpRequestResponseFactory;

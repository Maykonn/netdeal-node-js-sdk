const http = require('http');
const HttpRequest = require('./request/HttpRequest.js');
const HttpRequestResponseFactory = require('./HttpRequestResponseFactory.js');

class HttpRequestDispatcher {
  /**
   * Execute a http request and awaits the response
   *
   * @param {HttpRequest} Request
   * @return {AccessTokenHttpResponse|DataIntegrationHttpResponse}
   */
  static async dispatch(Request) {
    const requestParams = {
      host: Request.service.endpoint,
      headers: Request.headers,
      data: Request.data,
      ...Request.resource // method and path
    };

    const HttpResponse = HttpRequestResponseFactory.createHttpResponse(Request);
    HttpResponse.body = await this._executeHttpRequest(requestParams);

    return HttpResponse;
  }

  /**
   * Execute the http request asynchronously
   *
   * @param options
   * @return {Promise<*>}
   * @private
   */
  static _executeHttpRequest(options) {
    return new Promise((resolve, reject) => {
      /**
       * @param {http.ClientRequest}
       */
      const req = http.request(options);

      const data = (
        options.headers['Content-Type'] === 'application/json' ?
          JSON.stringify(options.data) :
          options.data
      );

      req.write(data);
      req.end();

      req.on('response', response => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', chunk => body += chunk);
        response.on('end', () => {
          resolve(body);
        });
      });

      req.on('error', error => {
        reject(error.message);
      });
    });
  }

}

module.exports = HttpRequestDispatcher;

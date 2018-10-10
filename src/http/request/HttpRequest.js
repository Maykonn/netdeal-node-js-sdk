const http = require('http');

class HttpRequest {

  /**
   * @param {{scheme: string, endpoint: string}} service
   * @param {{method: string, path: string}} resource
   * @param {{}} data
   * @param {{}} headers
   */
  constructor(service, resource, data, headers) {
    this._service = service;
    this._resource = resource;
    this._data = JSON.stringify(data);
    this._headers = headers;

    // configures the request content-type if not provided
    if (typeof this._headers['Content-Type'] === 'undefined') {
      this._headers['Content-Type'] = 'application/json';
    }
  }

  /**
   * Execute the http request
   */
  async dispatch() {
    const request = {
      host: this._service.endpoint,
      ...this._resource, // method and path
      ...this._headers
    };

    http.request(request, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let token = JSON.parse(body).token;
        resolve(token);
        this._updateNetdealTokenTTL(token);
      });
    });
  }

}

module.exports = HttpRequest;

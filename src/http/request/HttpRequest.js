class HttpRequest {

  /**
   * HttpRequest
   *
   * @param {{scheme: string, endpoint: string}} service
   * @param {{method: string, path: string}} resource
   * @param {{}} data
   * @param {{}} headers
   */
  constructor(service, resource, data = {}, headers = {}) {
    /**
     * Netdeal service configuration
     *
     * @type {{scheme: string, endpoint: string}}
     * @private
     */
    this._service = service;

    /**
     * API resource configuration
     *
     * @type {{method: string, path: string}}
     * @private
     */
    this._resource = resource;

    /**
     * Request data
     *
     * @type {{}}
     * @private
     */
    this._data = data;

    /**
     * Request headers
     *
     * @type {{}}
     * @private
     */
    this._headers = headers;

    // configures the request content-type if not provided
    if (typeof this._headers['Content-Type'] === 'undefined') {
      this._headers['Content-Type'] = 'application/json';
    }
    this._data = data;
  }

  /**
   * Retrieves the Netdeal service configuration
   *
   * @return {{scheme: string, endpoint: string}}
   */
  get service() {
    return this._service;
  }

  /**
   * Configures the Netdeal service configuration
   *
   * @param {{scheme: string, endpoint: string}} value
   */
  set service(value) {
    this._service = value;
  }

  /**
   * Retrieves the API resource configuration
   *
   * @return {{method: string, path: string}}
   */
  get resource() {
    return this._resource;
  }

  /**
   * Configures the API resource configuration
   *
   * @param {{method: string, path: string}} value
   */
  set resource(value) {
    this._resource = value;
  }

  /**
   * Retrieves the request data
   *
   * @return {{}}
   */
  get data() {
    return this._data;
  }

  /**
   * Configures the request data
   *
   * @param {{}} value
   */
  set data(value) {
    this._data = value;
  }

  /**
   * Retrieves the request headers
   *
   * @return {{}}
   */
  get headers() {
    return this._headers;
  }

  /**
   * Configures the request headers
   *
   * @param {{}} value
   */
  set headers(value) {
    this._headers = value;
  }

}

module.exports = HttpRequest;

const Configuration = require('./configuration/Configuration.js');
const AccessTokenCache = require('./AccessTokenCache.js');
const AccessTokenHttpRequest = require('./http/request/AccessTokenHttpRequest.js');
const HttpRequestDispatcher = require('./http/request/HttpRequestDispatcher.js');

class AccessToken {

  /**
   * @param {Configuration} Configuration
   */
  constructor(Configuration) {
    /**
     * SDK Configuration
     *
     * @type {Configuration}
     * @private
     */
    this._configuration = Configuration;

    /**
     * Access token value
     *
     * @type {string}
     * @private
     */
    this._token = '';

    /**
     * Access token cache
     *
     * @type {AccessTokenCache}
     * @private
     */
    this._cache = new AccessTokenCache(Configuration.cache);
  }

  /**
   * Retrieves an Access Token provided by Netdeal.
   *
   * @return {string} The token
   */
  async getToken() {
    return (async () => {
      this._token = await this._cache.getToken();

      if (!this._token) {
        await this._setToken(
          await this._requestTokenToApi()
        );
      }

      return this._token;
    })();
  }

  /**
   * Request a new Access Token to Netdeal
   *
   * @private
   * @see http://www.netdeal.com.br/documentation/#authentication
   * @return {string}
   */
  async _requestTokenToApi() {
    const HttpRequest = new AccessTokenHttpRequest(
      this._configuration.api.service,
      this._configuration.api.resources.requestAccessToken,
      {
        appId: this._configuration.appId,
        secretPass: this._configuration.secretPass
      }
    );

    return this._parseTokenApiResponse(
      await HttpRequestDispatcher.dispatch(HttpRequest)
    );
  }

  /**
   * Extract the token value from the API http response
   *
   * @private
   * @param {{token: string}} response The netdeal http response
   * @see http://www.netdeal.com.br/documentation/#authentication
   * @return {string}
   */
  _parseTokenApiResponse(response) {
    let token = '';

    if (typeof response.token === 'string') {
      token = response.token;
    }

    return token;
  }

  /**
   * Set the token (on cache too)
   *
   * @param {string} token
   */
  async _setToken(token) {
    if (this._tokenIsValid(token)) {
      this._token = token;
      await this._cache.setToken(this._token);
    }
  }

  /**
   * Validate the token
   *
   * @param token
   * @throws Error
   * @return {boolean}
   */
  _tokenIsValid(token) {
    if (false === (typeof token === 'string' && token.length > 0)) {
      throw new Error('Invalid token, given: ' + token);
    }

    return true;
  }

}

module.exports = AccessToken;

const ApiRequestHelper = require('./helper/ApiRequestHelper.js');
const AccessTokenCache = require('./AccessTokenCache.js');

class AccessToken {

  constructor() {
    /**
     * @type {string}
     * @private
     */
    this._token = '';
    this._cache = new AccessTokenCache();
  }

  /**
   * Retrieves an access token provided by Netdeal with a TTL of 30min.
   * If not already cached, will request to a new to Netdeal API and create the cache.
   *
   * @return {string} The token
   */
  get token() {
    this._token = this._cache.token;

    if (!this._token) {
      this._setToken(this._requestTokenToApi());
    }

    return this._token;
  }

  /**
   * Request a new Access Token to Netdeal
   *
   * @private
   * @see http://www.netdeal.com.br/documentation/#authentication
   * @return {string}
   */
  _requestTokenToApi() {
    const apiResponse = ApiRequestHelper.request(
      'http',
      'endpoint.com',
      '/open/request-token',
      {appId: '', secretPass: ''}
    );

    return this._parseTokenApiResponse(apiResponse);
  }

  /**
   * Extract the token value from the API http response
   *
   * @private
   * @param {string} apiResponse The netdeal http response
   * @see http://www.netdeal.com.br/documentation/#authentication
   * @return {string}
   */
  _parseTokenApiResponse(apiResponse) {
    return '';
  }

  /**
   * Set the token (on cache too)
   *
   * @param {string} token
   */
  _setToken(token) {
    if (this._tokenIsValid(token)) {
      this._token = this._cache.token = token;
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

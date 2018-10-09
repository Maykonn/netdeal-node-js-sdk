const ApiRequestHelper = require('./helper/ApiRequestHelper.js');
const AccessTokenCache = require('./AccessTokenCache.js');

class AccessToken {

  constructor() {
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
      this._token = this._requestToApi();
    }

    return this._token;
  }

  /**
   * Set the token and create the token cache
   *
   * @param {string} value
   */
  set token(value) {
    if (this._tokenIsValid(value)) {
      this._cache.token = this._token = value;
    }
  }

  /**
   * Request a new Access Token to Netdeal
   *
   * @private
   * @see http://www.netdeal.com.br/documentation/#authentication
   * @return {string}
   */
  _requestToApi() {
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
   * Validate the token
   *
   * @private
   * @param {string} token
   * @return {boolean}
   */
  _tokenIsValid(token) {
    return (typeof token === 'string');
  }

}

module.exports = AccessToken;

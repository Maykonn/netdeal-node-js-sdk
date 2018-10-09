/**
 * API Configuration
 *
 * @type {{scheme: string, endpoint: string, appId: string, secretPass: string}}
 */
module.exports = {
  /**
   * Your App ID (provided by Netdeal)
   *
   * @see http://www.netdeal.com.br/documentation/#authentication
   */
  appId: '',

  /**
   * Your Secret Pass (provided by Netdeal)
   *
   * @see http://www.netdeal.com.br/documentation/#authentication
   */
  secretPass: '',

  /**
   * The HTTP scheme, HTTP as default
   */
  scheme: 'http',

  /**
   * The Netdeal API endpoint
   */
  endpoint: 'www.netdeal.com.br',

  /**
   * API Resources Configuration
   *
   * @type {{requestAccessToken: string, sendEntity: string}}
   */
  ...require('./APIResourcesConfiguration.js'),
};

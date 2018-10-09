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
   * @see http://www.netdeal.com.br/documentation/
   */
  resources: {
    /**
     * This resource provides an access token for your application consumes the Netdeal Resources
     *
     * @see http://www.netdeal.com.br/documentation/#authentication
     */
    requestAccessToken: '/open/request-token',

    /**
     * Integrate your consumers and leads with Netdeal through this resource
     *
     * @see http://www.netdeal.com.br/documentation/#data-integration
     */
    sendEntity: '/api/event/batch'
  }

};

/**
 * API Configuration
 *
 * @type {{appId: string, secretPass: string, service: {scheme: string, endpoint: string}, resources: {requestAccessToken: {method: string, path: string}, sendEntity: {method: string, path: string}}}}
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
   * Configures the netdeal API service
   */
  service: {
    /**
     * The HTTP scheme, HTTP as default
     */
    scheme: 'http',

    /**
     * The Netdeal API endpoint
     */
    endpoint: 'www.netdeal.com.br',
  },

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
    requestAccessToken: {
      method: 'POST',
      path: '/open/request-token'
    },

    /**
     * Integrate your consumers and leads with Netdeal through this resource
     *
     * @see http://www.netdeal.com.br/documentation/#data-integration
     */
    sendEntity: {
      method: 'POST',
      path: '/api/event/batch',
    }
  }

};

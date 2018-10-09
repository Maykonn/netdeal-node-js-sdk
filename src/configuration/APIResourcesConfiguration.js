/**
 * API Resources Configuration
 *
 * @type {{requestAccessToken: string, sendEntity: string}}
 */
module.exports = {
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
  sendEntity: '/api/event/batch',
};

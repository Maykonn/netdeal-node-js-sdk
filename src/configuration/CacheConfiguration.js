/**
 * Caching supported methods
 *
 * @type {{REDIS: string}}
 */
const supportedMethods = {
  REDIS: 'redis'
};

/**
 * Cache configuration
 *
 * @type {{method: string, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}}
 */
module.exports = {

  /**
   * Default caching method
   */
  method: supportedMethods.REDIS,
  /**
   * The access token cache key
   *
   * @see http://www.netdeal.com.br/documentation/#authentication
   */
  accessTokenKey: 'Netdeal.AccessToken',

  /**
   * The access token will be stored with a TTL of 29 minutes to avoid API requests with 401 Unauthorized responses
   *
   * @see http://www.netdeal.com.br/documentation/#authentication
   */
  accessTokenKeyTTL: 1740, // 29 minutes

  /**
   * List of already implemented methods of caching.
   * You can implement new methods of caching as memcached, mysql, mongodb, filesystem, etc,
   * @see ../infrastructure/cache structure to do this.
   */
  supportedMethods: supportedMethods

};

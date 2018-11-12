/**
 * Caching supported methods
 *
 * @type {{REDIS: string}}
 */
const supportedMethods = {
  REDIS: 'REDIS'
};

/**
 * Cache configuration
 *
 * @type {{method: string, enabled: boolean, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}}
 */
module.exports = {

  /**
   * Default caching method
   */
  method: supportedMethods.REDIS,

  /**
   * Enables/Disables the cache system, true as default
   */
  enabled: true,

  /**
   * Cache server configuration, default configuration for a Redis Server
   */
  server: {
    host: 'localhost',
    port: 6379
  },

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

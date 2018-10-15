class AbstractCache {

  /**
   * AbstractCache
   *
   * @param {{method: string, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}} Configuration
   */
  constructor(Configuration) {
    /**
     * Cache configuration
     *
     * @type {{host: string, port: number}}
     */
    this._configuration = Configuration;

    /**
     * An instance of a client implementation for a cache server for example:
     * https://github.com/NodeRedis/node_redis or
     * https://github.com/3rd-Eden/memcached
     *
     * @type {*}
     */
    this._client = undefined;
  }

}

module.exports = AbstractCache;

class AbstractCache {

  /**
   * AbstractCache
   *
   * @param {{host: string, port: number}} Configuration
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
     * @private
     */
    this._client = undefined;
  }

}

module.exports = AbstractCache;

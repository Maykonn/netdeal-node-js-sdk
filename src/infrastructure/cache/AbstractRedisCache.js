const AbstractCache = require('./AbstractCache.js');
const redis = require('redis');

class AbstractRedisCache extends AbstractCache {

  /**
   * Redis Client
   *
   * @param {{method: string, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}} Configuration
   */
  constructor(Configuration) {
    super(Configuration);

    /**
     * Implements the client for Redis Server
     */
    this._client = redis.createClient(this._configuration.server);

    /**
     * Listening redis server errors
     */
    this._client.on("error", (err) => {
      console.log('Redis error', err);
      throw new Error(err);
    });
  }

  /**
   * Retrieves data from cache server
   * Abstract method
   */
  get() {
    throw new Error('Method requires implementation, see the cache client concrete object');
  }

  /**
   * Insert data on cache server with TTL
   * Abstract method
   */
  setex() {
    throw new Error('Method requires implementation, see the cache client concrete object');
  }

  /**
   * Retrieves key TTL on cache server
   * Abstract method
   */
  ttl() {
    throw new Error('Method requires implementation, see the cache client concrete object');
  }

  /**
   * Close the cache client connection
   */
  closeConnection() {
    this._client.quit();
  }

}

module.exports = AbstractRedisCache;

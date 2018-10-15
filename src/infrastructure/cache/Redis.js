const AbstractCache = require('./AbstractCache.js');
const redis = require('redis');

class Redis extends AbstractCache {

  /**
   * Redis Client
   *
   * @param {{host: string, port: number}} Configuration
   */
  constructor(Configuration) {
    super(Configuration);

    this._client = redis.createClient(...this._configuration);
  }

}

module.exports = Redis;

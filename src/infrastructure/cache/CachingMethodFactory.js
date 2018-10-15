class CachingMethodFactory {

  /**
   * Create a Caching Method based on Cache Configuration
   *
   * @param {{method: string, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}} CacheConfiguration
   */
  static createCachingMethodInstance(CacheConfiguration) {
    let CachingMethod = undefined;

    switch (CacheConfiguration.method) {
      case CacheConfiguration.supportedMethods.REDIS:
        CachingMethod = CachingMethodFactory._createRedisClient(CacheConfiguration.server);
        break;
    }

    return CachingMethod;
  }

  /**
   * Create a Redis Client instance
   *
   * @param {{host: string, port: number}} CacheServerConfiguration
   * @return {AbstractCache}
   * @private
   */
  static _createRedisClient(CacheServerConfiguration) {
    const redis = require('./Redis.js');
    return new redis(CacheServerConfiguration);
  }

}

module.exports = CachingMethodFactory;

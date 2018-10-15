class CachingMethodFactory {

  /**
   * Create a Caching Method based on Cache Configuration
   *
   * @param {{method: string, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}} CacheConfiguration
   * @return {AbstractRedisCache|AbstractCache}
   */
  static createCachingMethodInstance(CacheConfiguration) {
    let CachingMethod = undefined;

    switch (CacheConfiguration.method) {
      case CacheConfiguration.supportedMethods.REDIS:
        CachingMethod = CachingMethodFactory._createRedisClient(CacheConfiguration);
        break;
    }

    return CachingMethod;
  }

  /**
   * Create a Redis Client instance
   *
   * @param {{method: string, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}} CacheServerConfiguration
   * @return {AbstractRedisCache|AbstractCache}
   * @private
   */
  static _createRedisClient(CacheServerConfiguration) {
    const Redis = require('./Redis.js');
    return new Redis(CacheServerConfiguration);
  }

}

module.exports = CachingMethodFactory;

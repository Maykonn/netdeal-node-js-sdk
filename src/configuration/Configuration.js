const CachingMethodFactory = require('../infrastructure/cache/CachingMethodFactory.js');

/**
 * Netdeal API Configuration
 *
 * @type {{appId: string, secretPass: string, service: {scheme: string, endpoint: string}, resources: {requestAccessToken: {method: string, path: string}, sendEntity: {method: string, path: string}}}}
 */
const APIConfiguration = require('./APIConfiguration.js');

/**
 * SDK Cache Configuration
 *
 * @type {{method: string, enabled: boolean, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}}
 */
const CacheConfiguration = require('./CacheConfiguration.js');

/**
 * SDK Configuration
 */
class Configuration {

  /**
   * SDK Configuration
   *
   * @param {string} appId Your App ID (provided by Netdeal)
   * @param {string} secretPass Your Secret Pass (provided by Netdeal)
   */
  constructor(appId = '', secretPass = '') {
    /**
     * API Configuration
     *
     * @type {{appId: string, secretPass: string, service: {scheme: string, endpoint: string}, resources: {requestAccessToken: {method: string, path: string}, sendEntity: {method: string, path: string}}}}
     * @private
     */
    this._api = APIConfiguration;

    /**
     * Your App ID (provided by Netdeal)
     *
     * @type {string}
     */
    this._api.appId = appId;

    /**
     * Your Secret Pass (provided by Netdeal)
     *
     * @type {string}
     */
    this._api.secretPass = secretPass;

    /**
     * Cache configuration
     *
     * @type {{method: string, enabled: boolean, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}}
     * @private
     */
    this._cache = CacheConfiguration;

    /**
     * Configures the max length to an Entity Collection
     *
     * @see http://www.netdeal.com.br/documentation/#data-integration
     * @type {number}
     * @private
     */
    this._ENTITIES_COLLECTION_MAX_LENGTH = 1000;
  }

  /**
   * Retrieves your App ID (provided by Netdeal)
   *
   * @return {string}
   */
  get appId() {
    return this._api.appId;
  }

  /**
   * Configures your App ID (provided by Netdeal)
   *
   * @param {string} value
   */
  set appId(value) {
    this._api.appId = value;
  }

  /**
   * Retrieves your Secret Pass (provided by Netdeal)
   *
   * @return {string}
   */
  get secretPass() {
    return this._api.secretPass;
  }

  /**
   * Configures your Secret Pass (provided by Netdeal)
   *
   * @param {string} value
   */
  set secretPass(value) {
    this._api.secretPass = value;
  }

  /**
   * Retrieves the read only api configuration
   *
   * @return {{service: {scheme: string, endpoint: string}, resources: {requestAccessToken: {method: string, path: string}, sendEntity: {method: string, path: string}}}}
   */
  get api() {
    return {
      service: this._api.service,
      resources: this._api.resources
    };
  }

  /**
   * Retrieves the cache configuration
   *
   * @return {{method: string, enabled: boolean, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}}
   */
  get cache() {
    return {...this._cache};
  }

  /**
   * Configures the caching method
   *
   * @param {string} value
   */
  set cachingMethod(value) {
    if (value in this._cache.supportedMethods) {
      this._cache.method = value;
      return;
    }

    throw new Error('Invalid caching method, given: ' + value);
  }

  /**
   * Retrieves the cache server host
   *
   * @return {string}
   */
  get cacheServerHost() {
    return this._cache.server.host;
  }

  /**
   * Configures the cache server host
   *
   * @param {string} value
   */
  set cacheServerHost(value) {
    this._cache.server.host = value;
  }

  /**
   * Retrieves the cache server port
   *
   * @return {number}
   */
  get cacheServerPort() {
    return this._cache.server.port;
  }

  /**
   * Configures the cache server port
   *
   * @param {number} value
   */
  set cacheServerPort(value) {
    this._cache.server.port = value;
  }

  /**
   * Retrieves the max length to an Entity Collection
   *
   * @return {number}
   */
  get ENTITIES_COLLECTION_MAX_LENGTH() {
    return this._ENTITIES_COLLECTION_MAX_LENGTH;
  }

  /**
   * Enables the cache system
   */
  enableTheCache(method = this.cache.supportedMethods.REDIS, host = 'localhost', port = 6379) {
    if (!global.NetdealSDKCacheClient) {
      this.cachingMethod = method;
      this.cacheServerHost = host;
      this.cacheServerPort = port;
      this._cache.enabled = true;

      /**
       * Caching method abstraction
       *
       * @type {AbstractRedisCache|AbstractCache}
       */
      global.NetdealSDKCacheClient = CachingMethodFactory.createCachingMethodInstance(this.cache);
    }
  }

  /**
   * Disables the cache system
   */
  disableTheCache() {
    if (global.NetdealSDKCacheClient) {
      global.NetdealSDKCacheClient.closeConnection();
      global.NetdealSDKCacheClient = undefined;
    }

    this._cache.enabled = false;
  }
}

module.exports = Configuration;

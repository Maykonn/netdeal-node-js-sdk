/**
 * Netdeal API Configuration
 *
 * @type {{appId: string, secretPass: string, service: {scheme: string, endpoint: string}, resources: {requestAccessToken: {method: string, path: string}, sendEntity: {method: string, path: string}}}}
 */
const APIConfiguration = require('./APIConfiguration.js');

/**
 * SDK Configuration
 */
class Configuration {

  /**
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
}

module.exports = Configuration;

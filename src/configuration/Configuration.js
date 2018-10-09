/**
 * Netdeal API Configuration
 *
 * @type {{scheme: string, endpoint: string, appId: string, secretPass: string}}
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
  constructor(appId, secretPass) {
    /**
     * Your App ID (provided by Netdeal)
     *
     * @type {string}
     */
    this._appId = appId;

    /**
     * Your Secret Pass (provided by Netdeal)
     *
     * @type {string}
     */
    this._secretPass = secretPass;

    /**
     * API Configuration
     *
     * @type {{scheme: string, endpoint: string, appId: string, secretPass: string}}
     * @private
     */
    this._api = APIConfiguration;
  }

  /**
   * Retrieves your App ID (provided by Netdeal)
   *
   * @return {string}
   */
  get appId() {
    return this._appId;
  }

  /**
   * Configures your App ID (provided by Netdeal)
   *
   * @param {string} value
   */
  set appId(value) {
    this._appId = value;
  }

  /**
   * Retrieves your Secret Pass (provided by Netdeal)
   *
   * @return {string}
   */
  get secretPass() {
    return this._secretPass;
  }

  /**
   * Configures your Secret Pass (provided by Netdeal)
   *
   * @param {string} value
   */
  set secretPass(value) {
    this._secretPass = value;
  }
}

module.exports = Configuration;

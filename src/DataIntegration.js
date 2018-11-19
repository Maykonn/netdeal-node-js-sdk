const DataIntegrationHttpRequest = require('./http/request/DataIntegrationHttpRequest.js');
const HttpRequestDispatcher = require('./http/request/HttpRequestDispatcher.js');

class DataIntegration {

  constructor(Configuration, AccessTokenValue) {
    /**
     * SDK Configuration
     *
     * @type {Configuration}
     * @private
     */
    this._configuration = Configuration;

    /**
     * Access Token provided by Netdeal
     *
     * @type {string}
     * @private
     */
    this._accessTokenValue = AccessTokenValue;
  }

  /**
   * Request a new Access Token to Netdeal
   *
   * @param {EntitiesCollection} EntitiesCollection
   * @see http://www.netdeal.com.br/documentation/#authentication
   * @return {string}
   */
  async sendEntitiesCollection(EntitiesCollection) {
    let requestData = [];
    for (let Entity of EntitiesCollection.list) {
      const body = await this._createBodyIfNeedsToBeIntegrated(Entity);
      if (body) {
        requestData.push(body);
      }
    }

    if(requestData.length) {
      const HttpRequest = new DataIntegrationHttpRequest(
        this._configuration.api.service,
        this._configuration.api.resources.sendEntity,
        requestData,
        {'X-AUTH-TOKEN': this._accessTokenValue}
      );

      return await HttpRequestDispatcher.dispatch(HttpRequest);
    }

    // Any entity needs integration because doesn't exists any modification
    return true;
  }

  /**
   * Checks the needs of an Entity be integrated and assembles the
   * json properties required by the Integration API, when necessary
   *
   * @param {Entity} Entity
   * @return {{key: {}, properties: {}} | boolean}
   * @private
   */
  async _createBodyIfNeedsToBeIntegrated(Entity) {
    const needsIntegration = await Entity.isModified();

    if (false === this._configuration.cache.enabled || needsIntegration) {
      return Entity.integrationData;
    }

    return false;
  }

}

module.exports = DataIntegration;

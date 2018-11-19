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
    console.log('INTEGRATING THE COLLECTION');
    const requestData = EntitiesCollection.list.map(Entity => this._createBodyIfNeedsToBeIntegrated(Entity));
    await Promise.all(requestData);
    //console.log('requestData', requestData);

    const HttpRequest = new DataIntegrationHttpRequest(
      this._configuration.api.service,
      this._configuration.api.resources.sendEntity,
      requestData,
      {'X-AUTH-TOKEN': this._accessTokenValue}
    );

    return await HttpRequestDispatcher.dispatch(HttpRequest);
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
    if (false === this._configuration.cache.enabled || await Entity.isModified()) {
      return Entity.integrationData;
    }

    return false;
  }

}

module.exports = DataIntegration;

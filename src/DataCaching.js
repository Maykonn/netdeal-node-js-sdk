class DataCaching {

  constructor(Configuration) {
    /**
     * SDK Configuration
     *
     * @type {Configuration}
     * @private
     */
    this._configuration = Configuration;
  }

  /**
   * Stores a full collection into the cache system
   *
   * @param {EntitiesCollection} EntitiesCollection
   */
  async storeEntitiesCollection(EntitiesCollection) {
    if (this._configuration.cache.enabled) {
      // iterate over each Entity and with redis hset fill each necessary entity field into the hash
      for (let Entity of EntitiesCollection.list) {
        await this.storeEntity(Entity);
      }
    }

    return true;
  }

  /**
   * Stores a specific entity into the cache system
   *
   * @param {Entity} Entity
   */
  async storeEntity(Entity) {
    if (await Entity.isModified()) {
      const dataToCache = {
        hash: Entity.hash,
        integrationData: Entity.integrationDataAsString
      };

      global.NetdealSDKCacheClient.hmset(Entity.cacheKey, dataToCache);
    }

    return true;
  }

}

module.exports = DataCaching;

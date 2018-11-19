class DataCache {

  /**
   * Stores a full collection into the cache system
   *
   * @param {EntitiesCollection} EntitiesCollection
   */
  async storeEntitiesCollection(EntitiesCollection) {
    // iterate over each Entity and with redis hset fill each necessary entity field into the hash
    for (let Entity of EntitiesCollection.list) {
      await this.storeEntity(Entity);
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

      global.CacheClient.hmset(Entity.cacheKey, dataToCache);
    }

    return true;
  }

}

module.exports = DataCache;

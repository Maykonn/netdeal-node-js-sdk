class DataCache {

  constructor() {

  }

  /**
   * Stores a full collection into the cache system
   *
   * @param {EntitiesCollection} EntitiesCollection
   */
  storeEntitiesCollection(EntitiesCollection) {
    // iterate over each Entity and with redis hset fill each necessary entity field into the hash
    EntitiesCollection.list.map(Entity => this.storeEntity(Entity));
  }

  /**
   * Stores a specific entity into the cache system
   *
   * @param {Entity} Entity
   */
  storeEntity(Entity) {
    const dataToCache = {
      hash: Entity.hash,
      integrationData: Entity.integrationDataAsString
    };

    console.log(Entity.cacheKey + ':');
    console.log(dataToCache);
    console.log('');

    global.CacheClient.hmset(Entity.cacheKey, dataToCache);
  }

}

module.exports = DataCache;

class DataCache {

  constructor() {

  }

  /**
   * Stores a full collection into the cache system
   *
   * @param EntitiesCollection
   */
  storeEntitiesCollection(EntitiesCollection) {
    // iterate over each Entity and with redis hset fill each necessary entity field into the hash
    const requestData = EntitiesCollection.list.map(Entity => this.storeEntity(Entity));
  }

  /**
   * Stores a specific entity into the cache system
   */
  storeEntity() {

  }

}

module.exports = DataCache;

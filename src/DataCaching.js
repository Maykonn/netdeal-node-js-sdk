class DataCache {

  constructor() {

  }

  /**
   * Stores a full collection into the cache system
   */
  storeCollection(Collection) {
    // iterate over the entity properties and with redis hset fill each necessary field on hash
  }

}

module.exports = DataCache;

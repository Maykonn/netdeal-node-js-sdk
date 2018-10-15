const AbstractCache = require('./AbstractCache.js');

class RedisAbstractCache extends AbstractCache {

  /**
   * Retrieves data from cache server
   */
  getAsync() {
    throw new Error('Method requires implementation, see the cache client concrete object');
  }

}

module.exports = AbstractCache;

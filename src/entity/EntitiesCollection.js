const Configuration = require('../configuration/Configuration.js');
const Entity = require('./Entity.js');

class EntitiesCollection {

  /**
   * @param {Configuration} Configuration
   */
  constructor(Configuration) {
    /**
     * SDK Configuration
     *
     * @type {Configuration}
     * @private
     */
    this._configuration = Configuration;

    /**
     * The collection items list
     *
     * @type {Array}
     * @private
     * @TODO MAX ITEMS 1000
     */
    this._list = [];

    /**
     * A flag regarding system cache status
     *
     * @type {boolean}
     * @private
     */
    this._systemCacheIsEnabled = Configuration.cache.enabled;
  }

  /**
   * Return a copy of the collection list, thus
   * the collection is immutable through this getter
   *
   * @return {{}}
   */
  get list() {
    return this._list;
  }

  /**
   * Add many Entities at same time, into the collection
   *
   * @param {Array} args Array of Entities
   * @return {boolean}
   */
  addMany(args) {
    for (let entity of args) {
      this.add(entity);
    }

    return true;
  }

  /**
   * Add one Entities into the collection
   *
   * @param {Entity} entity An Entity instance
   * @return {boolean}
   */
  add(entity) {
    if (!this._isEntity(entity)) {
      throw new Error('The entity param must be an Entity instance');
    }

    entity.systemCacheIsEnabled = this._configuration.cache.enabled;

    this._list.push(entity);
    return true;
  }

  /**
   * Removes an Entity from collection list
   *
   * @param entityToRemove
   */
  del(entityToRemove) {
    if (!this._isEntity(entityToRemove)) {
      throw new Error('The entityToRemove param must be an Entity instance');
    }

    this._list = this._list.filter(entity => entity.id !== entityToRemove.id);
  }


  /**
   * Verify if entity is an Instance Of Entity
   *
   * @param entity
   * @return {boolean}
   * @private
   */
  _isEntity(entity) {
    return entity instanceof Entity;
  }

}

module.exports = EntitiesCollection;

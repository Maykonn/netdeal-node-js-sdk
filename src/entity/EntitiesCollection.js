const Entity = require('./Entity.js');

class EntitiesCollection {

  constructor() {
    this._list = [];
  }

  /**
   * Return a copy of the collection list, thus
   * the collection is immutable through this getter
   *
   * @return {{}}
   */
  get list() {
    return JSON.parse(JSON.stringify(this._list));
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

    this._list.push(entity);
    return true;
  }

  /**
   * Add many Entities at same time, into the collection
   *
   * @param {Array} args Array of Entities
   * @return {boolean}
   */
  addMany(args) {
    for (let entity of args) {
      if (!this._isEntity(entity)) {
        throw new Error('The entity param must be an Entity instance');
      }

      this._list.push(entity);
    }

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

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
   * @param {Array} entity An Entity instance
   * @return {boolean}
   */
  add(entity) {
    this._list.push(entity);
    return true;
  }

  /**
   * Add many Entities at same time, into the collection
   *
   * @param {Entity} args Array of Entities
   * @return {boolean}
   */
  addMany(args) {
    for (let entity of args) {
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
    this._list = this._list.filter(entity => entity.id !== entityToRemove.id);
  }

}

module.exports = EntitiesCollection;

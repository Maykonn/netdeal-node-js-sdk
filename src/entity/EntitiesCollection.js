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

  add(...args) {
    for (const entity of args) {
      this._list.push(entity);
    }
  }

  del(entityToRemove) {
    this._list = this._list.filter(entity => entity.id !== entityToRemove.id);
  }

}

module.exports = EntitiesCollection;

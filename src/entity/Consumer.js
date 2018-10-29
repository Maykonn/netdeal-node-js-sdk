const Entity = require('./Entity.js');

class Consumer extends Entity {

  constructor() {
    super();

    this._key = 'consumer';
  }

  /**
   * Retrieves the Entity key
   *
   * @return {string}
   */
  get key() {
    return this._key;
  }

  /**
   * "Abstract" method, could not be implemented
   *
   * @param {string} value
   */
  set key(value) {
    throw new Error('The Consumer entity key is immutable');
  }

}

module.exports = Consumer;

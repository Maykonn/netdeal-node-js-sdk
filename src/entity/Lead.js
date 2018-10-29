const Entity = require('./Entity.js');

class Lead extends Entity {
  constructor() {
    super();

    this._key = 'lead';
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
    throw new Error('The Lead entity key is immutable');
  }
}

module.exports = Lead;

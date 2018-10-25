class Entity {

  constructor() {
    /**
     * @type {string}
     * @private
     */
    this._key = '';

    /**
     * @type {{}}
     * @private
     */
    this._properties = {id: ''};
  }

  /**
   * @return {string}
   */
  get key() {
    return this._key;
  }

  /**
   * @param {string} value
   */
  set key(value) {
    if (typeof value === 'string') {
      this._key = value.toLowerCase();
    }

    throw new Error('The entity key must be a lowercase string');
  }

  /**
   * @return {{}}
   */
  get properties() {
    return this._properties;
  }

  /**
   * Set the entity properties
   *
   * @param {{}} properties
   */
  set properties(properties) {
    this._properties = properties;

    if (!this.isValid()) {
      throw new Error('Entity is in a invalid state, the id property and entity key are required');
    }
  }

  /**
   * Verify if the entity is valid
   *
   * @return {boolean}
   */
  isValid() {
    return (
      typeof this._key !== 'undefined' &&
      typeof this._properties === 'object' &&
      typeof this._properties.id !== 'undefined' &&
      this._properties.id !== ''
    );
  }

}

module.exports = Entity;

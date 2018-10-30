class Entity {

  constructor() {
    /**
     * Entity key
     *
     * @type {string}
     * @private
     */
    this._key = '';

    /**
     * Entity properties, notice that the ID is required
     *
     * @type {{}}
     * @protected
     */
    this._properties = {id: ''};
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
   * Configures the Entity key
   *
   * @param {string} value
   */
  set key(value) {
    if (typeof value === 'string') {
      this._key = value.toLowerCase();
    }

    throw new Error('The entity key must be a lowercase string');
  }

  /**
   * Retrieves the Entity ID property
   *
   * @return {string}
   */
  get id() {
    return this._properties.id;
  }

  /**
   * Configures the Entity ID
   *
   * @param {string} id
   */
  set id(id) {
    this._properties.id = id;
  }

  /**
   * Retrieves the Entity properties
   *
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
    for(const attr in properties) {
      this._properties[attr] = properties[attr];
    }

    if (!this.isValid()) {
      throw new Error('Entity is in a invalid state, the id property and entity key are required');
    }
  }

  /**
   * Add a specific property
   *
   * @param {string} name
   * @param {string} value
   */
  addProperty(name, value) {
    this._properties[name] = value;
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

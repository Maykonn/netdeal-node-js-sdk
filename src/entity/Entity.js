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
     * Entity properties
     *
     * @type {{}}
     * @protected
     */
    this._properties = {};

    /**
     * A flag regarding system cache status
     *
     * @type {boolean}
     * @private
     */
    this._systemCacheIsEnabled = true;
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
    this.addProperty('id', id);
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
    for (const attr in properties) {
      this.addProperty(attr, properties[attr]);
    }

    if (!this.isValid()) {
      throw new Error('Entity is in a invalid state, the id property and entity key are required, given:\n' + JSON.stringify(this) + '\n');
    }
  }

  /**
   * Enable/Disable the Entities cache system
   */
  set systemCacheIsEnabled(value) {
    this._systemCacheIsEnabled = value;
  }

  /**
   * Add a specific property
   *
   * @param {string} name
   * @param {*} value
   */
  addProperty(name, value = null) {
    this._properties[name] = (value);
  }

  /**
   * Verify if the entity is valid
   *
   * @return {boolean}
   */
  isValid() {
    return (
      typeof this._key !== 'undefined' &&
      typeof this._properties === 'object'
    );
  }

  /**
   * Verify if the Entity needs to be sent to Netdeal
   * Verification is made comparing the hashes of the entity and of the cache
   *
   * @return {boolean}
   */
  needsIntegration() {
    if (this._systemCacheIsEnabled) {

    }

    // if the cache is disabled, always needs integration
    return true;
  }

}

module.exports = Entity;

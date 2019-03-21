const crypto = require('crypto');

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
    this._systemCacheIsEnabled = false;
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
      return;
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
   * Retrieves the Entity's cache key (requires an id)
   *
   * @return {string}
   * @throws {Error}
   */
  get cacheKey() {
    if (!this._idIsValid()) {
      throw new Error('An ID is required to get the entity cache key, given:\n' + JSON.stringify(this) + '\n');
    }

    return this.key + ':' + this.id;
  }

  /**
   * Retrieves a hash representing the current state of the Entity
   *
   * @return {string}
   */
  get hash() {
    return crypto.createHash('sha1').update(JSON.stringify(this)).digest('hex');
  }

  /**
   * Retrieves the data to be integrated with Netdeal
   *
   * @return {{key: string, properties: {}}}
   */
  get integrationData() {
    return {key: this._key, properties: this._properties};
  }

  /**
   * Retrieves the data to be integrated with Netdeal as string
   *
   * @return {string}
   */
  get integrationDataAsString() {
    return JSON.stringify(this.integrationData);
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
   * Verify if the Entity have some data modified
   * Verification is made comparing the hashes of the entity and of the cache
   *
   * @return {boolean}
   */
  async isModified() {
    let isModified = true;

    // if the cache is disabled integration is necessary
    if (this._systemCacheIsEnabled) {
      const cachedHash = await global.NetdealSDKCacheClient.hget(this.cacheKey, 'hash');
      isModified = this.hash !== cachedHash;
    }

    return isModified;
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
   * Verify if the entity have an ID
   *
   * @return {boolean}
   */
  _idIsValid() {
    return typeof this.properties.id !== 'undefined' && this.properties.id !== '';
  }

}

module.exports = Entity;

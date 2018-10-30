const Entity = require('./Entity.js');

class Consumer extends Entity {

  constructor() {
    super();

    /**
     * The consumer entity key
     *
     * @type {string}
     * @see http://www.netdeal.com.br/documentation/#data-integration
     * @private
     */
    this._key = 'consumer';

    /**
     * Adding default properties to Consumer entity
     *
     * @see http://www.netdeal.com.br/documentation/#data-integration
     */
    this.addProperty('name');
    this.addProperty('email');
    this.addProperty('identifier');
    this.addProperty('cellphone');
    this.addProperty('birthday');
    this.addProperty('photo');
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

  /**
   * Retrieves the name property
   */
  get name() {
    return this.properties.name;
  }

  /**
   * Configures the name property
   *
   * @param {string} value
   */
  set name(value) {
    this.addProperty('name', value);
  }

  /**
   * Retrieves the email property
   */
  get email() {
    return this.properties.email;
  }

  /**
   * Configures the email property
   *
   * @param {string} value
   */
  set email(value) {
    this.addProperty('email', value);
  }

  /**
   * Retrieves the identifier property
   */
  get identifier() {
    return this.properties.identifier;
  }

  /**
   * Configures the identifier property
   *
   * @param {string} value
   */
  set identifier(value) {
    this.addProperty('identifier', value);
  }

  /**
   * Retrieves the cellphone property
   */
  get cellphone() {
    return this.properties.cellphone;
  }

  /**
   * Configures the cellphone property
   *
   * @param {string} value
   */
  set cellphone(value) {
    this.addProperty('cellphone', value);
  }

  /**
   * Retrieves the birthday property
   */
  get birthday() {
    return this.properties.birthday;
  }

  /**
   * Configures the birthday property
   *
   * @param {string} value
   */
  set birthday(value) {
    this.addProperty('birthday', value);
  }

  /**
   * Retrieves the photo property
   */
  get photo() {
    return this.properties.photo;
  }

  /**
   * Configures the photo property
   *
   * @param {string} value
   */
  set photo(value) {
    this.addProperty('photo', value);
  }

}

module.exports = Consumer;

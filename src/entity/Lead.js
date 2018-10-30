const Entity = require('./Entity.js');

class Lead extends Entity {

  constructor() {
    super();

    this._key = 'lead';

    /**
     * Adding default properties to Consumer entity
     *
     * @see http://www.netdeal.com.br/documentation/#data-integration
     */
    this.addProperty('email');
    this.addProperty('consumer_id');
    this.addProperty('cluster');
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

  /**
   * Retrieves the name property
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
   * Retrieves the consumer_id property
   */
  get consumerId() {
    return this.properties.consumer_id;
  }

  /**
   * Configures the email property
   *
   * @param {string} value
   */
  set consumerId(value) {
    this.addProperty('consumer_id', value);
  }

  /**
   * Retrieves the cluster property
   */
  get cluster() {
    return this.properties.cluster;
  }

  /**
   * Configures the cluster property
   *
   * @param {{}} value
   */
  set cluster(value) {
    this.addProperty('cluster', value);
  }

}

module.exports = Lead;

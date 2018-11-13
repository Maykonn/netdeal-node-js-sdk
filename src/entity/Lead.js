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

  /**
   * Retrieves the Entity's cache key (requires an consumerId)
   *
   * @return {string}
   * @throws {Error}
   */
  get cacheKey() {
    if (!this._consumerIdIsValid()) {
      throw new Error('An consumerId is required to get the entity cache key, given:\n' + JSON.stringify(this) + '\n');
    }

    return this.key + ':' + this.consumerId;
  }

  /**
   * Verify if the entity have an consumerId
   *
   * @return {boolean}
   */
  _consumerIdIsValid() {
    return typeof this.properties.consumerId !== 'undefined' && this.properties.consumerId !== '';
  }

}

module.exports = Lead;

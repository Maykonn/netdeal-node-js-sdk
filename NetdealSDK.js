const AccessToken = require('./src/AccessToken.js');

/**
 * Netdeal Node.js SDK
 *
 * @author Maykonn Welington Candido <maykonn@outlook.com> (http://github.com/maykonn)
 * @type {{Configuration: Configuration, Consumer, ConsumersCollection, sendConsumer: function(Consumer), sendConsumers: function(ConsumersCollection)}}
 */
module.exports = {

  Configuration: require('./src/configuration/Configuration.js'),
  Lead: require('./src/entity/Lead.js'),
  Consumer: require('./src/entity/Consumer.js'),
  EntitiesCollection: require('./src/entity/EntitiesCollection.js'),

  /**
   * Send a collection of Consumers or Leads entities to Netdeal
   *
   * @param {EntitiesCollection} collection
   */
  sendEntities: (collection) => {
    const accessToken = (new AccessToken(this.Configuration)).token;
  }

};

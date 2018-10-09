/**
 * Netdeal Node.js SDK
 *
 * @author Maykonn Welington Candido <maykonn@outlook.com> (http://github.com/maykonn)
 * @type {{Configuration, Consumer, ConsumersCollection, sendConsumer: function(Consumer), sendConsumers: function(ConsumersCollection)}}
 */
module.exports = {
  Configuration: require('./src/configuration/Configuration.js'),
  Consumer: require('./src/Consumer.js'),
  ConsumersCollection: require('./src/ConsumersCollection.js'),
  /**
   * Send the consumer data to Netdeal
   *
   * @param {Consumer} consumer
   */
  sendConsumer: (consumer) => {

  },
  /**
   * Send a collection of consumers to Netdeal
   *
   * @param {ConsumersCollection} consumers
   */
  sendConsumers: (consumers) => {

  }
};

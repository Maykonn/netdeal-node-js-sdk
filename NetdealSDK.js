const Process = require('global-process-queue-js');
const Configuration = require('./src/configuration/Configuration.js');
const AccessToken = require('./src/AccessToken.js');
const EntitiesCollection = require('./src/entity/EntitiesCollection.js');
const DataIntegration = require('./src/DataIntegration.js');
const DataCaching = require('./src/DataCaching.js');

/**
 * The SDK exposed modules
 *
 * @type {{Configuration: Configuration, Lead: Lead, Consumer: Consumer}}
 */
const Modules = {
  Configuration: new Configuration(),
  Lead: require('./src/entity/Lead.js'),
  Consumer: require('./src/entity/Consumer.js'),
};

/**
 * Netdeal Node.js SDK
 *
 * @author Maykonn Welington Candido <maykonn@outlook.com> (http://github.com/maykonn)
 * @type {{Configuration: Configuration, Lead: Lead, Consumer: Consumer, EntitiesCollection, sendEntities: function(EntitiesCollection)}}
 */
module.exports = {

  /**
   * The SDK exposed modules
   */
  ...Modules,

  /**
   * Creates a new EntitiesCollection instance with the required configuration
   *
   * @return {EntitiesCollection}
   */
  createEntitiesCollection: () => {
    return new EntitiesCollection(Modules.Configuration);
  },

  /**
   * Send a collection of Consumers or Leads entities to Netdeal
   *
   * @param {EntitiesCollection} EntitiesCollection
   * @return {Promise<{}>}
   */
  integrate: async (EntitiesCollection) => {
    /**
     * Process Response
     *
     * @type {{}}
     */
    let response = {};

    /**
     * Process Handler
     *
     * @type {GlobalProcess}
     */
    const ProcessFlow = new Process.Handler();

    /**
     * Sends the Collection items to Netdeal
     *
     * @return {Promise<*>}
     */
    const dataIntegration = async () => {
      const AccessTokenValue = await (new AccessToken(Modules.Configuration)).getToken();
      const Integration = new DataIntegration(Modules.Configuration, AccessTokenValue);
      response = await Integration.sendEntitiesCollection(EntitiesCollection);
    };

    /**
     * Stores the Collection into the cache storage
     *
     * @return {Promise<boolean>}
     */
    const dataCaching = async () => {
      await (new DataCaching(Modules.Configuration)).storeEntitiesCollection(EntitiesCollection);
    };

    // will await the two processes below to close the redis connection
    ProcessFlow.add(dataIntegration, Process.AWAIT);
    ProcessFlow.add(dataCaching, Process.AWAIT);
    await ProcessFlow.exec();

    console.log('response');
    console.log(response);

    return response;
  }

};

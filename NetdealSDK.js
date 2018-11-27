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

const initializer = () => {
  /**
   * Access Token is required by all API requests
   *
   * @type {string}
   */
  global.AccessToken = '';
};

const finisher = () => {
  if (global.CacheClient) {
    global.CacheClient.closeConnection();
  }
};

/**
 * SDK Processes Handler
 *
 * @type {GlobalProcess}
 */
const SystemFlow = new Process.Handler(initializer, finisher);

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
    let response = {};

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
    SystemFlow.add(dataIntegration, Process.AWAIT);
    SystemFlow.add(dataCaching, Process.AWAIT);
    await SystemFlow.exec();

    return await response;
  }

};

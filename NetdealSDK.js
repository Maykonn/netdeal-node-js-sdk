const Process = require('global-process-queue-js');
const Configuration = require('./src/configuration/Configuration.js');
const AccessToken = require('./src/AccessToken.js');
const CachingMethodFactory = require('./src/infrastructure/cache/CachingMethodFactory.js');
const DataIntegration = require('./src/DataIntegration.js');
const EntitiesCollection = require('./src/entity/EntitiesCollection.js');

/**
 * The SDK exposed modules
 *
 * @type {{Configuration: Configuration, Lead: Lead, Consumer: Consumer, EntitiesCollection: EntitiesCollection}}
 */
const Modules = {
  Configuration: new Configuration(),
  Lead: require('./src/entity/Lead.js'),
  Consumer: require('./src/entity/Consumer.js')
};

/**
 * SDK Process Initializer
 */
const initializer = () => {
  /**
   * Caching method abstraction
   *
   * @type {AbstractRedisCache|AbstractCache}
   */
  global.CacheClient = CachingMethodFactory.createCachingMethodInstance(Modules.Configuration.cache);

  /**
   * Access Token provided by Netdeal, is required by all API requests
   *
   * @type {string}
   */
  global.AccessToken = '';
};

/**
 * SDK Process Finisher
 */
const finisher = () => {
  global.CacheClient.closeConnection();
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
   * @param {EntitiesCollection} Collection
   * @return {Promise<void>}
   */
  integrate: async (Collection) => {
    /**
     * Sends the Collection items to Netdeal
     *
     * @return {Promise<*>}
     */
    const dataIntegration = async () => {
      const AccessTokenValue = await (new AccessToken(Modules.Configuration)).getToken();
      const Integration = new DataIntegration(Modules.Configuration, AccessTokenValue);
      return await Integration.sendEntities(Collection);
    };

    /**
     * Caches the Collection into cache storage
     *
     * @return {Promise<void>}
     */
    const dataCaching = async () => {

    };

    SystemFlow.add(dataIntegration, Process.AWAIT);
    SystemFlow.add(dataCaching, Process.ASYNC);
    SystemFlow.exec();
  }

};

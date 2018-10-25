const Process = require('global-process-queue-js');
const Configuration = require('./src/configuration/Configuration.js');
const AccessToken = require('./src/AccessToken.js');
const CachingMethodFactory = require('./src/infrastructure/cache/CachingMethodFactory.js');

/**
 * The SDK exposed modules
 *
 * @type {{Configuration: Configuration, Lead: Lead, Consumer: Consumer, EntitiesCollection: EntitiesCollection}}
 */
const Modules = {
  Configuration: new Configuration(),
  Lead: require('./src/entity/Lead.js'),
  Consumer: require('./src/entity/Consumer.js'),
  EntitiesCollection: require('./src/entity/EntitiesCollection.js')
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


let AccessTokenValue = '';

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
   * Send a collection of Consumers or Leads entities to Netdeal
   *
   * @param {EntitiesCollection} collection
   */
  sendEntities: async (collection) => {
    const test1 = (async () => {
      AccessTokenValue = await (new AccessToken(Modules.Configuration)).getToken();
      console.log('1accessToken', AccessTokenValue);
      return '';
    });

    SystemFlow.add(test1, Process.AWAIT);

    SystemFlow.exec();
  }

};

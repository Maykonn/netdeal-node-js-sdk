const Configuration = require('./src/configuration/Configuration.js');
const AccessToken = require('./src/AccessToken.js');
const CachingMethodFactory = require('./src/infrastructure/cache/CachingMethodFactory.js');

/**
 * The SDK exposed modules
 *
 * @type {{Configuration: Configuration, Lead: Lead, Consumer: Consumer, EntitiesCollection}}
 */
const Modules = {
  Configuration: new Configuration(),
  Lead: require('./src/entity/Lead.js'),
  Consumer: require('./src/entity/Consumer.js'),
  EntitiesCollection: require('./src/entity/EntitiesCollection.js')
};

/**
 * Cache method abstraction
 *
 * @type {AbstractRedisCache|AbstractCache}
 */
global.CacheClient = CachingMethodFactory.createCachingMethodInstance(Modules.Configuration.cache);

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
    const accessToken = await (new AccessToken(Modules.Configuration)).getToken();
    console.log('accessToken', accessToken);

    CacheClient.closeConnection();
  }

};

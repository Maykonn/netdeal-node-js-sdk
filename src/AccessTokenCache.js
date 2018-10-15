const CachingMethodFactory = require('./infrastructure/cache/CachingMethodFactory.js');

class AccessTokenCache {

  /**
   * CacheConfiguration
   *
   * @param {{method: string, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}} Configuration
   */
  constructor(Configuration) {
    /**
     * Cache configuration
     *
     * @type {{method: string, server: {host: string, port: number}, accessTokenKey: string, accessTokenKeyTTL: number, supportedMethods: {REDIS: string}}}
     * @private
     */
    this._configuration = Configuration;

    /**
     * The cache client instance
     *
     * @type {AbstractRedisCache|AbstractCache}
     * @private
     */
    this._cacheClient = CachingMethodFactory.createCachingMethodInstance(this._configuration)
  }

  /**
   * Stores the token on cache with the configured TTL
   *
   * @param {string} value The token
   */
  set token(value) {
    console.log('HERRE1.1');
    return (async () => {
      const ttl = await this._getTTL();
      return this._token = await this._cacheClient.setex(this._configuration.accessTokenKey, ttl, value)
    })();
  }

  /**
   * @return {string}
   */
  async getToken() {
    return await this._cacheClient.get(this._configuration.accessTokenKey);
  }

  /**
   * Verifica o ttl valido (restante) do token.
   * Isso evita salvar erroneamente um ttl de 29min para o token que ja existe a um tempo no cache.
   *
   * Por exemplo:
   * Se salvarmos um ttl de 29min para um token que ja esta no cache a 10min apos se passar
   * 19min as requests para o netdeal voltaram com acesso negado.
   * Gerenciando o ttl restante podemos portanto economizar essas requests com acesso negado
   * prevendo quando isso ira ocorrer e entao podemos solicitar um novo token antes de ter
   * requests com erro(economizando recursos de servidor: processamento, memoria e principalmente rede).
   *
   * OBS: nao testo milisegundos pois no nosso caso seria um exagero e bem
   * mais complicado devido limitaçoes da rede(seria necessario um bom gerenciamento
   * do tempo de resposta em milisegundos da rede), mas poderia ser feito,
   * com PTTL. Por isso seria um exagero para nosso caso, gerenciar a rede em milisegundos nao e trivial.
   *
   * @see https://redis.io/commands/ttl
   * @return int
   */
  async _getTTL() {
    let ttl = this._configuration.accessTokenKeyTTL;

    let remainingTTL = await this._cacheClient.ttl(this._configuration.accessTokenKey);

    // -1 ou -2 deve setar o ttl padrao de self::TTL
    // @see https://redis.io/commands/ttl
    if (remainingTTL > 0) {
      // exemplo:
      // (29min default - 10min decorridos) = 19min de TTL ao inves de 29min
      ttl = remainingTTL;
    }

    return ttl;
  }

  /**
   * Close the cache connection
   */
  closeConnection() {
    this._cacheClient.closeConnection();
  }
}

module.exports = AccessTokenCache;

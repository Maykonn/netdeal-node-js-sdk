const AccessToken = require('./AccessToken.js');

class AccessTokenCache {

  /**
   * @return {string}
   */
  get token() {
    // verify if is cached already
    return '';
  }

  /**
   * @param {string} token
   */
  set token(token) {
    // stores the value on cache
    // $this->redis->setex(self::KEY, $this->getTTL(), trim($value));
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
  getTTL() {
    /*$ttl = self::TTL;

        if($this->serverUp) {
            $remainingTTL = $this->redis->ttl(self::KEY);

            // -1 ou -2 deve setar o ttl padrao de self::TTL
            // @see https://redis.io/commands/ttl
            if($remainingTTL > 0) {
                // exemplo:
                // (29min default - 10min decorridos) = 19min de TTL ao inves de 29min
                $ttl = $remainingTTL;
            }
        }

        return $ttl;*/
  }

}

module.exports = AccessTokenCache;

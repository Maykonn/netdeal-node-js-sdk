const AbstractRedisCache = require('./AbstractRedisCache.js');
const {promisify} = require('util');

class Redis extends AbstractRedisCache {

  async get(key) {
    const get = promisify(this._client.get).bind(this._client);
    return await get(key);
  }

  async setex(key, ttl, value) {
    const setex = promisify(this._client.setex).bind(this._client);
    return await setex(key, ttl, value);
  }

  async ttl(key) {
    const ttl = promisify(this._client.ttl).bind(this._client);
    return await ttl(key);
  }

  async hset(key, field, value) {
    const hset = promisify(this._client.hset).bind(this._client);
    return await hset(key, field, value);
  }

  async hget(key, field, value) {
    const hget = promisify(this._client.hget).bind(this._client);
    return await hget(key, field, value);
  }
}

module.exports = Redis;

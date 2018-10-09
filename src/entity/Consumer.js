const Entity = require('./Entity.js');

class Consumer extends Entity {

  constructor() {
    super();

    this._key = 'consumer';
  }

  set key(value) {
    throw new Error('The Consumer entity key is immutable');
  }

}

module.exports = Consumer;

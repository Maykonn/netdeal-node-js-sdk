const Entity = require('./Entity.js');

class Lead extends Entity {
  constructor() {
    super();

    this._key = 'lead';
  }

  set key(value) {
    throw new Error('The Lead entity key is immutable');
  }
}

module.exports = Lead;

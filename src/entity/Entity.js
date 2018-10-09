class Entity {
  constructor() {
    this._key = '';
    this._properties = {};
  }

  get key() {
    return this._key;
  }

  set key(value) {
    this._key = value;
  }

  get properties() {
    return this._properties;
  }

  set properties(values) {
    this._properties = values;
  }
}

module.exports = Entity;

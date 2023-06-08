export const getDataStore = () => ({
  _data: {},
  set(name, item) {
    this._data[name] = item;
  },
  get(name) {
    return this._data[name];
  },
  getAll() {
    return this._data;
  },
  clear() {
    this._data = {};
  }
});
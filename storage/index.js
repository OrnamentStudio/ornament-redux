const updeep = require('updeep');
const store = require('../store');


const getStorage = (key) => store.get(key);
const setStorage = (key, payload) => store.set(key, payload);

const types = {
  STORAGE_SET: 'storage@STORAGE_SET',
};

const actions = {
  setStorage(payload) {
    return { type: types.STORAGE_SET, payload };
  },
};

const createReducer = (key) => (state = {}, action) => {
  switch (action.type) {
    case types.STORAGE_SET: {
      if (action.payload === null) return {};

      const update = updeep(action.payload, state);
      setStorage(key, update);
      return update;
    }
    default: {
      return state;
    }
  }
};

module.exports = {
  getStorage,
  setStorage,

  types,
  actions,
  createReducer,
};

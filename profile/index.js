const updeep = require('updeep');
const store = require('../store');
const { resolved } = require('../network/types');


const getProfile = (key) => store.get(key);
const setProfile = (key, payload) => store.set(key, payload);

const types = {
  PROFILE_SET: 'profile@PROFILE_SET',
  PROFILE_LOCAL_UPDATE: 'profile@PROFILE_LOCAL_UPDATE',

  PROFILE_GET: 'profile@PROFILE_GET',
  PROFILE_UPDATE: 'profile@PROFILE_UPDATE',

  PROFILE_DELETE: 'profile@PROFILE_DELETE',
};

const actions = {
  setProfile(payload) {
    return { type: types.PROFILE_SET, payload };
  },

  updateLocalProfile(payload) {
    return { type: types.PROFILE_LOCAL_UPDATE, payload };
  },

  getProfile(url) {
    return {
      type: types.PROFILE_GET,
      request: { url },
    };
  },

  updateProfile(url, payload) {
    return {
      type: types.PROFILE_UPDATE,
      request: {
        url,
        payload,
        type: 'put',
      },
    };
  },

  deleteProfile(url, payload) {
    return {
      type: types.PROFILE_DELETE,
      request: {
        payload,
        url,
        type: 'delete',
      },
    };
  },
};

const createReducer = (key) => (state = null, action) => {
  switch (action.type) {
    case types.PROFILE_SET:
    case resolved(types.PROFILE_GET):
    case resolved(types.PROFILE_UPDATE): {
      setProfile(key, action.payload);
      return action.payload;
    }

    case types.PROFILE_LOCAL_UPDATE: {
      const update = updeep(action.payload, state);
      setProfile(key, update);
      return update;
    }

    default: {
      return state;
    }
  }
};

module.exports = {
  getProfile,
  setProfile,

  types,
  actions,
  createReducer,
};

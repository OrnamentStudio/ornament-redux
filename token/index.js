const Cookies = require('js-cookie');


const getToken = (key) => Cookies.get(key);
const setToken = (key, token, options) => {
  if (!token && !getToken(key)) return;

  if (token) {
    Cookies.set(key, token, options);
  } else {
    Cookies.remove(key);
  }
};

const types = {
  TOKEN_SET: 'token@TOKEN_SET',
};

const actions = {
  setToken(payload) {
    return { type: types.TOKEN_SET, payload };
  },
};

const createReducer = (key, options) => (state = null, action) => {
  switch (action.type) {
    case types.TOKEN_SET: {
      if (process.browser) setToken(key, action.payload, options);
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

module.exports = {
  getToken,
  setToken,

  types,
  actions,
  createReducer,
};

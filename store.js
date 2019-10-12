let store;

// eslint-disable-next-line global-require
if (process.browser) store = require('store');

exports.set = (key, value) => store && store.set(key, value);
exports.get = (key) => (store && store.get(key)) || null;
exports.remove = (key) => store && store.remove(key);

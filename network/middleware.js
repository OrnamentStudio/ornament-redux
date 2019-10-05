const request = require('./request');
const { resolved, rejected } = require('./types');


module.exports = (config = {}) => (store) => (next) => (action) => {
  if (!action.request) return next(action);

  const { apiRoot } = config;
  const { request: options, type } = action;
  const { shouldRequest, ...cleanOptions } = options;

  if (shouldRequest && !shouldRequest(store.getState())) {
    return Promise.resolve();
  }

  const { promise } = request({ apiRoot, ...cleanOptions });

  const handleSuccess = (payload) => {
    const newAction = { type: resolved(type), payload, network: false };
    store.dispatch(newAction);
  };

  const handleError = (payload) => {
    const newAction = { type: rejected(type), payload, network: false };
    store.dispatch(newAction);
  };

  const nextAction = { ...action, network: true };
  next(nextAction);

  promise.then(handleSuccess).catch(handleError);
  return promise;
};

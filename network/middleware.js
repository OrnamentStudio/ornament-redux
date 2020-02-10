const request = require('./request');
const { resolved, rejected } = require('./types');


module.exports = (config = {}) => (store) => (next) => (action) => {
  if (!action.request) return next(action);

  const { apiRoot } = config;
  const { request: options, type, meta } = action;
  const { shouldRequest, ...cleanOptions } = options;
  const state = store.getState();

  if (shouldRequest && !shouldRequest(state)) {
    return Promise.resolve();
  }

  const { promise } = request({ apiRoot, token: state.token, ...cleanOptions });

  const handleSuccess = (payload) => {
    const newAction = {
      meta,
      payload,
      type: resolved(type),
      network: false,
    };

    store.dispatch(newAction);
  };

  const handleError = (payload) => {
    const newAction = {
      meta,
      payload,
      type: rejected(type),
      network: false,
    };

    store.dispatch(newAction);
  };

  const nextAction = { ...action, network: true };
  next(nextAction);

  promise.then(handleSuccess).catch(handleError);
  return promise;
};

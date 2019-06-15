const request = require('./request');
const { resolved, rejected } = require('./types');


module.exports = store => next => (action) => {
  if (!action.request) return next(action);

  const { request: options, type } = action;
  const { shouldRequest, ...cleanOptions } = options;

  if (shouldRequest && !shouldRequest(store.getState())) {
    return Promise.resolve();
  }

  const { promise } = request(cleanOptions);

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

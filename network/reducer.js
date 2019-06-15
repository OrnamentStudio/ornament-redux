const getDefaultState = () => ({
  requestsCount: 0,
});

module.exports = (state = getDefaultState(), action) => {
  if (action.network == null) return state;

  const count = action.network ? state.requestsCount + 1 : state.requestsCount - 1;
  return { requestsCount: Math.max(0, count) };
};

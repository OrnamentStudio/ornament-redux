const superagent = require('superagent');


const INTERNAL_LINK = /^\//;

const defaultOptions = {
  url: null,
  type: 'get',
  token: null,
  payload: null,
  query: null,
  multipart: false,
  customize: null,
};

module.exports = (options) => {
  const {
    url,
    type,
    token,
    payload,
    query,
    multipart,
    customize,
    apiRoot,
  } = { ...defaultOptions, ...options };

  const newUrl = INTERNAL_LINK.test(url) ? `${apiRoot}${url}` : url;
  const request = superagent(type, newUrl);

  request.set('Accept', 'application/json');

  if (token) {
    request.set('X-Access-Token', token);
  }

  if ((type === 'put' || type === 'post') && !multipart) {
    request.set('Content-Type', 'application/json');
  }

  if (query) request.query(query);
  if (payload) request.send(payload);
  if (customize) customize(request);

  const promise = new Promise((resolve, reject) => (
    request.end((err, response) => {
      const body = (response && response.body) || {};

      if (err) {
        body.statusCode = parseInt(response && response.status, 10) || 500;
        reject(body);
      } else {
        resolve(body);
      }
    })
  ));

  return { request, promise };
};

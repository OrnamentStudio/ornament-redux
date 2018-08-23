import superagent from 'superagent';


const INTERNAL_LINK = /^\//;
let apiRoot;

const defaultOptions = {
  url: null,
  type: 'get',
  token: null,
  payload: null,
  query: null,
  multipart: false,
  customize: null,
};

export const configure = (options) => {
  apiRoot = options.api_root;
};

export default (options) => {
  const {
    url,
    type,
    token,
    payload,
    query,
    multipart,
    customize,
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
        const statusCode = parseInt(response && response.status, 10) || 500;
        reject(body, statusCode);
      } else {
        resolve(body);
      }
    })
  ));

  return { request, promise };
};

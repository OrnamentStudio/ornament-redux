# Redux modules [![Build Status](https://travis-ci.org/OrnamentStudio/ornament-redux.svg?branch=master)](https://travis-ci.org/OrnamentStudio/ornament-redux)

Redux utils

## Install

```
npm install ornament-redux
```

This module targets Node.js 8 or later and the latest version of Chrome, Firefox, and Safari. If you want support for older browsers use [Babel compiler](https://babeljs.io/).

## Usage
```js
// Network
const { middleware, reducer, types, request } = require('ornament-redux/network');

createStore(reducer, {}, applyMiddleware(middleware))
request({ url: '/api/resource' });
```

## License

MIT © Abylay Keldibek

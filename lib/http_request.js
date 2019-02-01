'use strict';
let axios = require('axios');
const constants = require('./constants');
const querystring = require('querystring')

const requestUrl = 'http://2captcha.com/in.php?';
const responseUrl = 'http://2captcha.com/res.php?';

// Uncomment this to track requests
// axios.interceptors.request.use(request => {
//   console.log('Starting Request', request)
//   return request
// });
//
// axios.interceptors.response.use(response => {
//   console.log('Response:', response)
//   return response
// });

class HTTPRequest {
  static async openDataURL(url) {
    if (typeof(url) !== 'string') throw new Error('You must inform a string URL');

    let res = await axios.get(url, {
      responseType: 'arraybuffer'
    });

    return res.data;
  }

  static async request(options = {}) {
    const url = options.url;
    const method = options.method || 'get';
    const payload = options.payload || {};
    const timeout = options.timeout || 60;
    let headers = {
      'User-Agent': constants.userAgent
    };

    let res = await (async function() {
      switch (method) {
        case 'get':
          return await axios.get(`${url}?${querystring.stringify(payload)}`, {
            headers: headers,
            timeout: timeout
          });
          break;
        case 'post':
          return await axios.post(url, querystring.stringify(payload), {
              headers: headers,
              timeout: timeout
            }
          );
          break;
        case 'multipart':
          headers['content-type'] = 'multipart/form-data';
          return await axios.post(url, querystring.stringify(payload),{
            headers: headers,
            timeout: timeout
          });
          break;
        default:
          throw new Error(`Illegal HTTP method (${method})`);
      }
    })();

    return res.data;
  }

}

module.exports = HTTPRequest;

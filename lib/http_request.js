'use strict';
const axios = require('axios');
const constants = require('constants');
const querystring = require('querystring')

const requestUrl = 'http://2captcha.com/in.php?';
const responseUrl = 'http://2captcha.com/res.php?';

class HTTPRequest {
  static async openURL(url) {
    if (typeof(url) !== 'string') throw new Error('You must inform a string URL');

    let res = await axios.get(url);

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

    switch (method) {
      case 'get':
        let res = await axios.get(
          url: `${url}?${querystring.stringify(payload)}`,
          headers: headers,
          timeout: timeout
        );
        break;
      case 'post':
        let res = await axios.post(
          url: url,
          data: payload,
          headers: headers,
          timeout: timeout
        );
        break;
      case 'multipart':
        headers['content-type'] = 'multipart/form-data';
        let res = await axios.post(
          url: url,
          data: querystring.stringify(payload),
          headers: headers,
          timeout: timeout
        );
        break;
      default:
        throw new Error(`Illegal HTTP method (${method})`);
    }

    return res.data;
  }

}

module.exports = HTTPRequest;

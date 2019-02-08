'use strict';
const axios = require('axios');
const constants = require('./constants');
const querystring = require('querystring')

/**
 * Class with static methods used in HTTP requests
 * @class
 */
class HTTPRequest {

  /**
   * Performs a GET to an URL and returns a promise to its body as a Buffer
   *
   * @param  {string} url      URL of the desired content to GET
   * @return {Promise<Buffer>} Buffer with the content of the body from the HTTP response
   */
  static async openDataURL(url) {
    if (typeof(url) !== 'string') throw new Error('You must inform a string URL');

    const res = await axios.get(url, {
      responseType: 'arraybuffer'
    });

    return res.data;
  }

  /**
   * Performs a request and returns a promise to the body as a string
   *
   * @param  {Object} options           Object with the parameters to the request
   * @param  {string} options.url       URL of the request
   * @param  {string} [options.method='get']  HTTP verb of the request
   * @param  {Object} [options.payload={}] Body content of the requisition
   * @param  {number} [options.timeout=60000] Timeout of the request in miliseconds
   * @return {Promise<string>}
   */
  static async request(options = {}) {
    const url = options.url;
    const method = options.method || 'get';
    const payload = options.payload || {};
    const timeout = options.timeout || 60000;
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
          });
          break;
        case 'multipart':
          headers['content-type'] = 'multipart/form-data';
          return await axios.post(url, querystring.stringify(payload), {
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

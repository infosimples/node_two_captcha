'use strict';
const axios = require('axios');
const fs = require('fs');

const HTTPRequest = require('./http');

const baseUrl = 'http://2captcha.com/<action>.php';

class TwoCaptchaClient {
  constructor(key, timeout = 60, polling = 5) {
    if (typeof(key) !== 'string') throw new Error('2Captcha key must be a string');

    this.key = key;
    this.timeout = timeout;
    this.polling = polling;
  }

  async decode(options = {}) {
    let startedAt = Date.now();

    let raw64 = _loadCaptcha(options);

    if (typeof(key) !== 'string') throw new Error('2Captcha key must be a string');
    //TODO _upload

  }

  async _loadCaptcha(options = {}) {
    if (options.raw64) {
      return options.raw64;
    } else if (options.raw) {
      return new Buffer.from(options.raw).toString('base64');
    } else if (options.path) {
      await fs.readFile(options.path, (err, data) => {
        return new Buffer.from(data).toString('base64');
      });
    } else if (options.url) {
      let imageReq = await HTTPRequest.openURL(url);
      return new Buffer.from(imageReq.data).toString('base64');
    } else {
      throw new Error('No image data received');
    }
  }

  async _request(action, method = 'get', payload = {}) {
    let req = await HTTPRequest.request({
      url: baseUrl.replace('<action>', action),
      timeout: this.timeout,
      method: method,
      payload: { ...payload,
        ...{
          key: this.key,
          soft_id: 2386
        }
      }
    });

    _validate_response(response.data);

    return response.data;
  }

  async _upload(options = {}) {
    let args = {};
    if (options.raw64) args.body = options.raw64;
    args.method = options.method || 'base64';

    // Merge args with any other required field
    args = { ...options,
      ...args
    };
    //TODO _request

  }

  _validate_response(body) {
    if (constants.errors[body]) {
      throw new Error(constants.errors[body]);
    } else if (body === '' || body.includes('ERROR')) {
      throw new Error(`Unknown 2Captcha error: ${body}`);
    }
  }

}

module.exports = TwoCaptchaClient;

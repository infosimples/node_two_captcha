'use strict';
const fs = require('fs');
const {
  promisify
} = require('util');

const Captcha = require('./captcha')
const constants = require('./constants');
const HTTPRequest = require('./http_request');

const baseUrl = 'http://2captcha.com/<action>.php';
const readFileAsync = promisify(fs.readFile);

class TwoCaptchaClient {
  constructor(key, timeout = 60000, polling = 5000) {
    if (typeof(key) !== 'string') throw new Error('2Captcha key must be a string');

    this.key = key;
    this.timeout = timeout;
    this.polling = polling;
  }

  async _captcha(captchaId) {
    let res = await this._request('res', 'get', {
      id: captchaId,
      action: 'get'
    });

    let decodedCaptcha = new Captcha();
    decodedCaptcha.id = captchaId;
    decodedCaptcha.apiResponse = res;

    decodedCaptcha.text = res.split('|', 2)[1];

    return decodedCaptcha;
  }

  async decode(options = {}) {
    let startedAt = Date.now();

    if (typeof(this.key) !== 'string') throw new Error('2Captcha key must be a string');

    let base64 = await this._loadCaptcha(options);

    let decodedCaptcha = await this._upload({ ...options,
      ...{
        base64: base64
      }
    });

    // Keep pooling untill the answer is ready
    while (!decodedCaptcha.text) {
      await this._sleep(this.polling);
      if (Date.now() - startedAt > this.timeout) throw new Error('Captcha timeout');
      try {
        decodedCaptcha = await this._captcha(decodedCaptcha.id);
      } catch (error) {
        if (error.message !== 'Your captcha is not solved yet.') {
          throw error;
        }
      }
    }

    return decodedCaptcha;
  }

  async _loadCaptcha(options = {}) {
    if (options.base64) {
      return options.base64;
    } else if (options.buffer) {
      return options.buffer.toString('base64');
    } else if (options.path) {
      let fileBinary = await readFileAsync(options.path);
      return new Buffer.from(fileBinary, 'binary').toString('base64');
    } else if (options.url) {
      let image = await HTTPRequest.openDataURL(options.url);
      return new Buffer.from(image, 'binary').toString('base64');
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

    this._validate_response(req);

    return req;
  }

  async _sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    });
  }

  async _upload(options = {}) {
    let args = {};
    if (options.base64) args.body = options.base64;
    args.method = options.method || 'base64';

    // Merge args with any other required field
    args = { ...options,
      ...args
    };

    // Erase unecessary fields
    delete args.base64;
    delete args.buffer;
    delete args.path;
    delete args.url;

    let res = await this._request('in', 'post', args);

    if (res.match(/^OK/) == null) {
      throw new Error('Unexpected 2Captcha API Response');
    }

    let decodedCaptcha = new Captcha();
    decodedCaptcha.id = res.split('|', 2)[1];

    return decodedCaptcha;
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

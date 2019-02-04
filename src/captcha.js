'use strict';

/**
 * Represents a captcha
 * @class
 */
class Captcha {

  /**
   * Captcha ID, as provided from 2Captcha
   *
   * @return {string} Captcha ID
   */
  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  /**
   * Text from captcha
   *
   * @return {string} Captcha text
   */
  get text() {
    return this._text;
  }

  set text(newText) {
    this._text = newText;
  }

  /**
   * API response for captcha request
   *
   * @return {string} API response
   */
  get apiResponse() {
    return this._apiResponse;
  }

  set apiResponse(newApiResponse) {
    this._apiResponse = newApiResponse;
  }

  /**
   * If the captcha sent was tile-like, this function returns the indexes of the
   * clicks on an array.
   *
   * @return {Number[]}  An array of indexes clicked
   */
  indexes() {
    return this._text.replace('click:', '').match(/\d+/g).map(Number);
  }

  /**
   * If the captcha sent was a image, this function returns the coordinates
   * (X, Y) clicked
   *
   * @return {Number[][]}  An array of coordinate tuples
   */
  coordinates() {
    const coordinateParser = function(text) {
      const match = text.match(/x=([0-9]+),y=([0-9]+)/);
      return [Number(match[1]), Number(match[2])];
    }

    return this._text.match(/x=([0-9]+),y=([0-9]+)/g).map(coordinateParser);
  }

}

module.exports = Captcha;

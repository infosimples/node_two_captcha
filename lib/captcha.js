'use strict';

class Captcha {
  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  get text() {
    return this._text;
  }

  set text(newText) {
    this._text = newText;
  }

  get apiResponse() {
    return this._apiResponse;
  }

  set apiResponse(newApiResponse) {
    this._apiResponse = newApiResponse;
  }

  indexes() {
    return this._text.replace('click:', '').match(/\d+/g).map(Number);
  }

  coordinates() {
    const coordinateParser = function(text) {
      const match = text.match(/x=([0-9]+),y=([0-9]+)/);
      return [Number(match[1]), Number(match[2])];
    }

    return this._text.match(/x=([0-9]+),y=([0-9]+)/g).map(coordinateParser);
  }

}

module.exports = Captcha;

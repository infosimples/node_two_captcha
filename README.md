# Node TwoCaptcha

[![npm version](https://badge.fury.io/js/%40infosimples%2Fnode_two_captcha.svg)](https://badge.fury.io/js/%40infosimples%2Fnode_two_captcha)
![](https://img.shields.io/github/license/infosimples/node_two_captcha.svg?style=flat)
[![Maintainability](https://api.codeclimate.com/v1/badges/78356b38afac3763f1fe/maintainability)](https://codeclimate.com/github/infosimples/node_two_captcha/maintainability)

Node TwoCaptcha is a Javascript package for 2Captcha -
[2Captcha.com](http://2captcha.com/?from=1025109).

## Installation

Just run:

```bash
npm install @infosimples/node_two_captcha
```

JSDoc documentation can be found at https://infosimples.github.io/node_two_captcha/

## Usage

### 1. Create a client

```javascript
// Import module
const Client = require('@infosimples/node_two_captcha');

// Declare your client
client = new Client('your_2captcha_key', {
                    timeout: 60000,
                    polling: 5000,
                    throwErrors: false});
```

The first parameter of the `TwoCaptchaClient` constructor is your API key from
2Captcha. The other parameters are:

- `timeout`: Time (milliseconds) to wait before giving up on waiting for a
    captcha solution.
- `polling`: Time (milliseconds) between polls to 2captcha server. 2Captcha
    documentation suggests this time to be at least 5 seconds, or you might get
    blocked.
- `throwErrors`: Whether the client should throw errors or just log the errors.

### 2. Solve a CAPTCHA

#### Image CAPTCHA

```javascript
client.decode({
  url: 'http://bit.ly/1xXZcKo'
}).then(function(response) {
  console.log(response.text);
});

> infosimples
```

`decode` is an async function. Valid parameters for `decode` function are:

- `base64`: An already base64-coded image.
- `buffer`: A buffer object of a binary image.
- `path`: The path for a system-stored image.
- `url`: Url for a web-located image.

The returned value will be a `Captcha` object. Its properties are:

- `apiResponse`: Complete API response body for captcha request.
- `id`: Captcha ID, as provided from 2Captcha.
- `text`: Text from captcha.
- `coordinates()`: If the captcha sent was a image, this function returns the
    coordinates (X, Y) clicked.
- `indexes()`: If the captcha sent was tile-like, this function returns the
    indexes of the clicks on an array.

#### reCAPTCHA v2

```javascript
client.decodeRecaptchaV2({
  googlekey: 'the_key_extracted_from_the_page',
  pageurl: 'https://www.google.com/recaptcha/api2/demo'
}).then(function(response) {
  console.log(response.text);
});

> jTfh3o9uqafa-u5RtYofHHo2uDk0T78f78HvttFGYft8pG3wuhd-UHAIy271bQXPeUNRm...
```

`decodeRecaptchaV2` is an async function. The parameters for `decodeRecaptchaV2`
function are:

- `googlekey`: The Google key for the reCAPTCHA.
- `pageurl`: The URL of the page with the reCAPTCHA challenge.
- `invisible`: optional (Boolean) switch for invisible reCAPTCHA, default is `false`
- `enterprise`: optional (Boolean) switch for reCAPTCHA Enterprise, default is `false`

#### reCAPTCHA v3

```javascript
client.decodeRecaptchaV3({
  googlekey: 'the_key_extracted_from_the_page',
  pageurl: 'https://www.site.with.recaptcha.v3/example',
  action: 'test'
}).then(function(response) {
  console.log(response.text);
});

> jTfh3o9uqafa-u5RtYofHHo2uDk0T78f78HvttFGYft8pG3wuhd-UHAIy271bQXPeUNRm...
```

`decodeRecaptchaV3` is an async function. The parameters for `decodeRecaptchaV3`
function are:

- `googlekey`: The Google key for the reCAPTCHA.
- `pageurl`: The URL of the page with the reCAPTCHA challenge.
- `action`: the action name used by the CAPTCHA.
- `enterprise`: optional (Boolean) switch for reCAPTCHA Enterprise, default is `false`

#### hCaptcha

```javascript
client.decodeHCaptcha({
  sitekey: 'the_key_extracted_from_the_page',
  pageurl: 'https://www.site.with.hcaptcha/example',
}).then(function(response) {
  console.log(response.text);
});

> P0_eyJ0eXAiIoJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNza2V5IjoiczHiam4vKzZnb...
```

`decodeHCaptcha` is an async function. The parameters for `decodeHCaptcha`
function are:

- `sitekey`: The site key for the hCaptcha.
- `pageurl`: The URL of the page with the hCaptcha challenge.
- `invisible`: optional (Boolean) switch for invisible hCaptcha, default
    is `false`.

### 3. Retrieve a previously solved captcha

```javascript
// 61086191138 is the ID of a previously sent CAPTCHA
client.captcha('61086191138').then(function(response){
  console.log(response);
});

> Captcha {
   _id: '61086191138',
   _apiResponse: 'OK|infosimples',
   _text: 'infosimples' }
```

### 4. Report an incorrectly solved CATPCHA for a refund

```javascript
client.report('61086191138').then(function(response) {
  console.log(response);
});

// Returns whether the report was received or not
> true
```

Or send a correct report by setting `bad` parameter to false. Default is `true`.

```javascript
client.report('61086191138', false);
```

> **Warning:** *abusing on this method may get you banned.*

### 5. Get usage statistics for a specific date

```javascript
let date = new Date('2019-02-04');
client.stats(date).then(function(response) {
  console.log(response);
});

// Returns an XML string with your usage statistics
> <?xml version="1.0"?><response><stats dateint="1549227600" date="2019-02-04" hour="00"><volume>0</volume><money>0</money></stats><stats dateint="1549231200" date="2019-02-04" hour="01"><volume>0</volume><money>0</money></stats>...
```

### 6. Get your 2Captcha account balance

```javascript
client.balance().then(function(response) {
  console.log(response);
});

// Returns a float with your account balance in USD
> 3.75371
```

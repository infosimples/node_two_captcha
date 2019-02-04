# Node TwoCaptcha

Node TwoCaptcha is a Javascript package for 2Captcha -
[2Captcha.com](http://2captcha.com/?from=1025109).

## Installation

Just run:
```bash
npm install node_two_captcha
```

## Usage

### 1. Create a client

```javascript
// Import module
const Client = require('node_two_captcha');

// Declare your client
client = new Client('your_2captcha_key', {
                    timeout: 60000,
                    polling: 5000,
                    throwErrors: false});
```

The first parameter of the `TwoCaptchaClient` constructor is your API key from
2Captcha. The other parameters are:

-   `timeout`: Time (milliseconds) to wait before giving up on waiting for a
    captcha solution.
-   `polling`: Time (milliseconds) between polls to 2captcha server. 2Captcha
    documentation suggest this time to be at least 5 seconds, or you might get
    blocked.
-   `throwErrors`: Whether the client should throw errors or just log the errors.

### 2. Solve a captcha

```javascript
client.decode({
  url: 'http://bit.ly/1xXZcKo'
}).then(function(response) {
  console.log(response.text);
});

> infosimples
```

`decode` is an async function. Valid parameters for `decode` function are:

-   `base64`: An already base64-coded image.
-   `buffer`: A buffer object of a binary image.
-   `path`: The path for a system-stored image.
-   `url`: Url for a web-located image.

The returned value will be a `Captcha` object. Its properties are:

-   `apiResponse`: Complete API response body for captcha request.
-   `id`: Captcha ID, as provided from 2Captcha.
-   `text`: Text from captcha.
-   `coordinates()`: If the captcha sent was a image, this function returns the
    coordinates (X, Y) clicked.
-   `indexes()`: If the captcha sent was tile-like, this function returns the
    indexes of the clicks on an array.

### 3. Retrieve a previously solved captcha

```javascript
// 61086191138 is the ID of a previously sent Captcha
let captcha;
client.captcha('61086191138').then(function(response){
  console.log(response);
});

> Captcha {
   _id: '61086191138',
   _apiResponse: 'OK|infosimples',
   _text: 'infosimples' }
```

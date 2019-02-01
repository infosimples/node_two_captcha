'use strict';

module.exports = Object.freeze({
  userAgent: `NodeTwoCaptcha - JavaScript/Node.js package v${require('../package.json').version}`,

  errors: {
    'CAPCHA_NOT_READY': "Your captcha is not solved yet.",
    'ERROR_BAD_DUPLICATES': "Error is returned when 100% accuracy feature is enabled. The error means that max numbers of tries is reached but min number of matches not found.",
    'ERROR_BAD_TOKEN_OR_PAGEURL': "You can get this error code when sending ReCaptcha V2. That happens if your request contains invalid pair of googlekey and pageurl.",
    'ERROR_CAPTCHA_UNSOLVABLE': "We are unable to solve your captcha - three of our workers were unable solve it or we didn't get an answer within 90 seconds (300 seconds for ReCaptcha V2). We will not charge you for this request.",
    'ERROR_CAPTCHAIMAGE_BLOCKED': "You've sent an image that is marked in our database as unrecognizable.",
    'ERROR_GOOGLEKEY': "You can get this error code when sending ReCaptcha V2. That means that sitekey value provided in your request is incorrect: it's blank or malformed.",
    'ERROR_IMAGE_TYPE_NOT_SUPPORTED': "Server can't recognize image file type.",
    'ERROR_IP_ADDRES': "Your request is coming from an IP address that doesn't match the IP address of your pingback IP or domain.",
    'ERROR_IP_NOT_ALLOWED': "The request is sent from the IP that is not on the list of your allowed IPs.",
    'ERROR_KEY_DOES_NOT_EXIST': "The key you've provided does not exists.",
    'ERROR_NO_SLOT_AVAILABLE': "Your maximum rate for normal captchas is lower than current rate on the server.",
    'ERROR_PAGEURL': "pageurl parameter is missing in your request.",
    'ERROR_TOO_BIG_CAPTCHA_FILESIZE': "Image size is more than 100 kB.",
    'ERROR_UPLOAD': "Server can't get file data from your POST-request. This happens if your POST-request is malformed or base64 data is not a valid base64 image.",
    'ERROR_WRONG_CAPTCHA_ID': "You've provided incorrect captcha ID.",
    'ERROR_WRONG_FILE_EXTENSION': "Image file has unsupported extension. Accepted extensions: jpg, jpeg, gif, png.",
    'ERROR_WRONG_ID_FORMAT': "You've provided captcha ID in wrong format. The ID can contain numbers only.",
    'ERROR_WRONG_USER_KEY': "You've provided key parameter value in incorrect format, it should contain 32 symbols.",
    'ERROR_ZERO_BALANCE': "You don't have funds on your account.",
    'ERROR_ZERO_CAPTCHA_FILESIZE': "Image size is less than 100 bytes.",
    'ERROR: 1001': "You received 120 ERROR_NO_SLOT_AVAILABLE errors in one minute because your current bid is lower than current bid on the server. Your are blocked for 10 minutes.",
    'ERROR: 1002': "You received 120 ERROR_ZERO_BALANCE errors in one minute because your balance is out. Your are blocked for 5 minutes.",
    'ERROR: 1003': "You are getting ERROR_NO_SLOT_AVAILABLE because you are uploading many captchas and server has a long queue of your captchas that are not distributed to workers. You are blocked for 30 seconds.",
    'ERROR: 1004': "Your IP address is blocked because there were 5 requests with incorrect API key from your IP. Your are blocked for 10 minutes.",
    'ERROR: 1005': "You are making too many requests to res.php to get answers. Your are blocked for 5 minutes.",
    'IP_BANNED': "Your IP address is banned due to many frequent attempts to access the server using wrong authorization keys.",
    'MAX_USER_TURN': "You made more than 60 requests to in.php within 3 seconds. Your account is banned for 10 seconds. Ban will be lifted automatically.",
    'REPORT_NOT_RECORDED': "Error is returned to your complain request if you already complained lots of correctly solved captchas."
  }
});

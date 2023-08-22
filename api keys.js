const crypto = require('crypto');

{
  const apikey = crypto.randomBytes(32).toString('hex');
  console.log('32 byte hex:');
  console.log(apikey);
}

{
  const apikey = crypto.randomBytes(32).toString('base64');
  console.log('32 byte base64:');
  console.log(apikey);
}

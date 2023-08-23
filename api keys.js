const crypto = require('crypto');
const { promisify } = require('util');

{
  // 32 byte encryption key, encode it as hex (в шестнадцатеричном формате)
  const apikey = crypto.randomBytes(32).toString('hex');
  console.log('32 byte (256 бит) hex:');
  console.log(apikey);
}

{
  // 32 byte encryption key, encode it as base64
  const apikey = crypto.randomBytes(32).toString('base64');
  console.log('32 byte (256 бит) base64:');
  console.log(apikey);
}

{
  const password = 'my-secret-password';
  const salt = crypto.randomBytes(16);

  const bufer = crypto.scryptSync(password, salt, 32);

  console.log('32 байт (256 бит) hex:');
  let apikey = bufer.toString('hex');
  console.log(apikey);

  console.log('32 байт (256 бит) base64:');
  apikey = bufer.toString('base64');
  console.log(apikey);
}

{
  const scryptPromise = promisify(crypto.scrypt);

  async function generateKey() {
    const password = 'your_password';
    const salt = crypto.randomBytes(16); // генерация случайной соли
    const keyLength = 32; // длинна байта

    const bufer = await scryptPromise(password, salt, keyLength);

    console.log('promisify 32 байт (256 бит) hex:');
    let apikey = bufer.toString('hex');
    console.log(apikey);

    console.log('promisify 32 байт (256 бит) base64:');
    apikey = bufer.toString('base64');
    console.log(apikey);
  }

  generateKey();
}

/*
Обычно длины ключей измеряются в битах. Вот несколько стандартных длин ключей, которые используются в криптографии:
128 бит (16 байт) - Хорошо подходит для некриптографических целей, например, для генерации случайных идентификаторов.
256 бит (32 байта) - Рекомендуется для большинства задач криптографии, таких как симметричное шифрование, аутентификация и т.д.
*/

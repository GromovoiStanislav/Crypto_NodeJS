const crypto = require('crypto');

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

  const apikey = crypto.scryptSync(password, salt, 32).toString('hex');
  console.log('32 байт (256 бит) hex:');
  console.log(apikey);
}

{
  const password = 'my-secret-password';
  const salt = crypto.randomBytes(16);

  const apikey = crypto.scryptSync(password, salt, 32).toString('base64');
  console.log('32 байт (256 бит) base64:');
  console.log(apikey);
}

/*
Обычно длины ключей измеряются в битах. Вот несколько стандартных длин ключей, которые используются в криптографии:
128 бит (16 байт) - Хорошо подходит для некриптографических целей, например, для генерации случайных идентификаторов.
256 бит (32 байта) - Рекомендуется для большинства задач криптографии, таких как симметричное шифрование, аутентификация и т.д.
*/

// Генерируем ключи для RSA
crypto.generateKeyPair(
  'rsa',
  {
    modulusLength: 2048, // Длина ключа в битах
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  },
  (err, publicKey, privateKey) => {
    if (err) throw err;

    console.log('Публичный ключ (RSA):', publicKey);
    console.log('Приватный ключ (RSA):', privateKey);
  }
);

// Генерируем ключи для ECDSA с кривой P-256
const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'P-256', // Выбираем кривую P-256
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

console.log('Публичный ключ (ECDSA):', publicKey);
console.log('Приватный ключ (ECDSA):', privateKey);

/*
В Node.js, модуль crypto поддерживает различные кривые для алгоритма ECDSA (Elliptic Curve Digital Signature Algorithm). Вот некоторые из поддерживаемых кривых:

secp256k1: Это кривая, которая широко используется, например, в криптовалюте Bitcoin.

P-256: Также известная как prime256v1 или secp256r1, эта кривая широко используется в различных приложениях.

P-384: Кривая с более высоким уровнем безопасности, поддерживается в ECDSA и ECDH.

P-521: Еще более высокоуровневая кривая, поддерживается в ECDSA и ECDH.

secp256r1: Также известная как P-256 или prime256v1, это еще одна общеизвестная кривая.

secp384r1: Эквивалент P-384.

secp521r1: Эквивалент P-521.
*/

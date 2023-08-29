const crypto = require('crypto');

{
  // Генерируем ключи для RSA
  crypto.generateKeyPair(
    'rsa',
    {
      modulusLength: 2048, // Длина ключа в битах
      publicKeyEncoding: {
        type: 'spki',
        format: 'der', // Формат открытого  ключа
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'der', // Формат закрытого ключа
      },
    },
    (err, publicKey, privateKey) => {
      if (err) throw err;

      console.log('Публичный ключ (RSA):', publicKey.toString('base64'));
      console.log('Приватный ключ (RSA):', privateKey.toString('base64'));
    }
  );
}

/*
  Помимо формата 'pem', который представляет собой стандартный формат для хранения и представления ключей и сертификатов в виде текстовых строк, существуют и другие форматы для представления ключей. Вот некоторые из них:

'der' (Distinguished Encoding Rules): Это бинарный формат, который использует DER для кодирования данных. DER является более компактным представлением ключей и сертификатов в сравнении с PEM.


 Формат 'pem' часто используется для удобства чтения и обмена ключами в текстовом виде, в то время как 'der' часто используются для хранения ключей в бинарном виде или в более структурированном формате.
  */

{
  // Генерация пары ключей RSA
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Длина ключа в битах
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  console.log('Публичный ключ (RSA):', publicKey);
  console.log('Приватный ключ (RSA):', privateKey);
}

{
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
}

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

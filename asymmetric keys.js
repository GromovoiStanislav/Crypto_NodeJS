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

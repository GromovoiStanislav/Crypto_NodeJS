import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

{
  // Генерация ключевой пары RSA
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // длина модуля (размер ключа)
    privateKeyEncoding: {
      type: 'pkcs8', // формат закрытого ключа
      format: 'pem', // формат файла (Base64 PEM)
    },
    publicKeyEncoding: {
      type: 'spki', // формат открытого ключа
      format: 'pem', // формат файла (Base64 PEM)
    },
  });

  function signJwt(payload) {
    return jwt.sign(payload, privateKey, { algorithm: 'RS256' }); // 'RS256', 'RS384', 'RS512'
  }

  function decode(token) {
    if (!token) return null;
    try {
      const decoded = jwt.verify(token, publicKey);

      return decoded;
    } catch (error) {
      console.error(`error`, error);
      return null;
    }
  }

  ////////////////////////////////

  const token = signJwt({ id: 10, name: 'tomas' });
  console.log(token);

  const payload = decode(token);
  console.log(payload);
}

{
  // Генерация ключевой пары ECDSA
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'P-256', // используемая эллиптическая кривая 'P-256' 'P-384' 'P-512' соответственно
    privateKeyEncoding: {
      type: 'pkcs8', // формат закрытого ключа
      format: 'pem', // формат файла (Base64 PEM)
    },
    publicKeyEncoding: {
      type: 'spki', // формат открытого ключа
      format: 'pem', // формат файла (Base64 PEM)
    },
  });

  function signJwt(payload) {
    return jwt.sign(payload, privateKey, { algorithm: 'ES256' }); // 'ES256', 'ES384', 'ES512' соответственно
  }

  function decode(token) {
    if (!token) return null;
    try {
      const decoded = jwt.verify(token, publicKey);

      return decoded;
    } catch (error) {
      console.error(`error`, error);
      return null;
    }
  }

  ////////////////////////////////

  const token = signJwt({ id: 10, name: 'tomas' });
  console.log(token);

  const payload = decode(token);
  console.log(payload);
}

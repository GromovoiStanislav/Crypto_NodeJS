// асимметричное шифрование
const crypto = require('crypto');
const fs = require('fs');

// Генерация пары ключей
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // Длина ключа в битах
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

// // Сохранение ключей в файлы
// fs.writeFileSync('private_key.pem', privateKey);
// fs.writeFileSync('public_key.pem', publicKey);

////////////////////////////////////////////////////////////

const message = 'Секретное сообщение';

{
  // Шифрование сообщения с использованием публичного ключа
  // const publicKey = fs.readFileSync('public_key.pem', 'utf8');
  const encryptedBuffer = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(message, 'utf8')
  );

  const encryptedMessage = encryptedBuffer.toString('base64');

  console.log('Зашифрованное сообщение в base64:', encryptedMessage);

  //////////////////////////////////////////////////////////////////////

  // Расшифровка сообщения с использованием приватного ключа
  // const privateKey = fs.readFileSync('private_key.pem', 'utf8');
  const decryptedBuffer = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedMessage, 'base64')
  );

  const decryptedMessage = decryptedBuffer.toString('utf8');

  console.log('Расшифрованное сообщение:', decryptedMessage);
}

///////////////////////////////

{
  // Шифрование сообщения с использованием публичного ключа
  // const publicKey = fs.readFileSync('public_key.pem', 'utf8');
  const encryptedBuffer = crypto.publicEncrypt(
    publicKey,
    Buffer.from(message, 'utf8')
  );

  const encryptedMessage = encryptedBuffer.toString('base64');

  console.log('Зашифрованное сообщение в base64:', encryptedMessage);

  //////////////////////////////////////////////////////////////////////

  // Расшифровка сообщения с использованием приватного ключа
  // const privateKey = fs.readFileSync('private_key.pem', 'utf8');
  const decryptedBuffer = crypto.privateDecrypt(
    privateKey,
    Buffer.from(encryptedMessage, 'base64')
  );

  const decryptedMessage = decryptedBuffer.toString('utf8');

  console.log('Расшифрованное сообщение:', decryptedMessage);
}

///////////////////////////////////////

{
  // Шифрование сообщения с использованием приватного ключа
  // const privateKey = fs.readFileSync('private_key.pem', 'utf8');
  const encryptedBuffer = crypto.privateEncrypt(
    privateKey,
    Buffer.from(message, 'utf8')
  );

  const encryptedMessage = encryptedBuffer.toString('base64');

  console.log('Зашифрованное сообщение в base64:', encryptedMessage);

  //////////////////////////////////////////////////////////////////////

  // Расшифровка сообщения с использованием публичного ключа

  // const publicKey = fs.readFileSync('public_key.pem', 'utf8');
  const decryptedBuffer = crypto.publicDecrypt(
    publicKey,
    Buffer.from(encryptedMessage, 'base64')
  );

  const decryptedMessage = decryptedBuffer.toString('utf8');

  console.log('Расшифрованное сообщение:', decryptedMessage);
}

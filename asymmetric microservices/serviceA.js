const crypto = require('crypto');
const fs = require('fs');

const createKeys = () => {
  // Генерация пары ключей для микросервиса A
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  //Сохранение открытого ключа микросервиса A
  fs.writeFileSync('serviceA_public.pem', publicKey);
  //Сохранение закрытого ключа микросервиса A
  fs.writeFileSync('serviceA_private.pem', privateKey);
};

const sendMessage = () => {
  // Загрузка открытого ключа микросервиса B
  const publicKeyB = fs.readFileSync('serviceB_public.pem', 'utf-8');

  // Шифрование сообщения с открытым ключом микросервиса B
  const message = 'Привет, микросервис B!';
  const encryptedMessage = crypto.publicEncrypt(
    publicKeyB,
    Buffer.from(message)
  );

  // console.log('Зашифрованное сообщение для микросервиса B:');
  // console.log(encryptedMessage.toString('base64'));

  //fs.writeFileSync('messageA', encryptedMessage);
  fs.writeFileSync('messageA', encryptedMessage.toString('base64'));
};

const readeMessage = () => {
  //const encryptedMessageBase64 = fs.readFileSync('messageB', 'utf-8');
  const encryptedMessage = fs.readFileSync('messageB');

  // Дешифрование сообщения от микросервиса B
  const privateKeyA = fs.readFileSync('serviceA_private.pem', 'utf-8');
  //const encryptedMessage = Buffer.from(encryptedMessageBase64, 'base64');
  const decryptedMessage = crypto.privateDecrypt(privateKeyA, encryptedMessage);

  console.log('Дешифрованное сообщение от микросервиса B:');
  console.log(decryptedMessage.toString());
};

// createKeys();
// sendMessage();
readeMessage();

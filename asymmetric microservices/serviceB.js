const crypto = require('crypto');
const fs = require('fs');

const createKeys = () => {
  // Генерация пары ключей для микросервиса B
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  // Сохранение открытого ключа микросервиса B
  fs.writeFileSync(
    'serviceB_public.pem',
    publicKey.export({ type: 'spki', format: 'pem' })
  );

  // Сохранение закрытого ключа микросервиса B
  fs.writeFileSync(
    'serviceB_private.pem',
    privateKey.export({ type: 'pkcs8', format: 'pem' })
  );
};

const sendMessage = () => {
  // Загрузка открытого ключа микросервиса A
  const publicKeyA = fs.readFileSync('serviceA_public.pem', 'utf-8');

  // Шифрование сообщения с открытым ключом микросервиса A
  const message = 'Привет, микросервис A!';
  const encryptedMessage = crypto.publicEncrypt(
    publicKeyA,
    Buffer.from(message)
  );

  //   console.log('Зашифрованное сообщение для микросервиса A:');
  //   console.log(encryptedMessage.toString('base64'));
  //   console.log(encryptedMessage);

  fs.writeFileSync('messageB', encryptedMessage);
  //fs.writeFileSync('messageB', encryptedMessage.toString('base64'));
};

const readeMessage = () => {
  const encryptedMessageBase64 = fs.readFileSync('messageA', 'utf-8');

  // Дешифрование сообщения от микросервиса A
  const privateKeyB = fs.readFileSync('serviceB_private.pem', 'utf-8');
  const encryptedMessage = Buffer.from(encryptedMessageBase64, 'base64');
  const decryptedMessage = crypto.privateDecrypt(privateKeyB, encryptedMessage);

  console.log('Дешифрованное сообщение от микросервиса A:');
  console.log(decryptedMessage.toString());
};

//createKeys();
sendMessage();
//readeMessage();

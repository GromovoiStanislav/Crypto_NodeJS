// цифровая подпись (digital signature)
const fs = require('fs');
const crypto = require('crypto');

// Генерация пары ключей
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

// // Сохранение ключей в файлы
// fs.writeFileSync('private_key.pem', privateKey);
// fs.writeFileSync('public_key.pem', publicKey);

////////////////////////////////////////////////////////////////

// Сообщение для подписи
const message = 'Секретное сообщение';

// Создание подписи с использованием приватного ключа
const sign = crypto.createSign('RSA-SHA256');
sign.update(message);
const signature = sign.sign(privateKey, 'base64');

console.log('Подпись:', signature);

//////////////////////////////////////////////////////////////////////

// Загрузка публичного ключа получателя
//const publicKey = fs.readFileSync('public_key.pem', 'utf8');

// Полученное сообщение и подпись
const receivedMessage = 'Секретное сообщение';
const receivedSignature = signature;

// Создание объекта для верификации подписи с использованием публичного ключа
const verify = crypto.createVerify('RSA-SHA256');
verify.update(receivedMessage);

// Проверка подписи
const isVerified = verify.verify(publicKey, receivedSignature, 'base64');

if (isVerified) {
  console.log('Подпись верна. Сообщение подлинное.');
} else {
  console.log('Подпись не верна. Сообщение может быть изменено.');
}

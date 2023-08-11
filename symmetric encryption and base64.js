// симметричное шифрование
const crypto = require('crypto');

const message = 'Секретное сообщение';

// Генерируем ключ и инициализируем шифр
let algorithm = 'aes-256-ctr';
let key = crypto.randomBytes(32);
let iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);

// Шифруем сообщение
let encrypted = cipher.update(message, 'utf8', 'base64'); //binary // base64 //hex
encrypted += cipher.final('base64'); //binary //base64 //hex

// Передаём ключ, iv и зашифрованное сообщение на сервер
const encryptedData = {
  key: key.toString('hex'),
  iv: iv.toString('hex'),
  message: encrypted,
};

/*
обратите внимание, что в реальных приложениях необходимо обеспечивать 
безопасную передачу ключа и iv между клиентом и сервером
*/

console.log('Зашифрованное сообщение:', encryptedData);

// Преобразование каждого поля к base64
const base64EncryptedData = {
  key: Buffer.from(encryptedData.key, 'hex').toString('base64'),
  iv: Buffer.from(encryptedData.iv, 'hex').toString('base64'),
  message: encryptedData.message.toString('base64'),
};

// Преобразование объекта encryptedData к формату JSON
const jsonBase64EncryptedData = JSON.stringify(base64EncryptedData);

console.log(
  'Зашифрованное сообщение (в base64 и JSON):',
  jsonBase64EncryptedData
);

//////////////////////////////////////////////////////////////////////

const receivedJsonBase64EncryptedData = jsonBase64EncryptedData;
const receivedBase64EncryptedData = JSON.parse(receivedJsonBase64EncryptedData);

const receivedKey = Buffer.from(
  receivedBase64EncryptedData.key,
  'base64'
).toString('hex');
const receivedIv = Buffer.from(
  receivedBase64EncryptedData.iv,
  'base64'
).toString('hex');
const receivedMessage = Buffer.from(
  receivedBase64EncryptedData.message,
  'base64'
);

// Создаём шифр с использованием ключа и iv
algorithm = 'aes-256-ctr';
key = Buffer.from(receivedKey, 'hex');
iv = Buffer.from(receivedIv, 'hex');
const decipher = crypto.createDecipheriv(algorithm, key, iv);

// Расшифровываем сообщение
let decrypted = decipher.update(receivedMessage, 'base64', 'utf8'); //binary // base64 //hex
decrypted += decipher.final('utf8');

console.log('Расшифрованное сообщение:', decrypted);

// симметричное шифрование
const crypto = require('crypto');

const message = 'Секретное сообщение';

// Генерируем ключ и инициализируем шифр
let algorithm = 'aes-256-ctr';
let key = crypto.randomBytes(32);
let iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);

// Шифруем сообщение
let encrypted = cipher.update(message, 'utf8', 'hex'); //binary // base64 //hex
encrypted += cipher.final('hex'); //binary // base64 //hex

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

//////////////////////////////////////////////////////////////////////

// Создаём шифр с использованием ключа и iv
algorithm = 'aes-256-ctr';
key = Buffer.from(encryptedData.key, 'hex');
iv = Buffer.from(encryptedData.iv, 'hex');
const decipher = crypto.createDecipheriv(algorithm, key, iv);

// Расшифровываем сообщение
let decrypted = decipher.update(encryptedData.message, 'hex', 'utf8'); //binary // base64 //hex
decrypted += decipher.final('utf8');

console.log('Расшифрованное сообщение:', decrypted);

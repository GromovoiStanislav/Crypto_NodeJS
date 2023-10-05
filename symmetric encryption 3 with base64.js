// симметричное шифрование
const crypto = require('crypto');

// Ваш ключ в виде текстовой строки
const keyText = crypto.randomBytes(24).toString('base64');
console.log('Secret Key:', keyText);

// Преобразуем ключ в бинарное представление
const key = Buffer.from(keyText, 'base64');

// Генерируем IV (128 бит)
const iv = crypto.randomBytes(16);

// Текст, который мы хотим зашифровать
const plaintext = 'Пример текста для шифрования с использованием AES';

// Создаем объект шифрования
const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);

// Обновляем объект шифрования с нашим текстом
let encrypted = cipher.update(plaintext, 'utf-8', 'base64');

// Завершаем шифрование
encrypted += cipher.final('base64');

console.log('Зашифрованный текст (Base64):', encrypted);

//////////////////////////////////////////

// Дешифрование
const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);

// Обновляем объект дешифрования с зашифрованным текстом
let decrypted = decipher.update(encrypted, 'base64', 'utf-8');

// Завершаем дешифрование
decrypted += decipher.final('utf-8');

console.log('Расшифрованный текст:', decrypted);

/**
 * Соответствие длинны ключей:
 * для 'aes-128-cbc' - key = crypto.randomBytes(16)
 * для 'aes-192-cbc' - key = crypto.randomBytes(24)
 * для 'aes-256-cbc' - key = crypto.randomBytes(32)
 */

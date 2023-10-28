// симметричное шифрование
const crypto = require('crypto');

// Ваш ключ в виде текстовой строки
const keyText = crypto.randomBytes(24).toString('base64');
console.log('Secret Key:', keyText);

// Преобразуем ключ в бинарное представление
const key = Buffer.from(keyText, 'base64');

// Генерируем IV (128 бит) в виде текстовой строки
const keyIV = crypto.randomBytes(16).toString('base64');
console.log('Secret IV:', keyIV);

// Преобразуем IV в бинарное представление
const iv = Buffer.from(keyIV, 'base64');

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

{
  // Генерируем ключ
  const encryptionKey = crypto.randomBytes(32); // Ключ (256 бит)

  // Преобразуем ключ в текстовое представление
  const keyText = encryptionKey.toString('base64');
  console.log('Secret Key:', keyText);
  // Преобразуем ключ в бинарное представление
  const key = Buffer.from(keyText, 'base64');
  // Сравниваем ключи по содержимому
  console.log('Ключи равны:', Buffer.compare(encryptionKey, key) === 0);

  // Генерируем IV (Initialization Vector)
  const iv = crypto.randomBytes(16); // IV (128 бит)

  // Функция для шифрования email
  function encryptEmail(email) {
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encryptedEmail = cipher.update(email, 'utf-8', 'base64');
    encryptedEmail += cipher.final('base64');
    return encryptedEmail;
  }

  // Функция для дешифрования email
  function decryptEmail(encryptedEmail) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let decryptedEmail = decipher.update(encryptedEmail, 'base64', 'utf-8');
    decryptedEmail += decipher.final('utf-8');
    return decryptedEmail;
  }

  // Пример использования
  const originalEmail = 'example@email.com';
  const encryptedEmail = encryptEmail(originalEmail);
  console.log('Зашифрованный email (Base64):', encryptedEmail);

  const decryptedEmail = decryptEmail(encryptedEmail);
  console.log('Расшифрованный email:', decryptedEmail);
}

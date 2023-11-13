const crypto = require('crypto');

// Генерация простых чисел и базы для Диффи-Хеллмана
const alice = crypto.createDiffieHellman(2048); // 2048 бит для примера
alice.generateKeys();

// Отправка публичного ключа Алисы на Боба (например, по сети)
const alicePublicKey = alice.getPublicKey('hex');

// Боб получает публичный ключ Алисы и генерирует общий секретный ключ
const bob = crypto.createDiffieHellman(alice.getPrime(), 'hex');
bob.generateKeys();

const bobPublicKey = bob.getPublicKey('hex');
const sharedSecretAlice = alice.computeSecret(bobPublicKey, 'hex', 'hex');

// Алиса также получает публичный ключ Боба и вычисляет общий секретный ключ
const sharedSecretBob = bob.computeSecret(alicePublicKey, 'hex', 'hex');

// Оба конечных узла теперь имеют общий секретный ключ
// console.log('Общий секретный ключ у Алисы:', sharedSecretAlice);
// console.log('Общий секретный ключ у Боба:', sharedSecretBob);
console.log(sharedSecretAlice == sharedSecretBob);

// Функция для шифрования сообщения
function encrypt(message, secretKey) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(message, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Функция для расшифровки сообщения
function decrypt(encryptedMessage, secretKey) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedMessage, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

// Пример использования:
const sharedSecret = sharedSecretAlice;

// Сообщение для шифрования
const originalMessage = 'Привет, мир!';

// Шифрование сообщения
const encryptedMessage = encrypt(originalMessage, sharedSecret);
console.log('Зашифрованное сообщение:', encryptedMessage);

// Расшифровка сообщения
const decryptedMessage = decrypt(encryptedMessage, sharedSecret);
console.log('Расшифрованное сообщение:', decryptedMessage);

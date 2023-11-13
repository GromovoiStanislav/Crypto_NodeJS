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
console.log('Общий секретный ключ у Алисы:', sharedSecretAlice);
console.log('Общий секретный ключ у Боба:', sharedSecretBob);

// Приводим общий секрет к фиксированной длине с использованием хэш-функции (SHA-256)
const fixedLengthSharedSecretAlice = crypto
  .createHash('sha256')
  .update(sharedSecretAlice, 'hex')
  .digest();
const fixedLengthSharedSecretBob = crypto
  .createHash('sha256')
  .update(sharedSecretBob, 'hex')
  .digest();

// Пример шифрования сообщения от Алисы и расшифрования у Боба
const messageFromAlice = 'Привет, Боб! Это сообщение от Алисы.';

// Алиса шифрует сообщение
const cipherAlgorithm = 'aes-256-ctr';
const cipherAlice = crypto.createCipheriv(
  cipherAlgorithm,
  fixedLengthSharedSecretAlice,
  Buffer.alloc(16, 0)
);
let encryptedMessage = cipherAlice.update(messageFromAlice, 'utf-8', 'hex');
encryptedMessage += cipherAlice.final('hex');

console.log('Зашифрованное сообщение от Алисы:', encryptedMessage);

// Боб расшифровывает сообщение
const decipherBob = crypto.createDecipheriv(
  cipherAlgorithm,
  fixedLengthSharedSecretBob,
  Buffer.alloc(16, 0)
);
let decryptedMessage = decipherBob.update(encryptedMessage, 'hex', 'utf-8');
decryptedMessage += decipherBob.final('utf-8');

console.log('Расшифрованное сообщение у Боба:', decryptedMessage);

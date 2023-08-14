// симметричное шифрование
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret Key:', secretKey);
///////////////////////////////////////////////////////////////

function encrypt(data, secretKey) {
  const iv = crypto.randomBytes(16); // Инициализирующий вектор
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(secretKey, 'hex'), // Преобразование в бинарные данные
    iv
  );
  let encryptedData = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  encryptedData = iv.toString('hex') + encryptedData;

  //return encryptedData;
  return Buffer.from(encryptedData, 'hex').toString('base64'); // Кодирование Base64
}

const encryptedData = encrypt('Секретное сообщение', secretKey);
console.log('Зашифрованное сообщение:', encryptedData);

//////////////////////////////////////////////////////////////////////

function decrypt(data, secretKey) {
  const encryptedData = Buffer.from(data, 'base64').toString('hex'); // Декодирование Base64
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
  const ciphertext = encryptedData.slice(32);
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(secretKey, 'hex'),
    iv
  );
  let decryptedData = decipher.update(ciphertext, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return JSON.parse(decryptedData);
}

const decryptedData = decrypt(encryptedData, secretKey);
console.log('Расшифрованное сообщение:', decryptedData);

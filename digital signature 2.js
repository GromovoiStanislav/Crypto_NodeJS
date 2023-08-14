// цифровая подпись (digital signature)
const crypto = require('crypto');

const message = 'Секретное сообщение';
let hmacDigest = '';

{
  // Создание HMAC-SHA256 хеша
  const secretKey = 'your-secret-key';
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  hmacDigest = hmac.digest('hex');
}

console.log('HMAC-SHA256 хеш:', hmacDigest);

//////////////////////////////////////////////////////////////////////
const receivedHmacDigest = hmacDigest; // Подпись, полученная от отправителя
const receivedMessage = 'Секретное сообщение'; // Сообщение, полученное от отправителя
let calculatedHmacDigest = '';

{
  const secretKey = 'your-secret-key';
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(receivedMessage);
  calculatedHmacDigest = hmac.digest('hex');
}

// Сравнение HMAC-SHA256 хешей
if (receivedHmacDigest === calculatedHmacDigest) {
  console.log('Сообщение не было изменено. Аутентификация успешна.');
} else {
  console.log('Сообщение было изменено или аутентификация не прошла.');
}

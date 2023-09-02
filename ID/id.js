const crypto = require('crypto');

{
  // Функция для генерации случайной строки определенной длины
  function generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, characters.length); // Генерация случайного индекса
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  // Функция для генерации CUID
  function generateCUID() {
    const timestamp = Date.now().toString(36); // Преобразуем текущее время в строку с основанием 36
    const randomPart = generateRandomString(4);
    return `${timestamp}${randomPart}`;
  }

  console.log('timestamp', Date.now().toString(36));

  console.log('CUID', generateCUID());
}

console.log('UUID', crypto.randomUUID());

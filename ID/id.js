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

console.log('crypto.randomBytes', crypto.randomBytes(4).toString('hex')); // 8 симвлов
console.log('crypto.randomBytes', crypto.randomBytes(5).toString('hex')); // 10 симвлов
console.log('crypto.randomBytes', crypto.randomBytes(6).toString('hex')); // 12 симвлов
/*
Это довольно надежный способ генерации уникальных идентификаторов (ID) в формате шестнадцатеричной строки.
Для многих приложений randomBytes(N).toString('hex') будет работать надежно и эффективно для создания уникальных ID.

Если вам нужно создавать абсолютно уникальные ID для каких-то критически важных операций, вам, возможно, стоит рассмотреть использование более сложных методов генерации ID, таких как UUID 
 */

console.log('Math.random', Math.random().toString(36).substring(5)); //8 симвлов
console.log('Math.random', Math.random().toString(36).substring(4)); //9 симвлов
console.log('Math.random', Math.random().toString(36).substring(3)); //10 симвлов
console.log('Math.random', Math.random().toString(36).substring(2)); //11 симвлов
/*
Этот метод прост и быстр в использовании, но он более предсказуем в сравнении с randomBytes(4).toString('hex'), и есть вероятность, что сгенерированные строки могут быть менее уникальными, особенно если он вызывается множество раз в короткий период времени. Если вам не требуется абсолютная уникальность идентификаторов, этот метод может подойти. 

Если вам нужно создавать абсолютно уникальные ID для каких-то критически важных операций, вам, возможно, стоит рассмотреть использование более сложных методов генерации ID, таких как UUID 
*/

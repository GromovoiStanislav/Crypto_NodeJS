const crypto = require('crypto');
const fs = require('fs');

// Генерируем ключ
const encryptionKey = crypto.randomBytes(32); // Ключ (256 бит)
// Путь к файлу, в который вы хотите сохранить ключ
const filePath = 'secret_key.txt';

// 1. Сохраним ключ в файле в виде текста
{
  // Преобразуем ключ в текстовое представление (Base64)
  let keyText = encryptionKey.toString('base64');

  // Записываем ключ в файл
  fs.writeFileSync(filePath, keyText);

  console.log('Ключ успешно сохранен в файл:', filePath);

  // Чтение ключа из файла
  keyText = fs.readFileSync(filePath, 'utf-8');

  // Преобразование ключа обратно в бинарное представление (Base64)
  const key = Buffer.from(keyText, 'base64');

  console.log('Загруженный ключ:', key);
}

// 2. Сохраним бинарный ключ в файле без какого-либо дополнительного преобразования
{
  // Записываем ключ в файл
  fs.writeFileSync(filePath, encryptionKey);
  console.log('Ключ успешно сохранен в файл:', filePath);

  // Чтение ключа из файла
  const key = fs.readFileSync(filePath);
  console.log('Загруженный ключ:', key);
}

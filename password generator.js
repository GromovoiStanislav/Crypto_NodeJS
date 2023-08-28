{
  function generateRandomPassword(length = 12, useSpecialChars = false) {
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (useSpecialChars) {
      characters += '!@#$%^&*()-_=+[]{}|;:,.<>?';
    }

    const password = [];

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password.push(characters[randomIndex]);
    }

    return password.join('');
  }

  console.log(generateRandomPassword(16, true)); // Генерировать пароль длиной 16 символов с использованием специальных символов
  console.log(generateRandomPassword(10)); // Генерировать пароль длиной 10 символов без специальных символов
}

{
  const { randomInt } = require('crypto');

  function generateRandomPassword(length = 12, useSpecialChars = false) {
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (useSpecialChars) {
      characters += '!@#$%^&*()-_=+[]{}|;:,.<>?';
    }

    const password = [];
    const characterCount = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = randomInt(0, characterCount);
      password.push(characters[randomIndex]);
    }

    return password.join('');
  }

  console.log(generateRandomPassword(16, true)); // Генерировать пароль длиной 16 символов с использованием специальных символов
  console.log(generateRandomPassword(10)); // Генерировать пароль длиной 10 символов без специальных символов
}

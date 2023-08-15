const express = require('express');
const crypto = require('crypto');

const app = express();

const secretKey =
  'd49b4003559f2449e3e9e26fffe0dc16e07e65b7c5fbbe857b15afcf2c4cade2'; //crypto.randomBytes(32).toString('hex')

app.use(express.json());

function generateAccessToken(userData) {
  const iv = crypto.randomBytes(16); // Инициализирующий вектор
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(secretKey, 'hex'),
    iv
  );
  let encryptedData = cipher.update(JSON.stringify(userData), 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  const token = iv.toString('hex') + encryptedData;

  //return token;
  return Buffer.from(token, 'hex').toString('base64'); // Кодирование Base64
}

function decryptAccessToken(token) {
  const data = Buffer.from(token, 'base64').toString('hex'); // Декодирование Base64
  const iv = Buffer.from(data.slice(0, 32), 'hex');
  const encryptedData = data.slice(32);
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(secretKey, 'hex'),
    iv
  );
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return JSON.parse(decryptedData);
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Пример простой проверки (для демонстрационных целей)

  if (username === 'user' && password === 'password') {
    const userData = { username }; // Здесь вы можете добавить больше данных пользователя

    const accessToken = generateAccessToken(userData);

    res.json({ accessToken });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/protected', (req, res) => {
  const accessToken = req.headers.authorization;

  if (accessToken) {
    const userData = decryptAccessToken(accessToken);

    res.json({ message: 'Access granted', user: userData.username });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

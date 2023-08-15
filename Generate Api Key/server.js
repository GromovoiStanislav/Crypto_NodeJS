const express = require('express');
const crypto = require('crypto');

const app = express();
const tokenMap = new Map(); // Хранилище для связки пользовательских токенов с их данными

app.use(express.json());

function generateRandomToken() {
  return crypto.randomBytes(32).toString('hex');
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Пример простой проверки (для демонстрационных целей)
  if (username === 'user' && password === 'password') {
    const accessToken = generateRandomToken();

    // Сохраняем access token в хранилище
    tokenMap.set(accessToken, { username });

    res.json({ accessToken });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/protected', (req, res) => {
  const accessToken = req.headers.authorization;

  if (tokenMap.has(accessToken)) {
    const userData = tokenMap.get(accessToken);
    res.json({ message: 'Access granted', user: userData.username });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

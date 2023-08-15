const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

const secretKey = 'your-secret-key'; // Замените на свой секретный ключ

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Пример простой проверки (для демонстрационных целей)
  if (username === 'user' && password === 'password') {
    // В случае успешной проверки, генерируем access token
    const accessToken = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ accessToken });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Токен действителен, вы можете использовать информацию из decoded для аутентификации

    res.json({ message: 'Access granted', user: decoded.username });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

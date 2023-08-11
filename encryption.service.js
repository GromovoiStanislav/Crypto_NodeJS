const crypto = require('crypto');

const algorithm = 'aes256';

const encrypt = (data) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.concat([Buffer.from('ENCRYPTION_KEY'), Buffer.alloc(32)], 32),
    iv
  );
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (data) => {
  const textParts = data.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.concat([Buffer.from('ENCRYPTION_KEY'), Buffer.alloc(32)], 32),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

console.log(
  encrypt('{"sub": "1234567890","name": "John Doe","iat": 1516239022}')
);

console.log(
  decrypt(
    '33108792ce1a32f8ce6a57b3c6e6124b:d741698c38eb94bd72a47e08e69960802fc8eb83c116a54811f5dd5fd92c3227c189b654388c6033a686ba570915842db9f6bc6d93c374c79fbbfa137020e2bb'
  )
);

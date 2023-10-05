import bcrypt from 'bcryptjs';

const plaintextPassword = 'mysecretpassword';
const saltRounds = 10;

// Technique 1
{
  let salt = await bcrypt.genSalt(saltRounds);
  console.log('salt', salt);

  const hash = await bcrypt.hash(plaintextPassword, salt);
  console.log('hash', hash);

  salt = bcrypt.getSalt(hash);
  console.log('salt', salt);

  const match = await bcrypt.compare(plaintextPassword, hash);
  console.log('match ', match);
}

// Technique 2
{
  const hash = await bcrypt.hash(plaintextPassword, saltRounds);
  console.log('hash', hash);

  const salt = bcrypt.getSalt(hash);
  console.log('salt', salt);

  const match = await bcrypt.compare(plaintextPassword, hash);
  console.log('match ', match);
}

// Чтобы избажать повторного хеширования пароля !!!
{
  let password = 'mysecretpassword';

  try {
    const rounds = bcrypt.getRounds(password);
    console.log('rounds ', rounds);
  } catch (error) {
    password = await bcrypt.hash(password, saltRounds); // попадаем сюда
  }
  console.log('password ', password);

  try {
    const rounds = bcrypt.getRounds(password); // попадаем сюда
    console.log('rounds ', rounds);
  } catch (error) {
    password = await bcrypt.hash(password, saltRounds);
  }
  console.log('password ', password);
}

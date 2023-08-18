const crypto = require('crypto');
const data = 'Секретное сообщение';
const salt = 'random-salt-value';

// {
//   const hash = crypto.createHash('sha1').update(data).digest('hex');
//   console.log('sha1', hash);
// }

// {
//   const hash = crypto.createHash('sha256').update(data).digest('hex');
//   console.log('sha256', hash);
// }

// {
//   const hash = crypto.createHash('sha384').update(data).digest('hex');
//   console.log('sha384', hash);
// }

// {
//   const hash = crypto.createHash('sha512').update(data).digest('hex');
//   console.log('sha512', hash);
// }

// {
//   const hash = crypto.createHash('sha3-256').update(data).digest('hex');
//   console.log('sha3-256', hash);
// }

// {
//   const hash = crypto.createHash('md5').update(data).digest('hex');
//   console.log('md5', hash);
// }

// {
//   const hash = crypto.createHash('blake2b512').update(data).digest('hex');
//   console.log('blake2b512', hash);
// }

// {
//   const hash = crypto.createHash('ripemd160').update(data).digest('hex');
//   console.log('ripemd160', hash);
// }

{
  const firstHash = crypto.createHash('sha256').update(data).digest();
  const finalHash = crypto.createHash('sha256').update(firstHash).digest('hex');
  console.log('sha256 (два раза)', finalHash);
}
//или так
{
  const firstHash = crypto.createHash('sha256').update(data).digest('hex');
  const finalHash = crypto
    .createHash('sha256')
    .update(firstHash, 'hex')
    .digest('hex');
  console.log('sha256 (два раза)', finalHash);
}
//или так
{
  const firstHash = crypto.createHash('sha256').update(data).digest('binary');
  const finalHash = crypto
    .createHash('sha256')
    .update(firstHash, 'binary')
    .digest('hex');
  console.log('sha256 (два раза)', finalHash);
}
// другой резульатат:
{
  const firstHash = crypto.createHash('sha256').update(data).digest('hex');
  const finalHash = crypto.createHash('sha256').update(firstHash).digest('hex');
  console.log('sha256 (два раза)', finalHash);
}
// другой резульатат:
{
  const firstHash = crypto.createHash('sha256').update(data).digest('binary');
  const finalHash = crypto.createHash('sha256').update(firstHash).digest('hex');
  console.log('sha256 (два раза)', finalHash);
}

{
  let hash = crypto.createHash('sha256').update(data).digest('hex');
  for (let i = 0; i < 10; i++) {
    hash = crypto.createHash('sha256').update(hash).digest('hex');
  }
  console.log('sha256 (10 раза)', hash);
}

{
  let c = crypto.createHash('sha256');
  for (let i = 0; i < 10; i++) {
    c = c.update(data);
  }
  const hash = c.digest('hex');
  console.log('sha256 (10 раза):', hash);
}

{
  const hash = crypto
    .createHash('sha256')
    .update(data + salt)
    .digest('hex');
  console.log('sha256 with Salt:', hash);
}

{
  const hash = crypto.createHash('sha256', salt).update(data).digest('hex');
  console.log('sha256 with Salt:', hash);
}

/*
может быть использован для различных целей, включая:

Целостность данных: Вы можете использовать хеш для проверки целостности данных. При передаче данных по сети или сохранении их, вы можете создать хеш для данных до отправки или сохранения, а затем сравнить этот хеш с последующими данными, чтобы убедиться, что они не были изменены.

Хеширование паролей: Хеширование паролей - это важная практика для сохранения паролей пользователей в зашифрованном виде. При аутентификации вы можете создать хеш от введенного пользователем пароля и сравнить его с хешем, сохраненным в базе данных.

Кэширование: Хеши могут использоваться в качестве ключей для кэширования данных. Это позволяет быстро проверить, есть ли у вас уже сохраненные результаты для определенного запроса.

Проверка цифровой подписи: Если у вас есть подписанный документ или сообщение, вы можете хешировать содержимое и сравнить его с указанным в подписи хешем, чтобы проверить подлинность документа.

Уникальные идентификаторы: Хеши могут быть использованы для создания уникальных идентификаторов для данных или объектов. Например, при создании уникального идентификатора для файла или записи в базе данных.

Хранение информации в хеш-таблицах: В некоторых случаях, хеши могут использоваться для быстрого доступа к данным в хеш-таблицах.
*/

/*
MD5 (Message Digest Algorithm 5):
Краткое описание: MD5 создает 128-битные хеши.
Отличия: Устаревший и считается небезопасным для криптографических целей из-за обнаруженных коллизий. Не рекомендуется для новых проектов.

SHA-1 (Secure Hash Algorithm 1):
Краткое описание: SHA-1 создает 160-битные хеши.
Отличия: Также устаревший и не рекомендуется для криптографического использования из-за слабостей в безопасности.

SHA-256, SHA-384, SHA-512 (SHA-2 Family):
Краткое описание: SHA-2 семейство включает алгоритмы, создающие хеши длиной 256, 384 или 512 бит соответственно.
Отличия: SHA-2 алгоритмы считаются безопасными и широко используются для защиты данных и цифровой подписи.

SHA-3 (Secure Hash Algorithm 3):
Краткое описание: SHA-3 создает хеши различных длин, такие как SHA-3-256 (256 бит) и SHA-3-512 (512 бит).
Отличия: SHA-3 разработан как альтернатива SHA-2 и считается безопасным.

BLAKE2 (Cryptographic Hash Function):
Краткое описание: BLAKE2 создает хеши разных длин, включая BLAKE2s (до 256 бит) и BLAKE2b (до 512 бит).
Отличия: BLAKE2 обещает высокую производительность и безопасность, являясь альтернативой другим алгоритмам хеширования.

RIPEMD-160 (RACE Integrity Primitives Evaluation Message Digest 160):
Краткое описание: RIPEMD-160 создает 160-битные хеши.
Отличия: Используется реже, но может быть полезным в определенных сценариях.

HMAC (Hash-based Message Authentication Code):
HMAC-SHA-256, HMAC-SHA-512 и другие: Эти алгоритмы сочетают стандартные хеш-функции (например, SHA-256 или SHA-512) с секретным ключом для обеспечения аутентификации и целостности данных.
*/

/*
Для максимальной безопасности рекомендуется использовать алгоритмы из семейства SHA-2 или SHA-3
SHA-3 (SHA-3-256) и SHA-2 (SHA-256) являются современными алгоритмами хеширования и обеспечивают высокий уровень безопасности

Однако следует отметить, что для более чувствительных операций, таких как аутентификация и проверка целостности, использование HMAC-SHA-256 или других алгоритмов с ключом может быть более безопасным и рекомендуется для обеспечения дополнительной защиты
*/

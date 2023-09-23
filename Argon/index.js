import argon2 from 'argon2';

const plaintextPassword = 'mysecretpassword';

// Common
try {
  const hash = await argon2.hash(plaintextPassword);
  console.log('hash ', hash);
  // $argon2id$v=19$m=65536,t=3,p=4$Kquik3zz3jyULb3zWo5FQg$VwGIMLziICW8HJwzNXtXkac4qF/4EnX5QbGdFulL7wo

  const match = await argon2.verify(hash, plaintextPassword);
  argon2.needsRehash;
  console.log('match ', match); // true

  if (match) {
    // password match
  } else {
    // password did not match
  }
} catch (err) {
  //...
}

// Pepper
try {
  const hash = await argon2.hash(plaintextPassword, {
    secret: Buffer.from('mysecret'),
  });
  console.log('hash ', hash);
  // $argon2id$v=19$m=65536,t=3,p=4$+8JaahWehKIIOYXfyTaj2g$L6dq3ER1xaZNlWaS67TBHxZ9RI+a7ptUSkXHpXHVU7w
} catch (err) {
  //...
}

// raw
try {
  const hash = await argon2.hash(plaintextPassword, { raw: true });
  console.log('hash ', hash);
  // <Buffer ef f2 8b 54 79 0e f3 c1 03 35 c9 53 a7 82 27 34 02 6c 4b a7 24 e1 a0 84 db 5f 54 7c b3 43 e7 70>
} catch (err) {
  //...
}

// type
try {
  console.log(await argon2.hash(plaintextPassword, { type: argon2.argon2d }));
  // $argon2d$v=19$m=65536,t=3,p=4$2jT2di4MFE6mdnDzzNuCdA$qglqQUM0W8yg+GDhrhx7TCYmA19yjI/Hn+s2UItq+MM
  console.log(await argon2.hash(plaintextPassword, { type: argon2.argon2i }));
  // $argon2i$v=19$m=65536,t=3,p=4$ncK4KvG32s9rMp21lI/Hpg$C4CW2iYu337ZC/vriYUUrVGZUgO8uIk377uBFiGXIsg
  console.log(await argon2.hash(plaintextPassword, { type: argon2.argon2id })); //default
  // $argon2id$v=19$m=65536,t=3,p=4$YxKIrJi2+v8Os8zTnlAO5A$r769MJNU4xdsIT0QQFBhdAn9e6sjTiUrjz2iDeIaEhk
} catch (err) {
  //...
}

// hashLength
try {
  console.log(await argon2.hash(plaintextPassword)); // default value is 32
  // $argon2id$v=19$m=65536,t=3,p=4$8e46o5prS38Rz6+UV53sqA$12fl8SQssc746k5FpDdEQF+dRyGbCAH73/TefCCmXtQ
  console.log(await argon2.hash(plaintextPassword, { hashLength: 40 }));
  // $argon2id$v=19$m=65536,t=3,p=4$pjh8JTy3ptvQsOaiGOATOw$1yWYV1c+zsVD/1zT8Ki1rAiqwoKz3gbt5igZ2k1O2GcE+oLc/I65oQ
} catch (err) {
  //...
}

// timeCost
try {
  console.log(await argon2.hash(plaintextPassword)); // default value is 3
  // $argon2id$v=19$m=65536,t=3,p=4$hkVrfsLA/RSZamH7tl+ipQ$S7yyz5PkWEFyTm5tKrodGebFZIH3psoU/6PcMmfqzro
  console.log(await argon2.hash(plaintextPassword, { timeCost: 10 }));
  // $argon2id$v=19$m=65536,t=10,p=4$9hbhEgUPrRZABCY33VIm2A$aP4ICZA54v2K1ZzskxA4acm9PUiVMviHrzagGz1dTbw
} catch (err) {
  //...
}

//argon2.needsRehash
try {
  const hash = await argon2.hash(plaintextPassword, {
    timeCost: 10,
  });
  const needsRehash = argon2.needsRehash(hash, {
    type: argon2.argon2i,
  });
  console.log('needsRehash', needsRehash); // true
} catch (err) {
  //...
}

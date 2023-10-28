const { createId, init, isCuid } = require('@paralleldrive/cuid2');

console.log(createId());
console.log(createId());
console.log(createId());

console.log(isCuid(createId())); // true
console.log(isCuid('not a cuid')); // false

{
  // The init function returns a custom createId function with the specified
  // configuration. All configuration properties are optional.
  const createId = init({
    // A custom random function with the same API as Math.random.
    // You can use this to pass a cryptographically secure random function.
    random: Math.random,
    // the length of the id
    length: 10,
    // A custom fingerprint for the host environment. This is used to help
    // prevent collisions when generating ids in a distributed system.
    fingerprint: 'a-custom-host-fingerprint',
  });

  console.log(createId());
  console.log(createId());
  console.log(createId());

  console.log(isCuid(createId())); // true
}

{
  const length = 10;
  const cuid = init({ length });
  console.log(cuid());
  console.log(cuid());
  console.log(cuid());

  console.log(isCuid(cuid())); // true
}

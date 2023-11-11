const ULID = require('ulid');
//import { ulid, monotonicFactory, factory, detectPrng } from 'ulid'

console.log('Simply');
//console.log(ulid()); // 01HEYEXM097W84FDVK6KNCCAW6
console.log(ULID.ulid()); // 01HEYF2TQTGV361GV7DEJZK4Z0
console.log(ULID.ulid()); // 01HEYF2TR1CDY0CCH68TVDFVSA
console.log(ULID.ulid()); // 01HEYF2TR2DAJAW34J9G8PPZ1H

console.log('Seed Time');
const time = Date.now();
console.log(ULID.ulid(time)); // 01ARYZ6S41DFHB19KX4E2XZKZB
console.log(ULID.ulid(time)); // 01ARYZ6S419ER4EV439KNJY1GR
console.log(ULID.ulid(time)); // 01ARYZ6S41D4QW37YDM3YK6ZGE

console.log('Monotonic ULIDs');
const ulidM = ULID.monotonicFactory();
//const ulidM = monotonicFactory()
console.log(ulidM(time)); // 01HEYFKZJQDDZFPR0XD4C1HGA6
console.log(ulidM(time)); // 01HEYFKZJQDDZFPR0XD4C1HGA7
console.log(ulidM(time)); // 01HEYFKZJQDDZFPR0XD4C1HGA8
console.log(ulidM(time)); // 01HEYFKZJQDDZFPR0XD4C1HGA9
console.log(ulidM(time)); // 01HEYFKZJQDDZFPR0XD4C1HGAA

/**
    By default, ulid will not use Math.random, because that is insecure. 
    To allow the use of Math.random, you'll have to use factory and detectPrng.
 */
console.log('Allowing the insecure Math.random');
const prng = ULID.detectPrng(true); // pass `true` to allow insecure
const ulidMath = ULID.factory(prng);

console.log(ulidMath()); //01HEYFZ542SGSKCH01YBT0CC5P
console.log(ulidMath()); //01HEYFZ542W55A3APC10HBJYXV
console.log(ulidMath()); //01HEYFZ54374VNYBRFTNMW7PM8

console.log('You can also pass in a prng to the monotonicFactory function.');
const ulidMathPrng = ULID.monotonicFactory(prng);
console.log(ulidMathPrng()); //01HEYG3BKBA0JY8NGZMGYNPHXW
console.log(ulidMathPrng()); //01HEYG3BKCT7H2NJ5YHRTCEVB0
console.log(ulidMathPrng()); //01HEYG3BKCT7H2NJ5YHRTCEVB1

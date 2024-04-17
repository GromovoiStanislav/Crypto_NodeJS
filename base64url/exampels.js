/*
Converting to, and from, base64url
*/

const base64url = require('base64url');
//import base64url from "base64url";

console.log(base64url('ladies and gentlemen we are floating in space'));
// or
console.log(base64url.encode('ladies and gentlemen we are floating in space'));

// Convert a base64url encoded string into a raw string
console.log(base64url.decode('cmlkZTogZHJlYW1zIGJ1cm4gZG93bg'));

// Convert a base64 encoded string to a base64url encoded string
console.log(base64url.fromBase64('qL8R4QIcQ/ZsRqOAbeRfcZhilN/MksRtDaErMA=='));

// Convert a base64url encoded string to a base64 encoded string
console.log(base64url.toBase64('qL8R4QIcQ_ZsRqOAbeRfcZhilN_MksRtDaErMA'));

// Convert a base64url encoded string to a Buffer containing the decoded bytes.
console.log(base64url.toBuffer('c3Bpcml0dWFsaXplZA'));

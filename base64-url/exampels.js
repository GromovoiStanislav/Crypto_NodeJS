/*
Converting to, and from, base64url
*/
const base64url = require('base64-url');

console.log(base64url.encode('Node.js is awesome.'));
// returns Tm9kZS5qcyBpcyBhd2Vzb21lLg

console.log(base64url.decode('Tm9kZS5qcyBpcyBhd2Vzb21lLg'));
// returns Node.js is awesome.

console.log(base64url.escape('This+is/goingto+escape=='));
// returns This-is_goingto-escape

console.log(base64url.unescape('This-is_goingto-escape'));
// returns This+is/goingto+escape==

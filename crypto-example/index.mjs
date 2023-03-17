import crypto from 'crypto'; // module in node // node
import CryptoJS from 'crypto-js';// extra lib // in browser

const secret = 'secret key';
const message = 'hello world';

// SHA256 : 단방향 알고리즘
const enc1 = crypto.createHmac('SHA256', secret).update(message).digest('hex');
console.log(enc1);
const enc2 = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);
console.log(enc2);
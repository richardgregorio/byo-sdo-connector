import jwt from 'jsonwebtoken';
import axios from 'axios';
import fs from 'fs';

const privateKey = fs.readFileSync('./src/server/private.key', 'utf8');

const payload = {
  iss: '3MVG9kb26yEQGZW23kR9HIddre191EglHNqhNpcxCbayjPWYjLKNIUm_Kdm2EaPvEO5NCZxlftNxEx0DGAnS3', // Consumer Key
  sub: 'byocintegrationuser@salesforce.com', // SF_SUBJECT
  aud: 'https://storm-d152488a7e9cca.my.salesforce.com',
  exp: Math.floor(Date.now() / 1000) + 60
};

const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

axios.post('https://storm-d152488a7e9cca.my.salesforce.com/services/oauth2/token', null, {
  params: {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: token
  }
}).then(res => {
  console.log('Access Token:', res.data.access_token);
}).catch(err => {
  console.error('JWT Auth Error:', err.response?.data || err.message);
});
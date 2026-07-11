require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;


app.get('/', (req, res) => {

  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  if (mode === 'subscribe' && token === verifyToken) {

    console.log('WEBHOOK VERIFIED');

    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.post('/', async (req, res) => {

  const timestamp = new Date()
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);


  console.log(`\nWebhook recibido ${timestamp}\n`);

  console.log(
    JSON.stringify(req.body, null, 2)
  );

  return res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
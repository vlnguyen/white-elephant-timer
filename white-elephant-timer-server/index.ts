import express from 'express';
import fs from 'fs';
import lodash from 'lodash';

// constants
const FILEPATH = "./res/recipients.json";

// initialize server
const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('White Elephant API'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

// helper functions
function getReceipients() {
  return JSON.parse(fs.readFileSync(FILEPATH).toString());
}

function setRecipients(waiting: string[], received: string[]) {
  fs.writeFileSync(FILEPATH, JSON.stringify({ waiting, received }));
}

// endpoints
app.get('/recipients', (req, res) => {
  res.send(getReceipients());
})

app.post('/shuffle', (req, res) => {
  const recipients = getReceipients();
  const newWaiting = lodash.shuffle(recipients.waiting);
  setRecipients(newWaiting, recipients.received);
  res.send(getReceipients());
})

app.post('/next', (req, res) => {
  const recipients = getReceipients();
  const latestReceived = recipients.waiting.shift();
  recipients.received.push(latestReceived);
  setRecipients(recipients.waiting, recipients.received);
  res.send(getReceipients());
})

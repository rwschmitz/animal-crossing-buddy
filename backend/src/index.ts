import dotenv from 'dotenv';
import express from 'express';
import mongodb from 'mongodb';

dotenv.config();
const app = express();
const port = 3001;

app.get('/', (_, res) => res.send('blinded by the lights'));

app.listen(port, () => console.log(`Backend is listening on port ${port}`));

const { MongoClient } = mongodb;
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.DB_PATH}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((): void => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  console.log(collection);
  client.close();
});

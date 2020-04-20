import dotenv from 'dotenv';
import express from 'express';
import mongodb from 'mongodb';

dotenv.config();
const app = express();
const port = 3001;

app.get('/', (_, res) => res.send('blinded by the lights'));
app.get('/about', (_, res) => res.send('this is the about page'));

app.listen(port, () => console.log(`Backend is listening on port ${port}`));

const readRandomAirbnb = (airbnb: any) => {
  console.log('airbnb', airbnb);
};

const { MongoClient } = mongodb;
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.DB_PATH}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err): void => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Successfully connected to the server!');

  // perform actions on the collection object
  const collection = client.db('sample_airbnb').collection('listingsAndReviews');
  collection.find({ _id: '10009999' }).toArray((err, docs) => {
    if (err) {
      console.log(err);
    }
    readRandomAirbnb(docs);
  });
  // client.close();
});

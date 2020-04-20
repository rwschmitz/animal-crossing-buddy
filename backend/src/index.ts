import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongodb from 'mongodb';

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const { MongoClient } = mongodb;
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.DB_PATH}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (_, res) => res.send('blinded by the lights'));
app.get('/about', (_, res) => res.send('this is the about page'));
app.get('/cats', (_, res) => {
  client.connect((err): void => {
    if (err) {
      console.log(err);
      return;
    }

    const collection = client.db('animals').collection('cats');
    collection
      .find({})
      .toArray()
      .then((items) => {
        res.status(200).json(items);
      });
  });
});

app.post('/cats', (req, res) => {
  res.send(req.statusCode);

  client.connect((err): void => {
    if (err) {
      console.log(err);
      return;
    }

    const collection = client.db('animals').collection('cats');
    collection.insertOne({
      id: req.body.catId,
      name: req.body.catName,
      age: req.body.catAge,
    });
  });
});

app.listen(port, () => console.log(`Backend is listening on port ${port}`));

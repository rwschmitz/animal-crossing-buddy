import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.DB_PATH}`;

const createMongoClient = (): MongoClient => {
  let client;
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return client;
};

const connectToMongoClient = async (req: any, _: any, next: any): Promise<MongoClient> => {
  const client = createMongoClient();
  if (!client.isConnected()) {
    await client.connect();
  }
  req.dbClient = client;
  req.db = client.db('animals');
  return next();
  // return client;
};

const middleware = nextConnect();

middleware.use(connectToMongoClient);

export default middleware;

// const getCollection = async (): Promise<any> => {
//   const client = await connectToMongoClient();
//   const collection = client.db('animals').collection('cats');
//   const data = await collection.find({}).toArray();
//   return data;
// };

// commit to trigger nextjs build

// @ts-nocheck
// import mongodb from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware';

// const { MongoClient } = mongodb;
// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.DB_PATH}`;

// const createMongoClient = (): mongodb.MongoClient => {
//   let client;
//   if (!client) {
//     client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   }
//   return client;
// };

// const connectToMongoClient = async (): Promise<mongodb.MongoClient> => {
//   const client = createMongoClient();
//   if (!client.isConnected()) {
//     await client.connect();
//   }
//   return client;
// };

const handler = nextConnect();
handler.use(middleware);

// const getCollection = async (): Promise<any> => {
//   const client = await connectToMongoClient();
//   const collection = client.db('animals').collection('cats');
//   const data = await collection.find({}).toArray();
//   return data;
// };

handler.get(async (req, res) => {
  const doc = await req.db.collection('cats').findOne();
  console.log(doc);
  res.json(doc);
});

export default handler;

// export default async (_: any, res: any): Promise<void> => {
//   const response = await getCollection();
//   res.status(200).json(response);
//   res.end();
// };

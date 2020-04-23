// export default async (_: any, res: any): Promise<void> => {
//   res.status(200).json({
//     name: 'rudy',
//     age: 31,
//     cool: true,
//   });
//   res.end();
// };
import { testConfig } from './testconfig';
import mongodb from 'mongodb';
import { NowResponse } from '@now/node';

const { MongoClient } = mongodb;
const uri = `mongodb+srv://${testConfig.USER_NAME}:${testConfig.USER_PASS}@${testConfig.DB_PATH}`;

const createMongoClient = (): mongodb.MongoClient => {
  let client;
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return client;
};

const connectToMongoClient = async (): Promise<mongodb.MongoClient> => {
  const client = createMongoClient();
  if (!client.isConnected()) {
    await client.connect();
  }
  return client;
};

const getCollection = async (): Promise<any> => {
  const client = await connectToMongoClient();
  const collection = client.db('animals').collection('cats');
  const data = await collection.find({}).toArray();
  return data;
};

export default async (_: any, res: NowResponse): Promise<void> => {
  const response = await getCollection();
  res.status(200).json(response);
  res.end();
};

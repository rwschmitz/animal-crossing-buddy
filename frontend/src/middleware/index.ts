import mongodb from 'mongodb';
import {
  GetAllDocumentsFromCollectionParams,
  GetDocumentsByQueryFromCollectionParams,
  AddOneDocumentToCollectionParams,
  UpdateDocumentParams,
  FindDocumentAndUpdateDocumentParams,
} from './index.model';

const { MongoClient } = mongodb;
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.DB_PATH}`;

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

const getAllDocumentsFromCollection = async ({
  dbName,
  collectionName,
}: GetAllDocumentsFromCollectionParams): Promise<Array<{}>> => {
  const client = await connectToMongoClient();
  const collection = client.db(dbName).collection(collectionName);
  const data = await collection.find({}).toArray();
  return data;
};

const getDocumentsByQueryFromCollection = async ({
  dbName,
  collectionName,
  queryField,
  queryValue,
}: GetDocumentsByQueryFromCollectionParams): Promise<Array<{}>> => {
  const client = await connectToMongoClient();
  const collection = client.db(dbName).collection(collectionName);
  const data = await collection.find({ [`${queryField}`]: { $eq: queryValue } }).toArray();
  return data;
};

const addOneDocumentToCollection = async ({
  dbName,
  collectionName,
  queryField,
  queryValue,
}: AddOneDocumentToCollectionParams): Promise<void> => {
  const client = await connectToMongoClient();
  client
    .db(dbName)
    .collection(collectionName)
    .insertOne({ [`${queryField}`]: queryValue });
};

const updateDocument = async ({
  dbName,
  collectionName,
  queryField,
  queryValue,
}: UpdateDocumentParams): Promise<void> => {
  const client = await connectToMongoClient();
  client
    .db(dbName)
    .collection(collectionName)
    .updateOne({ [`${queryField}`]: queryValue }, { $set: { [`${queryField}`]: queryValue } }, { upsert: true });
};

const findDocumentAndUpdateDocument = async ({
  dbName,
  collectionName,
  queryField,
  queryValue,
  island,
}: FindDocumentAndUpdateDocumentParams): Promise<void> => {
  const client = await connectToMongoClient();
  const { villagerName, islandName, islandNativeFruit } = island;
  client
    .db(dbName)
    .collection(collectionName)
    .findOneAndUpdate(
      {
        [`${queryField}`]: queryValue,
      },
      {
        $set: {
          island: {
            villagerName,
            islandName,
            islandNativeFruit,
          },
        },
      },
      {
        upsert: true,
      }
    );
};

export {
  getAllDocumentsFromCollection,
  getDocumentsByQueryFromCollection,
  addOneDocumentToCollection,
  updateDocument,
  findDocumentAndUpdateDocument,
};

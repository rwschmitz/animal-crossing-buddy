import { NowRequest, NowResponse } from '@now/node';
import { findDocumentAndUpdateDocument, getDocumentsByQueryFromCollection } from '../../../middleware';

interface UserRequest extends NowRequest {
  body: {
    data: {
      uid: string;
      villagerName: string;
      islandName: string;
      islandNativeFruit: string;
    };
  };
  query: {
    uid: string;
  };
}

export default async (req: UserRequest, res: NowResponse): Promise<void> => {
  if (req.method === 'GET') {
    const { uid } = req.query;
    const response = await getDocumentsByQueryFromCollection({
      dbName: 'animal-crossing-buddy',
      collectionName: 'users',
      queryField: 'uid',
      queryValue: uid,
    });
    console.log('island api', response);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  }
  if (req.method === 'POST') {
    const { uid, villagerName, islandName, islandNativeFruit } = req.body.data;
    await findDocumentAndUpdateDocument({
      dbName: 'animal-crossing-buddy',
      collectionName: 'users',
      queryField: 'uid',
      queryValue: uid,
      island: {
        villagerName,
        islandName,
        islandNativeFruit,
      },
    });
    // find user by uid
    // update their island info
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.end();
  }
};

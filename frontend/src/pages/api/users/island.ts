import { NowResponse } from '@now/node';
import { findDocumentAndUpdateDocument, getDocumentsByQueryFromCollection } from '../../../middleware';
import { IslandData, IslandRequest } from '../../../models/api-models/users/island.model';

export default async (req: IslandRequest, res: NowResponse): Promise<void> => {
  if (req.method === 'GET') {
    const { username } = req.query;
    const response = await getDocumentsByQueryFromCollection<IslandData>({
      dbName: 'animal-crossing-buddy',
      collectionName: 'users',
      queryField: 'uid',
      queryValue: username,
    });

    const [islandArray] = response;
    const { island } = islandArray;

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(island);
    res.end();
  }

  if (req.method === 'POST') {
    const { uid, villagerName, islandName, islandNativeFruit } = req.body.data;
    await findDocumentAndUpdateDocument({
      dbName: 'animal-crossing-buddy',
      collectionName: 'users',
      queryField: 'uid',
      queryValue: uid,
      operator: '$set',
      updateField: 'island',
      updateValue: {
        villagerName,
        islandName,
        islandNativeFruit,
      },
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.end();
  }
};

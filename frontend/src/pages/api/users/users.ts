import { NowResponse } from '@now/node';
import { getDocumentsByQueryFromCollection, updateDocument } from '../../../middleware';
import { UserRequest } from '../../../models/api-models/users/users.model';

export default async (req: UserRequest, res: NowResponse): Promise<void> => {
  if (req.method === 'GET') {
    const { uid } = req.query;
    const response = await getDocumentsByQueryFromCollection({
      dbName: 'animal-crossing-buddy',
      collectionName: 'users',
      queryField: 'uid',
      queryValue: uid,
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  }

  if (req.method === 'POST') {
    const { uid } = req.body.data;
    await updateDocument({
      dbName: 'animal-crossing-buddy',
      collectionName: 'users',
      queryField: 'uid',
      queryValue: uid,
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.end();
  }
};

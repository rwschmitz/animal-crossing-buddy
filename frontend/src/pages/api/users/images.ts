import { NowResponse } from '@now/node';
import { findDocumentAndUpdateDocument, getDocumentsByQueryFromCollection } from '../../../middleware';
import { ImageData, ImageRequest } from '../../../models/api-models/users/images.model';

export default async (req: ImageRequest, res: NowResponse): Promise<void> => {
  if (req.method === 'GET') {
    const { username } = req.query;
    const response = await getDocumentsByQueryFromCollection<ImageData>({
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
    const { uid, imageUrl } = req.body.data;
    await findDocumentAndUpdateDocument({
      dbName: 'animal-crossing-buddy',
      collectionName: 'users',
      queryField: 'uid',
      queryValue: uid,
      updateField: 'images',
      updateValue: imageUrl,
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.end();
  }
};

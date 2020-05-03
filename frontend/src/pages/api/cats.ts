import { NowRequest, NowResponse } from '@now/node';
import { getDocumentsByQueryFromCollection } from '../../middleware';

export default async (_: NowRequest, res: NowResponse): Promise<void> => {
  const response = await getDocumentsByQueryFromCollection({
    dbName: 'animals',
    collectionName: 'cats',
    queryField: 'name',
    queryValue: 'peekles',
  });
  res.status(200).json(response);
  res.end();
};

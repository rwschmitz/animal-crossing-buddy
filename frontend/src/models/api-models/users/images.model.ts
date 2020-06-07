import { NowRequest } from '@now/node';

export interface ImageRequest extends NowRequest {
  body: {
    data: {
      uid: string;
      imageUrl: string;
    };
  };
  query: {
    username: string;
  };
}

export interface ImageData {
  island: {
    villagerName: string;
    islandName: string;
    islandNativeFruit: string;
  };
}

import { NowRequest } from '@now/node';

export interface IslandRequest extends NowRequest {
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

export interface IslandData {
  island: {
    villagerName: string;
    islandName: string;
    islandNativeFruit: string;
  };
}

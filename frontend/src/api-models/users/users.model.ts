import { NowRequest } from '@now/node';

export interface UserRequest extends NowRequest {
  body: {
    data: {
      uid: string;
    };
  };
  query: {
    uid: string;
  };
}

export interface AwsCurrentUserInfo {
  username: string;
  attributes: {
    email: string;
  };
}

export interface UseCurrentUserState {
  username: string | null;
  email: string | null;
}

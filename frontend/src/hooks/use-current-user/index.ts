import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AwsCurrentUserInfo, UseCurrentUserState } from './index.model';

const useCurrentUser = (): UseCurrentUserState => {
  const [currentUser, setCurrentUser] = useState<UseCurrentUserState>({ username: '', email: '' });

  useEffect((): void => {
    const fetchCurrentUser = async (): Promise<void> => {
      const user: AwsCurrentUserInfo = await Auth.currentUserInfo();
      const { username, attributes } = user;
      const { email } = attributes;
      setCurrentUser({
        username,
        email,
      });
    };
    fetchCurrentUser();
  }, []);

  return currentUser;
};

export { useCurrentUser };

import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

interface CurrentUserInfo {
  username: string;
  attributes: {
    email: string;
  };
}

interface UseCurrentUserState {
  username: string;
  email: string;
}

const useCurrentUser = (): UseCurrentUserState => {
  const [currentUser, setCurrentUser] = useState<UseCurrentUserState>({ username: '', email: '' });

  useEffect((): void => {
    const fetchCurrentUser = async (): Promise<void> => {
      const user: CurrentUserInfo = await Auth.currentUserInfo();
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

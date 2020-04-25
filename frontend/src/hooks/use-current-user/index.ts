import { useEffect, useState } from 'react';
import { auth, User } from 'firebase';

type UseAuthState = User | null;

const useCurrentUser = (): UseAuthState => {
  const [currentUser, setCurrentUser] = useState<UseAuthState>(null);
  const firebaseAuth = auth();

  useEffect((): void => {
    firebaseAuth.onAuthStateChanged((user: UseAuthState) => {
      setCurrentUser(user);
    });
  }, [currentUser, firebaseAuth]);

  return currentUser;
};

export { useCurrentUser };

import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as firebase from 'firebase/app';
import { Auth, Storage } from 'aws-amplify';
import useSwr from 'swr';
import { useAuth, useCurrentUser } from '../hooks';
import { AuthForm } from '../components';
import { IslandInformation } from '../models/page-models/index/index.model';
import { _Frame, _H1 } from '../ui';

const ImageUploader = (): ReactElement => {
  const handleChange = (event: any): void => {
    event.persist();
    Auth.currentCredentials()
      .then(() => {
        const file = event.target.files[0];
        Storage.put('rws-example-001', file)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (): void => {
    Auth.currentCredentials()
      .then((res) => {
        console.log('res', res);
        Storage.put('test.txt', 'Hello')
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <div>
      <h2>IMAGE UPLOADER</h2>
      <input type='file' accept='image/*' onChange={(event): void => handleChange(event)} />
      <button onClick={(): void => handleClick()}>upload blank text file</button>
    </div>
  );
};

const Home = (): ReactElement => {
  const { handleSignOut } = useAuth();
  const currentUser = useCurrentUser();

  const [villagerName, setVillagerName] = useState('');
  const [islandName, setIslandName] = useState('');
  const [islandNativeFruit, setIslandNativeFruit] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [islandInformation, setIslandInformation] = useState<IslandInformation>({
    villagerName: '',
    islandName: '',
    islandNativeFruit: '',
  });

  /**
   * GOOGLE SIGN IN START
   */

  const handleRedirect = (): void => {
    firebase
      .auth()
      .getRedirectResult()
      .then((): void => {
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  // if a google account is already authenicated to the app,
  // you can't sign up with that same email as a un/pw account
  // this error occurs:
  // errorCode auth/email-already-in-use
  // errorMessage The email address is already in use by another account.
  const loginWithGoogle = (): void => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(googleProvider);
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  /**
   * GOOGLE SIGN IN END
   */

  const handleUpdateIslandInformation = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    await axios.post('/api/users/island', {
      data: {
        villagerName,
        islandName,
        islandNativeFruit,
        uid: currentUser?.uid,
      },
    });
    setVillagerName('');
    setIslandName('');
    setIslandNativeFruit('');
  };

  const fetcher = (url: string): Promise<void> =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => console.log(error));

  const { data, error } = useSwr(currentUser?.uid ? `/api/users/users?uid=${currentUser.uid}` : null, fetcher);

  useEffect(() => {
    const postData = async (): Promise<void> => {
      await axios.post('/api/users/users', {
        data: {
          uid: currentUser?.uid,
        },
      });
    };
    if (currentUser) {
      postData();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchIslandData = async (): Promise<AxiosResponse<IslandInformation>> => {
      const res = await axios.get(`/api/users/island?uid=${currentUser?.uid}`);
      setIslandInformation(res.data);
      return res;
    };
    if (currentUser) {
      fetchIslandData();
    }
  }, [currentUser]);

  return (
    <_Frame>
      {error && <div>error</div>}
      {!data && isLoading && <div>loading</div>}
      {!isLoading && (
        <>
          <_H1>Animal Crossing Buddy</_H1>
          {currentUser && (
            <>
              <div>welcome back {currentUser.email}!</div>
              <div>
                <h3>island info</h3>
                <h4>villager name: {islandInformation.villagerName}</h4>
                <h4>island name: {islandInformation.islandName}</h4>
                <h4>island native fruit: {islandInformation.islandNativeFruit}</h4>
              </div>
              <ImageUploader />
              <form
                onSubmit={(event): Promise<void> => handleUpdateIslandInformation(event)}
                style={{ border: '2px dashed white', marginBottom: '2rem', marginTop: '2rem', maxWidth: '500px' }}
              >
                <div style={{ width: '100%' }}>
                  <label id='villager-name' htmlFor='villager-name'>
                    villager name
                  </label>
                  <input
                    name='villager-name'
                    onChange={(event): void => setVillagerName(event.target.value)}
                    value={villagerName}
                  />
                </div>

                <div style={{ width: '100%' }}>
                  <label id='island-name' htmlFor='island-name'>
                    island name
                  </label>
                  <input
                    name='island-name'
                    onChange={(event): void => setIslandName(event.target.value)}
                    value={islandName}
                  />
                </div>

                <div style={{ width: '100%' }}>
                  <label id='island-native-fruit' htmlFor='island-native-fruit'>
                    island native fruit
                  </label>
                  <input
                    name='island-native-fruit'
                    onChange={(event): void => setIslandNativeFruit(event.target.value)}
                    value={islandNativeFruit}
                  />
                </div>

                <input type='submit' value='update island info!' />
              </form>

              <button onClick={handleSignOut}>sign out</button>
            </>
          )}
          {!currentUser && (
            <>
              <AuthForm formTitle='Sign up' submitButtonText='Sign up!' type='sign-up' />
              <AuthForm formTitle='Sign in' submitButtonText='Sign in!' />
              <button onClick={loginWithGoogle}>google sign in here</button>
            </>
          )}
        </>
      )}
      {data && isLoading && <div>auth is loading...</div>}
    </_Frame>
  );
};

export default Home;

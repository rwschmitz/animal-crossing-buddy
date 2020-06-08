import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import { useAuth, useCurrentUser } from '../hooks';
import { AuthForm, Form, ImageUploader } from '../components';
import { IslandInformation } from '../models/page-models/index/index.model';
import { _Container, _Form, _FormLabel, _Frame, _H1, _H2 } from '../ui';
import useSwr from 'swr';

const formValues = [
  {
    label: 'cat',
  },
  {
    label: 'dog',
  },
  {
    label: 'horse',
  },
  {
    label: 'mouse',
  },
];

const Home = (): ReactElement => {
  const { code, emailAddress, handleCode, handleConfirmation, handleEmailAddress, handleSignOut } = useAuth();
  const currentUser = useCurrentUser();
  const { username, email } = currentUser;

  const [villagerName, setVillagerName] = useState('');
  const [islandName, setIslandName] = useState('');
  const [islandNativeFruit, setIslandNativeFruit] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [islandInformation, setIslandInformation] = useState<IslandInformation>({
    villagerName: '',
    islandName: '',
    islandNativeFruit: '',
  });

  useEffect(() => {
    const handleRedirect = (): void => {
      setIsLoading(false);
    };
    handleRedirect();
  }, [username]);

  const handleUpdateIslandInformation = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    await axios.post('/api/users/island', {
      data: {
        villagerName,
        islandName,
        islandNativeFruit,
        uid: currentUser?.username,
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

  const { data, error } = useSwr(
    currentUser?.username ? `/api/users/users?uid=${currentUser.username}` : null,
    fetcher
  );

  useEffect(() => {
    const postData = async (): Promise<void> => {
      await axios.post('/api/users/users', {
        data: {
          uid: currentUser?.username,
        },
      });
    };
    if (currentUser) {
      postData();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchIslandData = async (): Promise<void> => {
      const res = await axios.get(`/api/users/island?username=${currentUser.username}`);
      setIslandInformation(res.data);
    };
    if (currentUser.username) {
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
          {username && (
            <>
              <div>welcome back {email}!</div>
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
              <Form title='Form title' labels={formValues} />
              <button onClick={handleSignOut}>sign out</button>
            </>
          )}
          {!username && (
            <>
              <section>
                <_H2>Confirm sign up!</_H2>
                <_Form onSubmit={(event): void => handleConfirmation(event)}>
                  <_Container>
                    <_FormLabel id='email' htmlFor='email'>
                      email
                    </_FormLabel>
                    <input
                      name='email'
                      onChange={(event): void => handleEmailAddress(event.target.value)}
                      value={emailAddress}
                    />
                  </_Container>
                  <_Container>
                    <_FormLabel id='code' htmlFor='code'>
                      code
                    </_FormLabel>
                    <input name='code' onChange={(event): void => handleCode(event.target.value)} value={code} />
                  </_Container>
                  <_Container>
                    <input type='submit' value='confirm account' />
                  </_Container>
                </_Form>
              </section>
              <button onClick={handleSignOut}>sign out (temp due to switch to aws)</button>
              <button onClick={async (): Promise<void> => console.log(await Auth.currentUserInfo())}>log user</button>
              <AuthForm formTitle='Sign up' submitButtonText='Sign up!' type='sign-up' />
              <AuthForm formTitle='Sign in' submitButtonText='Sign in!' />
            </>
          )}
        </>
      )}
      {data && isLoading && <div>auth is loading...</div>}
    </_Frame>
  );
};

export default Home;

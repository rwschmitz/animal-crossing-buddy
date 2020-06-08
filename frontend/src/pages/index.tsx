import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth, useCurrentUser } from '../hooks';
import { AuthForm, Form, ImageUploader } from '../components';
import { IslandInformation } from '../models/page-models/index/index.model';
import { _Container, _Form, _FormLabel, _Frame, _H1, _H2 } from '../ui';
import labels from '../static-data/labels.json';
import useSwr from 'swr';

const updateIslandLabels = [
  {
    label: labels['form.island.villager-name'],
  },
  {
    label: labels['form.island.island-name'],
  },
  {
    label: labels['form.island.island-native-fruit'],
  },
];

const Home = (): ReactElement => {
  const { code, emailAddress, handleCode, handleConfirmation, handleEmailAddress, handleSignOut } = useAuth();
  const currentUser = useCurrentUser();
  const { username, email } = currentUser;

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

  const handleUpdateIslandInformation = async (): Promise<void> => {
    await axios.post('/api/users/island', {
      data: {
        villagerName: 'snoot',
        islandName: 'snoots crew',
        islandNativeFruit: 'litter',
        uid: username,
      },
    });
  };

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
              <Form
                title='Island info'
                labels={updateIslandLabels}
                submitBtnText='Update Island'
                onSubmit={(): Promise<void> => handleUpdateIslandInformation()}
              />

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

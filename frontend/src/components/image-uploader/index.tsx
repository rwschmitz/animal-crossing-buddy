import React, { ReactElement, useState } from 'react';
import { Auth, Storage } from 'aws-amplify';

const ImageUploader = (): ReactElement => {
  const [imageKey, setImageKey] = useState('');
  const handleChange = (event: any): void => {
    event.persist(); // needed for accessing event.target ... remove it to see error ... something about synthetic event pooling
    Auth.currentCredentials()
      .then(() => {
        const file = event.target.files[0];
        console.log(event.target.files);
        const name = file.name;
        Storage.put(name, file) // create key with UUID?, then store this key in mongodb, and then fetch urls from mongodb to get images from aws
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (): void => {
    Auth.currentCredentials()
      .then(() => {
        Storage.put('test.txt', 'Hello')
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getMoreInfo = (): void => {
    Auth.currentCredentials()
      .then(() => {
        Storage.list('')
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getImage = (): void => {
    Auth.currentCredentials().then(() => {
      Storage.get('gatsby-astronaut.png').then((res: any) => {
        const str = res.split('/public/')[1].split('?')[0];
        setImageKey(str);
      });
    });
  };

  return (
    <div>
      <h2>IMAGE UPLOADER</h2>
      <input type='file' accept='image/*' onChange={(event): void => handleChange(event)} />
      <button onClick={(): void => handleClick()}>upload blank text file</button>
      <button onClick={(): void => getMoreInfo()}>get info</button>
      <img src={`https://dq4qf9v6l2li8.cloudfront.net/public/${imageKey}`} alt='cloudfront test' />
      <button onClick={(): void => getImage()}>get image</button>
    </div>
  );
};

export { ImageUploader };

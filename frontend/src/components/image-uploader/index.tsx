import React, { ReactElement } from 'react';
import { Auth, Storage } from 'aws-amplify';

const ImageUploader = (): ReactElement => {
  const handleChange = (event: any): void => {
    event.persist(); // needed for accessing event.target ... remove it to see error ... something about synthetic event pooling
    Auth.currentCredentials()
      .then(() => {
        const file = event.target.files[0];
        Storage.put('rws-example-001', file) // create key with UUID?, then store this key in mongodb, and then fetch urls from mongodb to get images from aws
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

  return (
    <div>
      <h2>IMAGE UPLOADER</h2>
      <input type='file' accept='image/*' onChange={(event): void => handleChange(event)} />
      <button onClick={(): void => handleClick()}>upload blank text file</button>
      <button onClick={(): void => getMoreInfo()}>get info</button>
    </div>
  );
};

export { ImageUploader };

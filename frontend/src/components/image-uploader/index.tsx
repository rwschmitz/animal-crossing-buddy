import React, { ReactElement, useState } from 'react';
import { Auth, Storage } from 'aws-amplify';

/**
 * 1 - Image is uploaded to s3 bucket with the name of file.
 * 2 - When the image is uploaded successfully, an object key is returned.
 *  2a - This object key is the first param in Storage.put().
 * 3 - On the success of the upload, send the final URL to mongoDB
 * 4 - When a user returns to their page, a fetch is made to get all images from their document, an array of images.
 * 5 - Wherever the array of images is being used, loop over the array to display all the images.
 */

const ImageUploader = (): ReactElement => {
  const [imageKey, setImageKey] = useState('');
  const handleChange = (event: any): void => {
    event.persist(); // needed for accessing event.target ... remove it to see error ... something about synthetic event pooling
    Auth.currentCredentials()
      .then(() => {
        const file = event.target.files[0];
        console.log(event.target.files);
        const name = file.name;
        Storage.put(name, file)
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

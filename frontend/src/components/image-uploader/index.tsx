import React, { ReactElement, useState } from 'react';
import { Auth, Storage } from 'aws-amplify';
import axios from 'axios';
import { useCurrentUser } from '../../hooks';

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
  const { username } = useCurrentUser();

  const handleChange = async (event: any): Promise<void> => {
    event.persist(); // needed for accessing event.target ... remove it to see error ... something about synthetic event pooling
    console.log(username);
    Auth.currentCredentials()
      .then(() => {
        const file = event.target.files[0];
        const name = `${Date.now()}${file.name}`;
        setImageKey(name);
        Storage.put(name, file)
          .then((res) => {
            const { key }: any = res;
            axios.post('/api/users/images', {
              data: {
                uid: username,
                imageUrl: key,
              },
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
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
      <input type='file' accept='image/*' onChange={(event): Promise<void> => handleChange(event)} />
      <img src={`https://dq4qf9v6l2li8.cloudfront.net/public/${imageKey}`} alt={imageKey} />
      <button onClick={(): void => getImage()}>get image</button>
    </div>
  );
};

export { ImageUploader };

import React, { ReactElement } from 'react';
// import cloudinary from 'cloudinary-core';
import { CloudinaryContext, Image } from 'cloudinary-react';

const ImageUploader = (): ReactElement => {
  return (
    <div>
      <h2>testing image upload...</h2>
      <CloudinaryContext cloudName='rwschmitz' width='300' crop='scale'>
        <Image publicId='test001' />
      </CloudinaryContext>
    </div>
  );
};

export { ImageUploader };

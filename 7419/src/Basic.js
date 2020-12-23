import React from 'react';
import Gallery from 'react-photo-gallery';

const Basic = ({ photos, title, direction }) => {
  return (
    <div>
      <h2>{title}</h2>
      <Gallery photos={photos} direction={direction} />
    </div>
  );
};

export default Basic;

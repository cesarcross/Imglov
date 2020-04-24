import React from 'react';
import GalleryForm from './Form';

const galleryNew = (props) => {
  return(
    <div className="App container">
      <GalleryForm 
        history={ props.history }/>
    </div>  
  );
};
export default galleryNew;
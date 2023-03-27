import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem";
import { List } from "./ImageGallery.styled";


const ImageGallery = ({ photos, modalOpen }) => {
  return (
    <div>
      <List onClick={modalOpen}>
        {photos.map((photo) => (
          <ImageGalleryItem key={photo.id} src={photo.webformatURL} alt={photo.tags} srcLarge={photo.largeImageURL} />
        ))}
      </List>
       
        
      
    </div>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    id: PropTypes.number,
    srcLarge: PropTypes.string,
  })),
  modalOpen: PropTypes.func,
  onLoadMore: PropTypes.func,
};

export default ImageGallery;
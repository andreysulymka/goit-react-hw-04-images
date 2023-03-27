import React from "react";
import PropTypes from 'prop-types';
import { Image, Item } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ src, alt, srcLarge }) => {
  
  return (
    <Item>
      
        <Image src={src} alt={alt} data-modal={srcLarge}/>
      
    </Item>
  );
};


ImageGalleryItem.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    srcLarge: PropTypes.string,
};
export default ImageGalleryItem;


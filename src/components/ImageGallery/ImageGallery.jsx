import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.scss';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.ImageGallery} onClick={e => openModal(e)}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image.webformatURL}
          largeImageURL={image.largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

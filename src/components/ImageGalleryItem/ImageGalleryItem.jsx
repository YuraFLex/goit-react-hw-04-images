import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.scss';

export const ImageGalleryItem = ({ image, largeImageURL }, key) => {
  return (
    <li key={key} className={css.GalleryItem}>
      <img
        className={css.GalleryItemImage}
        src={image}
        alt=""
        data-url={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

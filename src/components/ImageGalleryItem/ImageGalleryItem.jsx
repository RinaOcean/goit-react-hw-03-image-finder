import PropTypes from 'prop-types';
import ImageGallery from '../ImageGallery/ImageGallery';

const ImageGalleryItem = ({ images, onClick }) => (
  <>
    {images.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <li key={id} className="ImageGalleryItem">
          <img
            onClick={() => onClick(largeImageURL)}
            src={webformatURL}
            alt=""
            className="ImageGalleryItem-image"
          />
        </li>
      );
    })}
  </>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export default ImageGalleryItem;

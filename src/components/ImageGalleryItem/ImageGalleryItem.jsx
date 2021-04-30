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

export default ImageGalleryItem;

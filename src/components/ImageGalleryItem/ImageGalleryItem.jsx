const ImageGalleryItem = ({ images }) => (
  <>
    {images.map(({ id, webformatURL }) => {
      return (
        <li key={id} className="ImageGalleryItem">
          <img
            src={webformatURL}
            alt="khk"
            className="ImageGalleryItem-image"
          />
        </li>
      );
    })}
  </>
);

export default ImageGalleryItem;

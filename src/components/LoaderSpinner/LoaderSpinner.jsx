import Spinner from 'react-bootstrap/Spinner';

const LoaderSpinner = () => (
  <button className="Loader" variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </button>
);

export default LoaderSpinner;

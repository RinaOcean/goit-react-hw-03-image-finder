import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <button type="button" className="Button" onClick={onClick}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;

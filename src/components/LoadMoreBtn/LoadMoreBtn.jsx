import PropTypes from 'prop-types';
import { Button } from "./LoadMoreBtn.styled";

const LoadMoreButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      Load More
    </Button>
  );
};

Button.propTypes = {
    onClick: PropTypes.func,
};

export default LoadMoreButton;
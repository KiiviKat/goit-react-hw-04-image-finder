import PropTypes from 'prop-types';

export const ErrorMessage = ({ error }) => {
  return (
    <p className="ErrorText">
      Whoops, something went wrong: "{error.message}". Please try again!
    </p>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

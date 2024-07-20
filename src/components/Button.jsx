import PropTypes from "prop-types";

const Button = ({ handleOnClick, children }) => {
  return (
    <button
      onClick={handleOnClick}
      className="flex-1 min-w-[150px] px-4 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-400 text-white rounded transition-colors"
      aria-label={children}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button;

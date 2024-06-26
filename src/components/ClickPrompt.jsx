import { PropTypes } from "prop-types";

const ClickPrompt = ({ text, ...props }) => {
  return <p {...props}>{text}</p>;
};

ClickPrompt.propTypes = {
  text: PropTypes.string,
};

export default ClickPrompt;

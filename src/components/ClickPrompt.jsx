import { PropTypes } from "prop-types";
const ClickPrompt = ({ text }) => {
  return <p className="text-gray-600 text-2xl">{text}</p>;
};

ClickPrompt.propTypes = {
  text: PropTypes.string,
};

export default ClickPrompt;

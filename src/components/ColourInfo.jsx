import PropTypes from "prop-types";

const ColourInfo = ({ selectedColor, emoji }) => {
  return (
    <div>
      <p className="text-gray-600 mb-2">Selected Colour: {selectedColor}</p>
      <p className="text-gray-600 text-2xl mb-2">Suggested Emoji:</p>
      <p
        className={`text-gray-600 ${
          emoji === "No skin tone detected" ? "text-2xl" : "text-3xl"
        }`}
      >
        {emoji}
      </p>
    </div>
  );
};

ColourInfo.propTypes = {
  selectedColor: PropTypes.string,
  emoji: PropTypes.string,
};

export default ColourInfo;

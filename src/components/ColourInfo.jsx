import PropTypes from "prop-types";

const ColourInfo = ({ selectedColor, emoji }) => {
  return (
    <div>
      <p className="text-gray-600 mb-2 text-sm md:text-lg">
        Selected Colour: {selectedColor}
      </p>
      <p className="text-gray-600 text-lg mb-2 md:text-2xl">Suggested Emoji:</p>
      <p
        className={`text-gray-600 ${
          emoji === "No skin tone detected"
            ? "text-2xl md:text-3xl"
            : "text-2xl md:text-4xl"
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

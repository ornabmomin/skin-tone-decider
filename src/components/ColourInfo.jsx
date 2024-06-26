import PropTypes from "prop-types";

const ColourInfo = ({ selectedColor, skinTone }) => {
  return (
    <div className="flex flex-col items-center">
      {!skinTone.emoji && (
        <p className="text-xl md:text-2xl text-center py-8">
          ⚠️ No skin tone detected ⚠️
        </p>
      )}
      {skinTone.emoji && (
        <div className="flex w-full">
          <div className="w-1/2 flex items-center justify-center">
            <p className="text-gray-600 text-8xl">{skinTone.emoji}</p>
          </div>
          <div className="w-1/2 flex flex-col justify-evenly">
            <p className="text-gray-600 mb-1 text-sm md:text-md">
              Averaged Colour: {selectedColor}
            </p>
            <p className="text-gray-600 text-md">
              Suggested Emoji: {skinTone.tone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

ColourInfo.propTypes = {
  selectedColor: PropTypes.string,
  skinTone: PropTypes.object,
};

export default ColourInfo;

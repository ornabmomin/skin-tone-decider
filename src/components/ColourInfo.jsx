import { SkinToneContext } from "../store/SkinToneContext";
import { useContext } from "react";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";

init({ data });

const ColourInfo = () => {
  const {
    skinTone,
    sampleSize,
    setSampleSize,
    maxSampleSize,
    selectedEmoji,
    skinToneValue,
    emojiAnimating,
    handlePickerOpen,
  } = useContext(SkinToneContext);

  const renderErrorMessage = () => {
    if (skinTone.tone === null) {
      return "Click on the picture to sample a skin tone.";
    } else if (skinTone.tone === "") {
      return "⚠️ No skin tone detected ⚠️";
    } else {
      return null;
    }
  };

  const errorMessage = renderErrorMessage();

  return (
    <div className="flex flex-col items-center">
      {errorMessage && (
        <p className="text-lg md:text-2xl text-center py-6">{errorMessage}</p>
      )}
      {skinTone.tone && (
        <div className="flex w-full">
          <div className="w-1/2 flex items-center justify-center flex-col">
            <p
              className={`text-gray-600 text-8xl select-none cursor-pointer transition-transform duration-300 ease-in-out ${
                emojiAnimating ? "animate-emoji-pop" : ""
              }`}
              onClick={handlePickerOpen}
            >
              <em-emoji id={selectedEmoji} skin={skinToneValue}></em-emoji>
            </p>
          </div>
          <div className="w-1/2 flex flex-col justify-evenly">
            <input
              type="range"
              id="sampleSize"
              name="sampleSize"
              min="5"
              max={maxSampleSize}
              step="5"
              value={sampleSize}
              onChange={(event) => setSampleSize(Number(event.target.value))}
              className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <label
              htmlFor="sampleSize"
              className="block text-sm font-medium text-gray-700 mb-2 md:text-md"
            >
              Sample Size: {sampleSize}px
            </label>
            <div className="text-gray-600">
              <p className="text-sm">Suggested Emoji:</p>
              <p className="text-md">{skinTone.tone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColourInfo;

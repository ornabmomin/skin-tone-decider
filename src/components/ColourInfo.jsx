import { SkinToneContext } from "../store/SkinToneContext";
import { useContext, useRef, useState } from "react";

const emojiWithSkinTones = [
  ["🧑", "🧑🏻", "🧑🏼", "🧑🏽", "🧑🏾", "🧑🏿"],
  ["👩", "👩🏻", "👩🏼", "👩🏽", "👩🏾", "👩🏿"],
  ["👨", "👨🏻", "👨🏼", "👨🏽", "👨🏾", "👨🏿"],
  ["👶", "👶🏻", "👶🏼", "👶🏽", "👶🏾", "👶🏿"],
  ["🧓", "🧓🏻", "🧓🏼", "🧓🏽", "🧓🏾", "🧓🏿"],
];

const skinToneMap = {
  Light: 1,
  "Medium Light": 2,
  Medium: 3,
  "Medium Dark": 4,
  Dark: 5,
};

const ColourInfo = () => {
  const { skinTone, sampleSize, setSampleSize, maxSampleSize } =
    useContext(SkinToneContext);

  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        // Swipe left
        setCurrentEmojiIndex(
          (prevIndex) => (prevIndex + 1) % emojiWithSkinTones.length
        );
      } else {
        // Swipe right
        setCurrentEmojiIndex(
          (prevIndex) =>
            (prevIndex - 1 + emojiWithSkinTones.length) %
            emojiWithSkinTones.length
        );
      }
    }

    touchStartX.current = null;
  };

  const renderErrorMessage = () => {
    if (skinTone.emoji === null) {
      return "Click on the picture to sample a skin tone.";
    } else if (skinTone.emoji === "") {
      return "⚠️ No skin tone detected ⚠️";
    } else {
      return null;
    }
  };

  const errorMessage = renderErrorMessage();

  const currentEmoji = skinTone.tone
    ? emojiWithSkinTones[currentEmojiIndex][skinToneMap[skinTone.tone] || 0]
    : emojiWithSkinTones[currentEmojiIndex][0];

  return (
    <div className="flex flex-col items-center">
      {errorMessage && (
        <p className="text-lg md:text-2xl text-center py-6">{errorMessage}</p>
      )}
      {skinTone.emoji && (
        <div className="flex w-full">
          <div className="w-1/2 flex items-center justify-center flex-col">
            <p
              className="text-gray-600 text-8xl select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {currentEmoji}
            </p>
            <p className="text-xs pt-3">Swipe to change</p>
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
              className="block text-xs font-medium text-gray-700 mb-2 md:text-sm"
            >
              Sample Size: {sampleSize}px
            </label>
            <p className="text-gray-600 text-md">
              Suggested Emoji: {skinTone.tone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColourInfo;

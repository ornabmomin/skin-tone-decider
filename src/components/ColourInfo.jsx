import { SkinToneContext } from "../store/SkinToneContext";
import { useContext } from "react";
import Emoji from "./Emoji";
import SampleSizeSlider from "./SampleSizeSlider";

const ColourInfo = () => {
  const { skinTone } = useContext(SkinToneContext);

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
        <p className="text-lg md:text-2xl text-center py-6 text-gray-600">
          {errorMessage}
        </p>
      )}
      {skinTone.tone && (
        <div className="flex w-full">
          <Emoji />
          <div className="w-1/2 flex flex-col justify-evenly">
            <SampleSizeSlider />
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

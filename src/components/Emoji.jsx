import { useContext } from "react";
import { SkinToneContext } from "../store/SkinToneContext";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";

init({ data });

const Emoji = () => {
  const { emojiAnimating, handlePickerOpen, selectedEmoji, skinToneValue } =
    useContext(SkinToneContext);

  return (
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
  );
};
export default Emoji;

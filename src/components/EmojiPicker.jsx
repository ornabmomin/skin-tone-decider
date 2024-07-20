import { useState, useEffect, useContext } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { exclusionList } from "../utils/emojis";
import { SkinToneContext } from "../store/SkinToneContext";

const EmojiPicker = () => {
  const { setSelectedEmoji, skinToneValue } = useContext(SkinToneContext);
  const [pickerSize, setPickerSize] = useState({ width: 352, height: 435 });

  useEffect(() => {
    const updatePickerSize = () => {
      const width = Math.min(window.innerWidth - 40, 352);
      const height = Math.min(window.innerHeight - 80, 435);
      setPickerSize({ width, height });
    };

    window.addEventListener("resize", updatePickerSize);
    updatePickerSize();

    return () => window.removeEventListener("resize", updatePickerSize);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg p-4">
        <Picker
          categories={["people"]}
          data={data}
          emojiButtonSize="42"
          emojiSize="30"
          exceptEmojis={exclusionList}
          maxFrequentRows="0"
          navPosition="none"
          onEmojiSelect={setSelectedEmoji}
          perLine="7"
          skin={skinToneValue}
          skinTonePosition="none"
          style={{
            width: `${pickerSize.width}px`,
            height: `${pickerSize.height}px`,
          }}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;

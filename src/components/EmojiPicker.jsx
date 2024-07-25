import { useState, useEffect, useContext, useRef, useCallback } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { exclusionList } from "../utils/emojis";
import { SkinToneContext } from "../store/SkinToneContext";

const EmojiPicker = () => {
  const { setSelectedEmoji, skinToneValue, handlePickerClose } =
    useContext(SkinToneContext);
  const [pickerSize, setPickerSize] = useState({ width: 352, height: 435 });
  const pickerRef = useRef(null);

  const updatePickerSize = useCallback(() => {
    const width = Math.min(window.innerWidth - 40, 352);
    const height = Math.min(window.innerHeight - 80, 435);
    setPickerSize({ width, height });
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        handlePickerClose();
      }
    },
    [handlePickerClose]
  );

  useEffect(() => {
    window.addEventListener("resize", updatePickerSize);
    document.addEventListener("mousedown", handleClickOutside);
    updatePickerSize();

    return () => {
      window.removeEventListener("resize", updatePickerSize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updatePickerSize, handleClickOutside]);

  const handleEmojiSelect = useCallback(
    (emoji) => {
      setSelectedEmoji(emoji);
      handlePickerClose();
    },
    [setSelectedEmoji, handlePickerClose]
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={pickerRef} className="rounded-lg p-4">
        <Picker
          categories={["people"]}
          data={data}
          emojiButtonSize="42"
          emojiSize="30"
          exceptEmojis={exclusionList}
          maxFrequentRows="0"
          navPosition="none"
          onEmojiSelect={handleEmojiSelect}
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

import { useContext, useRef } from "react";
import UploadBox from "./UploadBox";
import Canvas from "./Canvas";
import ColourInfo from "./ColourInfo";
import { SkinToneContext } from "../store/SkinToneContext";
import EmojiPicker from "./EmojiPicker";
import Button from "./Button";

const SkinToneSelector = () => {
  const {
    imageUploaded,
    handleImageUpload,
    handlePickerOpen,
    emojiPickerOpen,
  } = useContext(SkinToneContext);

  const fileInputRef = useRef(null);

  const handleNewImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`flex flex-col items-center min-h-svh justify-center ${
        imageUploaded ? "" : "py-4"
      }`}
    >
      <div className="w-full max-w-4xl p-4 md:p-8">
        {imageUploaded ? (
          <div className="flex flex-col items-center max-h-svh">
            <Canvas className="rounded-xl mb-4" />
            <div className="text-center bg-purple-50 p-4 rounded-lg shadow-md w-80 h-38 flex flex-col justify-center">
              <ColourInfo />
            </div>
            <div className="flex gap-2 mt-4">
              <Button handleOnClick={handlePickerOpen}>Change Emoji</Button>
              <Button handleOnClick={handleNewImageClick}>New Image</Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        ) : (
          <UploadBox
            ref={fileInputRef}
            title="Select an image to get started"
            prompt="Choose Image"
            subtitle="Supported formats: JPG, PNG, GIF"
          />
        )}
      </div>
      {emojiPickerOpen && <EmojiPicker />}
    </div>
  );
};

export default SkinToneSelector;

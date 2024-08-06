import { useContext, useRef, lazy, Suspense } from "react";
import Canvas from "./Canvas";
import { SkinToneContext } from "../store/SkinToneContext";

const Button = lazy(() => import("./Button"));
const ColourInfo = lazy(() => import("./ColourInfo"));
const EmojiPicker = lazy(() => import("./EmojiPicker"));
const UploadBox = lazy(() => import("./UploadBox"));

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
        !imageUploaded && "py-4"
      }`}
    >
      <div className="w-full max-w-4xl p-4 md:p-8">
        {imageUploaded ? (
          <div className="flex flex-col items-center max-h-svh">
            <Canvas className="rounded-xl mb-4" />
            <div className="text-center bg-purple-50 p-4 rounded-lg shadow-md w-80 h-38 flex flex-col justify-center">
              <Suspense
                fallback={
                  <span className="loading loading-ring loading-xs"></span>
                }
              >
                <ColourInfo />
              </Suspense>
            </div>
            <div className="flex gap-2 mt-4">
              <Suspense
                fallback={<span className="loading loading-ring"></span>}
              >
                <Button handleOnClick={handlePickerOpen}>Change Emoji</Button>
                <Button handleOnClick={handleNewImageClick}>New Image</Button>
              </Suspense>
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
          <Suspense fallback={<span className="loading loading-ring"></span>}>
            <UploadBox
              ref={fileInputRef}
              title="Select an image to get started"
              prompt="Choose Image"
              subtitle="Supported formats: JPG, PNG, GIF"
            />
          </Suspense>
        )}
      </div>
      {emojiPickerOpen && (
        <Suspense
          fallback={<span className="loading loading-ring loading-xs"></span>}
        >
          <EmojiPicker />
        </Suspense>
      )}
    </div>
  );
};

export default SkinToneSelector;

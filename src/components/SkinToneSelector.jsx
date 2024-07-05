import { useContext, useRef } from "react";
import UploadBox from "./UploadBox";
import Canvas from "./Canvas";
import ColourInfo from "./ColourInfo";
import { SkinToneContext } from "../store/SkinToneContext";

const SkinToneSelector = () => {
  const { imageUploaded } = useContext(SkinToneContext);

  const fileInputRef = useRef(null);

  return (
    <div className="flex flex-col items-center min-h-svh justify-center">
      <div className="w-full max-w-4xl p-4 md:p-8">
        {imageUploaded ? (
          <div className="flex flex-col items-center max-h-svh">
            <Canvas className="rounded-xl mb-4" />
            <div className="text-center bg-purple-50 p-4 rounded-lg shadow-md w-80 h-38 flex flex-col justify-center">
              <ColourInfo />
            </div>
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
    </div>
  );
};

export default SkinToneSelector;

import { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import { SkinToneContext } from "../store/SkinToneContext";
import UploadIcon from "./ui/UploadIcon";

const UploadBox = forwardRef(({ title, prompt, subtitle }, ref) => {
  const { handleImageUpload } = useContext(SkinToneContext);

  return (
    <div className="text-center p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg">
      <p className="text-white text-xl mb-6 font-semibold">{title}</p>
      <label
        htmlFor="fileInput"
        className="group relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer"
      >
        <span className="relative px-5 py-2.5 transition-all duration-500 ease-in-out bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:px-8">
          <span className="flex items-center">
            <UploadIcon />
            {prompt}
          </span>
        </span>
      </label>
      <input
        id="fileInput"
        type="file"
        ref={ref}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <p className="text-white text-sm mt-4">{subtitle}</p>
    </div>
  );
});

UploadBox.displayName = "UploadBox";

UploadBox.propTypes = {
  title: PropTypes.string,
  prompt: PropTypes.string,
  subtitle: PropTypes.string,
};

export default UploadBox;

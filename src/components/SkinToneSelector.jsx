import { useState, useRef, useEffect } from "react";

const SkinToneSelector = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [emoji, setEmoji] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const img = new Image();
    img.onload = () => {
      setImageUploaded(true);
      imageRef.current = img;
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imageUploaded && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;
      const maxWidth = window.innerWidth * 0.8; // 90% of the viewport width
      const maxHeight = window.innerHeight * 0.8; // 80% of the viewport height
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
    }
  }, [imageUploaded]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;

    setSelectedColor(rgb);
    const skinTone = getSkinTone(imageData[0], imageData[1], imageData[2]);
    setEmoji(skinTone);
  };

  const getSkinTone = (r, g, b) => {
    // Check for non-skin tone colors
    const isNonSkinTone = (r, g, b) => {
      if (r < g || r < b) return true;

      // Define thresholds for non-skin tone detection
      const brightness = (r + g + b) / 3;
      const maxChannel = Math.max(r, g, b);
      const minChannel = Math.min(r, g, b);

      // Conditions for non-skin tone
      if (brightness > 250 || brightness < 10) return true; // Too bright or too dark
      if (maxChannel - minChannel > 170) return true; // High contrast, likely a non-skin color

      return false;
    };

    if (isNonSkinTone(r, g, b)) {
      return "No skin tone detected";
    }

    // Refine skin tone ranges
    if (r > 200 && g > 160 && b > 120) return "🧑🏻‍🦲 (Light)";
    if (r > 180 && g > 140 && b > 100) return "🧑🏼‍🦲 (Medium Light)";
    if (r > 160 && g > 120 && b > 80) return "🧑🏽‍🦲 (Medium)";
    if (r > 120 && g > 80 && b > 60) return "🧑🏾‍🦲 (Medium Dark)";
    return "🧑🏿‍🦲 (Dark)";
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-950">
      <div className="w-full max-w-4xl p-4 md:p-8">
        {!imageUploaded && (
          <div className="text-center p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg">
            <p className="text-white text-xl mb-6 font-semibold">
              Upload an image to get started
            </p>
            <label
              htmlFor="fileInput"
              className="group relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <span className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Choose Image
                </span>
              </span>
            </label>
            <input
              id="fileInput"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-white text-sm mt-4">
              Supported formats: JPG, PNG, GIF
            </p>
          </div>
        )}
        {imageUploaded && (
          <div className="flex flex-col items-center max-h-svh">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="rounded-xl mb-4"
            ></canvas>
            <div className="text-center bg-gray-300 p-6 rounded-lg shadow-md w-80 h-48 flex flex-col justify-center">
              {emoji === "" ? (
                <p className="text-gray-600 text-2xl">
                  Click on the picture to sample a skin tone.
                </p>
              ) : (
                <>
                  <p className="text-gray-600 mb-2">
                    Selected Color: {selectedColor}
                  </p>
                  <p className="text-gray-600 text-2xl mb-2">
                    Suggested Emoji:
                  </p>
                  <p
                    className={`text-gray-600 ${
                      emoji === "No skin tone detected"
                        ? "text-2xl"
                        : "text-3xl"
                    }`}
                  >
                    {emoji}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkinToneSelector;

import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import PropTypes from "prop-types";
import getSkinTone from "../utils/getSkinTone";
import {
  drawImageAndSquare,
  calculateAverageColor,
} from "../utils/canvasUtils";

// Define action types
const SET_SELECTED_COLOUR = "SET_SELECTED_COLOUR";
const SET_SKIN_TONE = "SET_SKIN_TONE";
const SET_LAST_CLICK_POSITION = "SET_LAST_CLICK_POSITION";
const SET_SAMPLE_SIZE = "SET_SAMPLE_SIZE";
const SET_MAX_SAMPLE_SIZE = "SET_MAX_SAMPLE_SIZE";
const SET_AVERAGE_RGB = "SET_AVERAGE_RGB";
const SET_IMAGE_UPLOADED = "SET_IMAGE_UPLOADED";

// Initial state
const initialState = {
  selectedColour: "",
  skinTone: { tone: null },
  lastClickPosition: null,
  sampleSize: 20,
  maxSampleSize: 50,
  averageRGB: null,
  imageUploaded: false,
};

const skinToneReducer = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_COLOUR:
      return { ...state, selectedColor: action.payload };
    case SET_SKIN_TONE:
      return { ...state, skinTone: action.payload };
    case SET_LAST_CLICK_POSITION:
      return { ...state, lastClickPosition: action.payload };
    case SET_SAMPLE_SIZE:
      return { ...state, sampleSize: action.payload };
    case SET_MAX_SAMPLE_SIZE:
      return { ...state, maxSampleSize: action.payload };
    case SET_AVERAGE_RGB:
      return { ...state, averageRGB: action.payload };
    case SET_IMAGE_UPLOADED:
      return { ...state, imageUploaded: action.payload };
    default:
      return state;
  }
};

export const SkinToneContext = createContext({
  ...initialState,
  canvasRef: null,
  imageRef: null,
  handleImageUpload: () => {},
  handleCanvasClick: () => {},
  setSelectedColour: () => {},
  setSkinTone: () => {},
  setLastClickPosition: () => {},
  setSampleSize: () => {},
  setMaxSampleSize: () => {},
  setAverageRGB: () => {},
  setImageUploaded: () => {},
});

const SkinToneProvider = ({ children }) => {
  const [skinToneState, skinToneDispatch] = useReducer(
    skinToneReducer,
    initialState
  );

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const setSelectedColour = (colour) => {
    skinToneDispatch({ type: SET_SELECTED_COLOUR, payload: colour });
  };

  const setSkinTone = (r, g, b) => {
    const skinTone = getSkinTone(r, g, b);
    skinToneDispatch({ type: SET_SKIN_TONE, payload: skinTone });
  };

  const setLastClickPosition = (position) => {
    skinToneDispatch({
      type: SET_LAST_CLICK_POSITION,
      payload: position,
    });
  };

  const setSampleSize = (size) => {
    skinToneDispatch({ type: SET_SAMPLE_SIZE, payload: size });
  };

  const setMaxSampleSize = (size) => {
    skinToneDispatch({ type: SET_MAX_SAMPLE_SIZE, payload: size });
  };

  const setAverageRGB = (rgb) => {
    skinToneDispatch({ type: SET_AVERAGE_RGB, payload: rgb });
  };

  const setImageUploaded = (isUploaded) => {
    skinToneDispatch({ type: SET_IMAGE_UPLOADED, payload: isUploaded });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const img = new Image();
    img.onload = () => {
      setImageUploaded(true);
      imageRef.current = img;
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = useCallback(
    (event) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("Can't get canvas ref");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Unable to get 2D context");
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);

      setLastClickPosition({ x, y });

      const halfSampleSize = Math.floor(skinToneState.sampleSize / 2);
      const imageData = ctx.getImageData(
        Math.max(0, x - halfSampleSize),
        Math.max(0, y - halfSampleSize),
        Math.min(skinToneState.sampleSize, canvas.width - x + halfSampleSize),
        Math.min(skinToneState.sampleSize, canvas.height - y + halfSampleSize)
      );

      const { r, g, b } = calculateAverageColor(imageData);
      const rgb = `rgb(${r}, ${g}, ${b})`;

      setSelectedColour(rgb);
      setAverageRGB({ r, g, b });
      setSkinTone(r, g, b);
    },
    [skinToneState.sampleSize]
  );

  const updateCanvasSize = useCallback(() => {
    if (skinToneState.imageUploaded && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.75;
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

      setMaxSampleSize(Math.floor(width / 4));

      drawImageAndSquare(
        canvasRef,
        imageRef,
        skinToneState.lastClickPosition,
        skinToneState.sampleSize,
        skinToneState.averageRGB
      );
    }
  }, [
    skinToneState.imageUploaded,
    skinToneState.lastClickPosition,
    skinToneState.sampleSize,
    skinToneState.averageRGB,
  ]);

  useEffect(() => {
    updateCanvasSize();
  }, [updateCanvasSize]);

  const contextValue = {
    ...skinToneState,
    canvasRef,
    imageRef,
    setSelectedColour,
    setSkinTone,
    setLastClickPosition,
    setSampleSize,
    setMaxSampleSize,
    setAverageRGB,
    setImageUploaded,
    handleImageUpload,
    handleCanvasClick,
    updateCanvasSize,
  };

  return (
    <SkinToneContext.Provider value={contextValue}>
      {children}
    </SkinToneContext.Provider>
  );
};

SkinToneProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SkinToneProvider;

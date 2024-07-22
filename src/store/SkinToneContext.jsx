import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import PropTypes from "prop-types";
import getSkinTone from "../utils/getSkinTone";
import { skinToneEmojiList } from "../utils/emojis";
import {
  drawImageAndSquare,
  calculateAverageColor,
} from "../utils/canvasUtils";

// Define action types
const SET_SKIN_TONE = "SET_SKIN_TONE";
const SET_LAST_CLICK_POSITION = "SET_LAST_CLICK_POSITION";
const SET_SAMPLE_SIZE = "SET_SAMPLE_SIZE";
const SET_MAX_SAMPLE_SIZE = "SET_MAX_SAMPLE_SIZE";
const SET_AVERAGE_RGB = "SET_AVERAGE_RGB";
const SET_IMAGE_UPLOADED = "SET_IMAGE_UPLOADED";
const RESET_STATE = "RESET_STATE";
const SET_SELECTED_EMOJI = "SET_SELECTED_EMOJI";
const SET_PICKER_OPEN = "SET_PICKER_OPEN";
const EMOJI_ANIMATION = "EMOJI_ANIMATION";

const getRandomSkinToneEmoji = () =>
  skinToneEmojiList[Math.floor(Math.random() * skinToneEmojiList.length)];

// Initial state
const initialState = {
  skinTone: { tone: null },
  skinToneValue: 1,
  lastClickPosition: null,
  sampleSize: 20,
  maxSampleSize: 50,
  averageRGB: null,
  imageUploaded: false,
  selectedEmoji: getRandomSkinToneEmoji(),
  showEmojiPicker: false,
  emojiAnimating: false,
};

const skinToneReducer = (state, action) => {
  switch (action.type) {
    case SET_SKIN_TONE:
      return {
        ...state,
        skinTone: action.payload.skinTone,
        skinToneValue: action.payload.skinToneValue,
      };
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
    case SET_SELECTED_EMOJI:
      return {
        ...state,
        selectedEmoji: action.payload,
        showEmojiPicker: false,
      };
    case SET_PICKER_OPEN:
      return { ...state, showEmojiPicker: true };
    case EMOJI_ANIMATION:
      return { ...state, emojiAnimating: action.payload };
    case RESET_STATE:
      return {
        ...initialState,
        imageUploaded: true,
        selectedEmoji: getRandomSkinToneEmoji(),
      };
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
  setSkinTone: () => {},
  setLastClickPosition: () => {},
  setSampleSize: () => {},
  setMaxSampleSize: () => {},
  setAverageRGB: () => {},
  setImageUploaded: () => {},
  resetState: () => {},
  setSelectedEmoji: () => {},
  handlePickerOpen: () => {},
});

const SkinToneProvider = ({ children }) => {
  const [skinToneState, skinToneDispatch] = useReducer(
    skinToneReducer,
    initialState
  );
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const setEmojiAnimation = useCallback(() => {
    skinToneDispatch({ type: EMOJI_ANIMATION, payload: true });
    setTimeout(() => {
      skinToneDispatch({ type: EMOJI_ANIMATION, payload: false });
    }, 300);
  }, []);

  const setSkinTone = useCallback(
    (r, g, b) => {
      const skinTone = getSkinTone(r, g, b);
      const skinToneValue = skinTone.value;
      if (skinTone.tone !== skinToneState.skinTone.tone) {
        skinToneDispatch({
          type: SET_SKIN_TONE,
          payload: { skinTone, skinToneValue },
        });
        setEmojiAnimation();
      }
    },
    [setEmojiAnimation, skinToneState.skinTone.tone]
  );

  const setLastClickPosition = (position) => {
    skinToneDispatch({
      type: SET_LAST_CLICK_POSITION,
      payload: position,
    });
  };

  const setSampleSize = (size) => {
    skinToneDispatch({ type: SET_SAMPLE_SIZE, payload: size });
    handleSquareResize(skinToneState.lastClickPosition);
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

  const setSelectedEmoji = ({ id }) => {
    skinToneDispatch({ type: SET_SELECTED_EMOJI, payload: id });
    setEmojiAnimation();
  };

  const handlePickerOpen = () => {
    skinToneDispatch({ type: SET_PICKER_OPEN });
  };

  const resetState = useCallback(() => {
    skinToneDispatch({
      type: RESET_STATE,
      payload: {
        ...initialState,
        imageUploaded: true,
        selectedEmoji: getRandomSkinToneEmoji(),
      },
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const img = new Image();
    img.onload = () => {
      resetState();
      imageRef.current = img;
      updateCanvasSize();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const setAvgRGBAndSkinTone = useCallback(
    (ctx, canvas, x, y) => {
      const halfSampleSize = Math.floor(skinToneState.sampleSize / 2);
      const imageData = ctx.getImageData(
        Math.max(0, x - halfSampleSize),
        Math.max(0, y - halfSampleSize),
        Math.min(skinToneState.sampleSize, canvas.width - x + halfSampleSize),
        Math.min(skinToneState.sampleSize, canvas.height - y + halfSampleSize)
      );

      const { r, g, b } = calculateAverageColor(imageData);

      setAverageRGB({ r, g, b });
      setSkinTone(r, g, b);
    },
    [setSkinTone, skinToneState.sampleSize]
  );

  const handleColourUpdate = useCallback(
    (x, y) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) {
        console.error("Canvas or context not available");
        return;
      }

      setLastClickPosition({ x, y });
      setAvgRGBAndSkinTone(ctx, canvas, x, y);
    },
    [setAvgRGBAndSkinTone]
  );

  const handleCanvasClick = useCallback(
    (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);

      handleColourUpdate(x, y);
    },
    [handleColourUpdate]
  );

  const handleSquareResize = useCallback(
    (lastClickPosition) => {
      const { x, y } = lastClickPosition;
      handleColourUpdate(x, y);
    },
    [handleColourUpdate]
  );

  const updateCanvasSize = useCallback(() => {
    if (skinToneState.imageUploaded && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.6;
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
    setSkinTone,
    setLastClickPosition,
    setSampleSize,
    setMaxSampleSize,
    setAverageRGB,
    setImageUploaded,
    handleImageUpload,
    handleCanvasClick,
    updateCanvasSize,
    resetState,
    setSelectedEmoji,
    handlePickerOpen,
    setEmojiAnimation,
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

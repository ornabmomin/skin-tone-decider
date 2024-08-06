const getSkinTone = (r, g, b) => {
  const toYCbCr = (r, g, b) => {
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const cb = 128 - 0.169 * r - 0.331 * g + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.419 * g - 0.081 * b;
    return { y, cb, cr };
  };

  const { y, cb, cr } = toYCbCr(r, g, b);

  // Check for non-skin tone colors
  const isNonSkinTone = (y, cb, cr) => {
    // Define thresholds for non-skin tone detection
    if (y > 250 || y < 10) return true; // Too bright or too dark
    if (cb < 77 || cb > 127 || cr < 133 || cr > 173) return true; // Typical skin tone range in YCbCr

    return false;
  };

  if (isNonSkinTone(y, cb, cr)) {
    return { tone: "" };
  }

  // Refine skin tone ranges based on YCbCr
  if (y > 200) {
    return { tone: "Light", value: 2 };
  } else if (y > 170) {
    return { tone: "Medium Light", value: 3 };
  } else if (y > 140) {
    return { tone: "Medium", value: 4 };
  } else if (y > 100) {
    return { tone: "Medium Dark", value: 5 };
  } else {
    return { tone: "Dark", value: 6 };
  }
};

export default getSkinTone;

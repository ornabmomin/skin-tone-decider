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
    return { tone: "" };
  }

  // Refine skin tone ranges
  if (r > 200 && g > 160 && b > 120) {
    return { tone: "Light" };
  } else if (r > 180 && g > 140 && b > 100) {
    return { tone: "Medium Light" };
  } else if (r > 160 && g > 120 && b > 80) {
    return { tone: "Medium" };
  } else if (r > 120 && g > 80 && b > 60) {
    return { tone: "Medium Dark" };
  } else {
    return { tone: "Dark" };
  }
};

export default getSkinTone;

export const drawImageAndSquare = (
  canvasRef,
  imageRef,
  lastClickPosition,
  sampleSize,
  averageRGB
) => {
  if (canvasRef.current && imageRef.current) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw square if there is a last click position
    if (lastClickPosition) {
      const squareSize = sampleSize;

      const x = lastClickPosition.x - squareSize / 2;
      const y = lastClickPosition.y - squareSize / 2;

      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;

      ctx.strokeRect(x, y, squareSize, squareSize);

      if (averageRGB) {
        ctx.font = "10px Courier";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
          `R: ${averageRGB.r} G: ${averageRGB.g} B: ${averageRGB.b}`,
          lastClickPosition.x,
          y - 10
        );
      }
    }
  }
};

export const calculateAverageColor = (imageData) => {
  let r = 0,
    g = 0,
    b = 0;
  const pixelCount = imageData.data.length / 4;

  for (let i = 0; i < imageData.data.length; i += 4) {
    r += imageData.data[i];
    g += imageData.data[i + 1];
    b += imageData.data[i + 2];
  }

  r = Math.round(r / pixelCount);
  g = Math.round(g / pixelCount);
  b = Math.round(b / pixelCount);

  return { r, g, b };
};

import { SkinToneContext } from "../store/SkinToneContext";
import { useContext } from "react";

const Canvas = ({ ...props }) => {
  const { handleCanvasClick, canvasRef } = useContext(SkinToneContext);

  return (
    <canvas ref={canvasRef} onClick={handleCanvasClick} {...props}></canvas>
  );
};

Canvas.displayName = "Canvas";

export default Canvas;

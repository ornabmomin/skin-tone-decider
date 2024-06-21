import PropTypes from "prop-types";
import { forwardRef } from "react";

const Canvas = forwardRef(({ handleCanvasClick }, ref) => {
  return (
    <canvas
      ref={ref}
      onClick={handleCanvasClick}
      className="rounded-xl mb-4"
    ></canvas>
  );
});

Canvas.displayName = "Canvas";

Canvas.propTypes = {
  handleCanvasClick: PropTypes.func.isRequired,
};

export default Canvas;

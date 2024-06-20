import PropTypes from "prop-types";
import { forwardRef } from "react";

const Canvas = forwardRef(({ handleCanvasClick, ...props }, ref) => {
  return <canvas ref={ref} onClick={handleCanvasClick} {...props}></canvas>;
});

Canvas.displayName = "Canvas";

Canvas.propTypes = {
  handleCanvasClick: PropTypes.func.isRequired,
};

export default Canvas;

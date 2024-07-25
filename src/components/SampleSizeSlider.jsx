import { useContext } from "react";
import { SkinToneContext } from "../store/SkinToneContext";

const SampleSizeSlider = () => {
  const { maxSampleSize, sampleSize, setSampleSize } =
    useContext(SkinToneContext);

  return (
    <>
      <input
        type="range"
        id="sampleSize"
        name="sampleSize"
        min="5"
        max={maxSampleSize}
        step="5"
        value={sampleSize}
        onChange={(event) => setSampleSize(Number(event.target.value))}
        className="cursor-pointer range range-secondary range-sm"
      />
      <label
        htmlFor="sampleSize"
        className="block text-sm font-medium text-gray-700 mb-2 md:text-md"
      >
        Sample Size: {sampleSize}px
      </label>
    </>
  );
};
export default SampleSizeSlider;

import { useState } from "react";
import Header from "./components/Header";
import SkinToneSelector from "./components/SkinToneSelector";

function App() {
  const [imageUploaded, setImageUploaded] = useState(false);

  return (
    <div className="flex flex-col">
      <Header imageUploaded={imageUploaded} />
      <main className="">
        <SkinToneSelector
          setImageUploaded={setImageUploaded}
          imageUploaded={imageUploaded}
          sampleSize={15}
        />
      </main>
    </div>
  );
}

export default App;

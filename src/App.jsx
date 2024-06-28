import { useState } from "react";
import Header from "./components/Header";
import SkinToneSelector from "./components/SkinToneSelector";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [imageUploaded, setImageUploaded] = useState(false);

  return (
    <div className="flex flex-col bg-slate-950">
      <Header imageUploaded={imageUploaded} />
      <main className="py-4">
        <SkinToneSelector
          setImageUploaded={setImageUploaded}
          imageUploaded={imageUploaded}
        />
        <Analytics />
      </main>
    </div>
  );
}

export default App;

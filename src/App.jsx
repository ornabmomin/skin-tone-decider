import Header from "./components/Header";
import SkinToneSelector from "./components/SkinToneSelector";
import SkinToneProvider from "./store/SkinToneContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="flex flex-col bg-slate-950">
      <SkinToneProvider>
        <Header />
        <main>
          <SkinToneSelector />
        </main>
      </SkinToneProvider>
      <Analytics />
    </div>
  );
}

export default App;

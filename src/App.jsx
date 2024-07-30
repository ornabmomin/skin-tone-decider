import { lazy, Suspense } from "react";
import SkinToneSelector from "./components/SkinToneSelector";
import SkinToneProvider from "./store/SkinToneContext";
import { Analytics } from "@vercel/analytics/react";

const Header = lazy(() => import("./components/Header"));

function App() {
  return (
    <div className="flex flex-col bg-slate-950">
      <SkinToneProvider>
        <Suspense fallback={<span className="loading loading-ring"></span>}>
          <Header />
        </Suspense>
        <main>
          <SkinToneSelector />
        </main>
      </SkinToneProvider>
      <Analytics />
    </div>
  );
}

export default App;

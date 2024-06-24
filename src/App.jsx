import Header from "./components/Header";
import SkinToneSelector from "./components/SkinToneSelector";

function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="">
        <SkinToneSelector />
      </main>
    </div>
  );
}

export default App;

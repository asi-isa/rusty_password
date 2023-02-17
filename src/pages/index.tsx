import { AiOutlineCopy } from "react-icons/ai";

function App() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <p className="text-center">Password Generator</p>

      <div className="flex justify-between items-center bg-[var(--bg-accent)] p-3">
        <p>Hj?kU879§4$</p>
        <AiOutlineCopy className="text-[var(--accent)]" />
      </div>

      <div className="flex flex-col gap-3 bg-[var(--bg-accent)] p-3">
        <div className="flex justify-between">
          <p>Character Length</p>
          <p className="text-[var(--accent)]">33</p>
        </div>

        <input type="range" />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-white" />
            <p>Include Uppercase Letters</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-white" />
            <p>Include Uppercase Letters</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-white" />
            <p>Include Uppercase Letters</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-white" />
            <p>Include Uppercase Letters</p>
          </div>
        </div>

        <div className="flex justify-between items-center bg-[var(--bg)] p-2">
          <p>STRENGTH</p>

          <div className="flex gap-1">
            <div className="w-2 h-5 border border-white" />
            <div className="w-2 h-5 border border-white" />
            <div className="w-2 h-5 border border-white" />
            <div className="w-2 h-5 border border-white" />
          </div>
        </div>

        <div className="flex justify-center items-center bg-[var(--accent)] p-2">
          <p className="text-[var(--bg)]">REGENERATE</p>
        </div>
      </div>
    </div>
  );
}

export default App;

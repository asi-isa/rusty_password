import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

function App() {
  const [password, setPassword] = useState("");

  useEffect(() => {
    generateAndSetPassword();
  }, []);

  async function generatePassword(): Promise<string> {
    return await invoke("generate_password", {
      option: {
        length: 21,
        uppercase: true,
        lowercase: true,
        numbers: false,
        symbols: true,
      },
    });
  }

  async function generateAndSetPassword() {
    const password = await generatePassword();

    setPassword(password);
  }

  async function onRegenerate() {
    generateAndSetPassword();
  }

  function setClipboard(text: string) {
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
      () => {
        console.log("success");
      },
      () => {
        console.log("failure");
      }
    );
  }

  return (
    <div className="flex flex-col gap-4 w-72">
      <p className="text-center">Password Generator</p>

      <div className="flex justify-between items-center bg-[var(--bg-accent)] p-3">
        <p>{password}</p>
        <AiOutlineCopy
          className="text-[var(--accent)] cursor-pointer"
          onClick={() => setClipboard(password)}
        />
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

        <div
          className="flex justify-center items-center bg-[var(--accent)] p-2 cursor-pointer"
          onClick={onRegenerate}
        >
          <p className="text-[var(--bg)]">REGENERATE</p>
        </div>
      </div>
    </div>
  );
}

export default App;

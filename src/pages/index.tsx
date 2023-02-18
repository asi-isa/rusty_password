import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

import PasswordOption from "../components/PasswordOption";
import Popup from "../components/Popup";
import StrengthIndicator from "../components/StrengthIndicator";

const DEFAULT_PASSWORD_OPTIONS = {
  length: 12,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
};

type PasswordOptionsType = typeof DEFAULT_PASSWORD_OPTIONS;

function App() {
  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0.0);
  const [passwordOptions, setPasswordOptions] = useState(
    DEFAULT_PASSWORD_OPTIONS
  );

  const [popupTxt, setPopupTxt] = useState("");

  useEffect(() => {
    generateAndSetPassword();
  }, [passwordOptions]);

  useEffect(() => {
    scorePassword(password);
  }, [password]);

  async function generatePassword(): Promise<string> {
    return await invoke("generate_password", {
      option: passwordOptions,
    });
  }

  async function generateAndSetPassword() {
    const password = await generatePassword();

    setPassword(password);
  }

  async function scorePassword(password: string) {
    const score: number = await invoke("score_password", { password });
    setPasswordScore(score);
  }

  function setClipboard(text: string) {
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
      () => {
        setPopupTxt("Successfully copied password");
        setTimeout(() => setPopupTxt(""), 2000);
      },
      () => {
        setPopupTxt("An error occured while copying");
        setTimeout(() => setPopupTxt(""), 2000);
      }
    );
  }

  // https://stackoverflow.com/questions/54520676/in-typescript-how-to-get-the-keys-of-an-object-type-whose-values-are-of-a-given
  type KeysWithValsOfType<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never;
  }[keyof T];

  function negatePasswordOptionFor(
    key: KeysWithValsOfType<PasswordOptionsType, boolean>
  ) {
    setPasswordOptions((currOptions) => {
      const oldState = { ...currOptions };
      const newState = { ...currOptions, [key]: !currOptions[key] };

      const atLeastOneValueIsTrue = Object.values(newState).some(
        (value) => value === true
      );

      if (atLeastOneValueIsTrue) {
        return newState;
      }

      return oldState;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4 w-72">
        <p className="text-center">Password Generator</p>

        <div className="flex justify-between items-center bg-[var(--bg-accent)] p-3">
          <p className="truncate">{password}</p>
          <AiOutlineCopy
            className="text-[var(--accent)] cursor-pointer flex-shrink-0 text-lg"
            onClick={() => setClipboard(password)}
          />
        </div>

        <div className="flex flex-col gap-3 bg-[var(--bg-accent)] p-3">
          <div className="flex justify-between">
            <p>Character Length</p>
            <p className="text-[var(--accent)]">{passwordOptions.length}</p>
          </div>

          <input
            type="range"
            min="8"
            max="33"
            value={passwordOptions.length}
            onChange={(e) => {
              setPasswordOptions((currOptions) => ({
                ...currOptions,
                length: +e.target.value,
              }));
            }}
          />

          <div className="flex flex-col gap-1">
            <PasswordOption
              title={"Include Uppercase Letters"}
              active={passwordOptions.uppercase}
              onClick={() => negatePasswordOptionFor("uppercase")}
            />
            <PasswordOption
              title={"Include Lowercase Letters"}
              active={passwordOptions.lowercase}
              onClick={() => negatePasswordOptionFor("lowercase")}
            />
            <PasswordOption
              title={"Include Numbers"}
              active={passwordOptions.numbers}
              onClick={() => negatePasswordOptionFor("numbers")}
            />
            <PasswordOption
              title={"Include Symbols"}
              active={passwordOptions.symbols}
              onClick={() => negatePasswordOptionFor("symbols")}
            />
          </div>

          <div className="flex justify-between items-center bg-[var(--bg)] p-2">
            <p>STRENGTH</p>

            <StrengthIndicator passwordScore={passwordScore} />
          </div>

          <div
            className="flex justify-center items-center bg-[var(--accent)] p-2 cursor-pointer"
            onClick={() => generateAndSetPassword()}
          >
            <p className="text-[var(--bg)]">REGENERATE</p>
          </div>
        </div>
      </div>

      <Popup txt={popupTxt} />
    </>
  );
}

export default App;

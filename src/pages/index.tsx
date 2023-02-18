import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";

import PasswordOption from "../components/PasswordOption";
import Popup from "../components/Popup";
import Slider from "../components/Slider";
import StrengthIndicator from "../components/StrengthIndicator";

const DEFAULT_PASSWORD_OPTIONS = {
  length: 12,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
};

export type PasswordOptionsType = typeof DEFAULT_PASSWORD_OPTIONS;

function App() {
  const [password, setPassword] = useState("password123");
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
      const newState = { ...currOptions, [key]: !currOptions[key] };

      const atLeastOneValueIsTrue = Object.values(newState).some(
        (value) => value === true
      );

      if (atLeastOneValueIsTrue) {
        return newState;
      }

      return currOptions;
    });
  }

  return (
    <>
      <div className="flex flex-col gap-5 w-96">
        <p className="text-center text-xl">Password Generator</p>

        <div className="flex justify-between items-center bg-[var(--bg-accent)] p-3 rounded-md">
          <p className={`truncate ${!passwordScore && "invisible"} text-lg`}>
            {password}
          </p>
          <AiOutlineCopy
            className="text-[var(--accent)] cursor-pointer flex-shrink-0 text-xl"
            onClick={() => setClipboard(password)}
          />
        </div>

        <div className="flex flex-col gap-4 bg-[var(--bg-accent)] p-3 rounded-md">
          <div className="flex justify-between">
            <p className="">Password Length</p>
            <p className="text-[var(--accent)] text-xl">
              {passwordOptions.length}
            </p>
          </div>

          <Slider
            passwordOptions={passwordOptions}
            setPasswordOptions={setPasswordOptions}
          />

          <div className="flex flex-col gap-2">
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

          <div className="flex justify-between items-center bg-[var(--bg)] p-2 rounded-sm">
            <p>STRENGTH</p>

            <StrengthIndicator passwordScore={passwordScore} />
          </div>

          <div
            className="group flex justify-center items-center bg-[var(--accent)] p-2 cursor-pointer rounded-sm hover:bg-[var(--bg-accent)] border border-[var(--accent)] transition-colors duration-300"
            onClick={() => generateAndSetPassword()}
          >
            <p className="text-[var(--bg)] group-hover:text-[var(--accent)] transition-colors duration-300">
              REGENERATE
            </p>
          </div>
        </div>
      </div>

      <Popup txt={popupTxt} />
    </>
  );
}

export default App;

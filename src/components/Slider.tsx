import { Dispatch, SetStateAction, useEffect } from "react";
import { PasswordOptionsType } from "../pages";

interface SliderProps {
  passwordOptions: PasswordOptionsType;
  setPasswordOptions: Dispatch<SetStateAction<PasswordOptionsType>>;
}

const MAX = 33;
const MIN = 8;

const Slider = ({ passwordOptions, setPasswordOptions }: SliderProps) => {
  useEffect(() => {
    // set css properties to style range track
    const root = window.document.documentElement;

    root.style.setProperty("--max", MAX.toString());
    root.style.setProperty("--min", MIN.toString());
    root.style.setProperty("--val", passwordOptions.length.toString());
  }, []);

  return (
    <input
      type="range"
      min={MIN}
      max={MAX}
      value={passwordOptions.length}
      onChange={(e) => {
        const val = +e.target.value;

        setPasswordOptions((currOptions) => ({
          ...currOptions,
          length: val,
        }));

        window.document.documentElement.style.setProperty(
          "--val",
          val.toString()
        );
      }}
    />
  );
};

export default Slider;

import { AiOutlineCheck } from "react-icons/ai";

interface PasswordOptionProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

const PasswordOption = ({ title, active, onClick }: PasswordOptionProps) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <div
        className={`w-4 h-4 flex border border-[var(--accent)] rounded-sm transition-colors duration-300 ${
          active ? "bg-[var(--accent)]" : "bg-[var(--bg-accent)]"
        }`}
      >
        <AiOutlineCheck className={`text-[var(--bg-accent)] `} />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default PasswordOption;

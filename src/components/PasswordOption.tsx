interface PasswordOptionProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

const PasswordOption = ({ title, active, onClick }: PasswordOptionProps) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <div className={`w-3 h-3 border border-white ${active && "bg-white"}`} />
      <p>{title}</p>
    </div>
  );
};

export default PasswordOption;

interface StrengthIndicatorProps {
  passwordScore: number;
}

const StrengthIndicator = ({ passwordScore }: StrengthIndicatorProps) => {
  return (
    <div className="flex gap-1">
      <div
        className={`w-2 h-5 border border-white ${
          passwordScore > 40 && "bg-white"
        }`}
      />
      <div
        className={`w-2 h-5 border border-white ${
          passwordScore > 60 && "bg-white"
        }`}
      />
      <div
        className={`w-2 h-5 border border-white ${
          passwordScore > 91 && "bg-white"
        }`}
      />
      <div
        className={`w-2 h-5 border border-white ${
          passwordScore > 94 && "bg-white"
        }`}
      />
    </div>
  );
};

export default StrengthIndicator;

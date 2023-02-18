interface StrengthIndicatorProps {
  passwordScore: number;
}

const StrengthIndicator = ({ passwordScore }: StrengthIndicatorProps) => {
  return (
    <div className="flex gap-1">
      <div
        className={`w-2 h-6 border border-white transition-colors duration-300 ${
          passwordScore > 40 && "bg-white"
        }`}
      />
      <div
        className={`w-2 h-6 border border-white transition-colors duration-300 ${
          passwordScore > 60 && "bg-white"
        }`}
      />
      <div
        className={`w-2 h-6 border border-white transition-colors duration-300 ${
          passwordScore > 91 && "bg-white"
        }`}
      />
      <div
        className={`w-2 h-6 border border-white transition-colors duration-300 ${
          passwordScore > 94 && "bg-white"
        }`}
      />
    </div>
  );
};

export default StrengthIndicator;

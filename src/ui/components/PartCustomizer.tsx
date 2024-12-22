import { Part, PartOption } from '../../domain/entities/Product';

interface PartCustomizerProps {
  part: Part;
  selectedOption: string;
  onOptionChange: (partId: string, optionId: string) => void;
}

const PartCustomizer: React.FC<PartCustomizerProps> = ({
  part,
  selectedOption,
  onOptionChange,
}) => {
  const styleSelectedOption = (option: PartOption) =>
    selectedOption === option.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800';

  const styleAvailableOption = (isAvailableOption: boolean) =>
    isAvailableOption ? '' : 'opacity-30 cursor-not-allowed';

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">{part.name}</h3>
      <div className="flex flex-wrap gap-2">
        {part.options.map((option) => (
          <button
            key={option.id}
            className={`px-4 py-2 rounded ${styleSelectedOption(option)} ${styleAvailableOption(option.available)}`}
            onClick={() => onOptionChange(part.id, option.id)}
            disabled={!option.available}
          >
            {option.name}
            {option.additionalPrice > 0 && ` (+€${option.additionalPrice})`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PartCustomizer;

import { Part } from '../../domain/entities/Part';
import { PartOption } from '../../domain/entities/PartOption';

interface PartCustomizerProps {
  part: Part;
  selectedOption: number | null;
  disallowedOptions: number[];
  onOptionChange: (partId: number, optionId: number) => void;
}

const PartCustomizer: React.FC<PartCustomizerProps> = ({
  part,
  selectedOption,
  disallowedOptions,
  onOptionChange,
}) => {
  const styleSelectedOption = (option: PartOption) =>
    selectedOption === option.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800';

  const isDisabledOption = (option: PartOption) =>
    Boolean(disallowedOptions.find((disallowedOptionId) => disallowedOptionId === option.id));

  const styleDisableOption = (option: PartOption) =>
    isDisabledOption(option) ? 'opacity-30 cursor-not-allowed' : '';
  const styleOutOfStockOption = (option: PartOption) =>
    option.stock === 0 ? 'bg-red-300 opacity-30 cursor-not-allowed' : '';

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">{part.name}</h3>
      <div className="flex flex-wrap gap-2">
        {part.options.map((option) => (
          <button
            key={option.id}
            className={`px-4 py-2 rounded ${styleSelectedOption(option)} ${styleDisableOption(option)} ${styleOutOfStockOption(option)}`}
            onClick={() => onOptionChange(part.id, option.id)}
            disabled={isDisabledOption(option)}
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

import { Part } from '../../types/Part';
import { PartOption } from '../../types/PartOption';

interface PartCustomizerProps {
  part: Part;
  selectedOption: PartOption['id'] | null;
  disallowedOptions: PartOption['id'][];
  onOptionChange: (partId: Part['id'], optionId: PartOption['id']) => void;
}

const PartCustomizer: React.FC<PartCustomizerProps> = ({
  part,
  selectedOption,
  disallowedOptions,
  onOptionChange,
}) => {
  const isDisallowedOption = (option: PartOption) =>
    Boolean(disallowedOptions.find((disallowedOptionId) => disallowedOptionId === option.id));
  const isOutOfStockOption = (option: PartOption) => option.stock === 0;

  const styleSelectedOption = (option: PartOption) =>
    selectedOption === option.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800';
  const styleDisabledOption = (option: PartOption) =>
    isOutOfStockOption(option) || isDisallowedOption(option) ? 'opacity-30 cursor-not-allowed' : '';
  const styleOutOfStockOption = (option: PartOption) =>
    isOutOfStockOption(option) ? 'bg-red-300' : '';

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">{part.name}</h3>
      <div className="flex flex-wrap gap-2">
        {part.options.map((option) => (
          <button
            key={option.id}
            className={`px-4 py-2 rounded ${styleSelectedOption(option)} ${styleDisabledOption(option)} ${styleOutOfStockOption(option)}`}
            onClick={() => onOptionChange(part.id, option.id)}
            disabled={isDisallowedOption(option) || isOutOfStockOption(option)}
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

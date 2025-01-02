import { Part } from '../../types/Part';
import { PartOption } from '../../types/PartOption';
import { OptionDependency } from '../../types/Product';

// Types
type identifyDisallowedOptionsTypes = ({
  selectedOptions,
  dependencies,
}: {
  selectedOptions: { [partId: Part['id']]: PartOption['id'] };
  dependencies: OptionDependency[];
}) => PartOption['id'][];

type filterSelectedOptionsTypes = ({
  selectedOptions,
  disallowedOptions,
}: {
  selectedOptions: { [partId: Part['id']]: PartOption['id'] };
  disallowedOptions: PartOption['id'][];
}) => { [partId: Part['id']]: PartOption['id'] };

// Methods
const identifyDisallowedOptions: identifyDisallowedOptionsTypes = ({
  selectedOptions,
  dependencies,
}) => {
  const selectedOptionIds = Object.values(selectedOptions);

  const disallowedOptionIds = dependencies.reduce<PartOption['id'][]>((acc, dependency) => {
    if (selectedOptionIds.includes(dependency.optionId)) {
      acc.push(dependency.disallowedOptionId);
    }
    return acc;
  }, []);

  return disallowedOptionIds;
};

const filterSelectedOptions: filterSelectedOptionsTypes = ({
  selectedOptions,
  disallowedOptions,
}) => {
  const newSelectedOptions = { ...selectedOptions };

  disallowedOptions.forEach((disallowedOptionId: PartOption['id']) => {
    const partId = Object.keys(newSelectedOptions).find(
      (partId) => newSelectedOptions[Number(partId)] === disallowedOptionId,
    );
    if (partId) {
      delete newSelectedOptions[Number(partId)];
    }
  });

  return newSelectedOptions;
};

export const partOptionsService = {
  identifyDisallowedOptions,
  filterSelectedOptions,
};

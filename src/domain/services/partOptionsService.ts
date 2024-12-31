import { OptionDependency } from '../../types/Product';

// Types
type identifyDisallowedOptionsTypes = ({
  selectedOptions,
  dependencies,
}: {
  selectedOptions: { [partId: number]: number };
  dependencies: OptionDependency[];
}) => number[];

type filterSelectedOptionsTypes = ({
  selectedOptions,
  disallowedOptions,
}: {
  selectedOptions: { [partId: number]: number };
  disallowedOptions: number[];
}) => { [partId: number]: number };

// Methods
const identifyDisallowedOptions: identifyDisallowedOptionsTypes = ({
  selectedOptions,
  dependencies,
}) => {
  const selectedOptionIds = Object.values(selectedOptions);

  const disallowedOptionIds = dependencies.reduce<number[]>((acc, dependency) => {
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

  disallowedOptions.forEach((disallowedOptionId: number) => {
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

import { OptionDependency } from '../entities/Product';

// Types
type identifyDisallowedOptionsTypes = ({
  selectedOptions,
  dependencies,
}: {
  selectedOptions: { [partId: string]: string };
  dependencies: OptionDependency[];
}) => string[];

type filterSelectedOptionsTypes = ({
  selectedOptions,
  disallowedOptions,
}: {
  selectedOptions: { [partId: string]: string };
  disallowedOptions: string[];
}) => { [partId: string]: string };

// Methods
const identifyDisallowedOptions: identifyDisallowedOptionsTypes = ({
  selectedOptions,
  dependencies,
}) => {
  const selectedOptionIds = Object.values(selectedOptions);

  const disallowedOptionIds = dependencies.reduce<string[]>((acc, dependency) => {
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

  disallowedOptions.forEach((disallowedOptionId: string) => {
    const partId = Object.keys(newSelectedOptions).find(
      (partId) => newSelectedOptions[partId] === disallowedOptionId,
    );
    if (partId) {
      delete newSelectedOptions[partId];
    }
  });

  return newSelectedOptions;
};

export const partOptionsService = {
  identifyDisallowedOptions,
  filterSelectedOptions,
};

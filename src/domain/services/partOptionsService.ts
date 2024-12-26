import { OptionsDependencies } from '../entities/Product';

type getDisallowedOptionsTypes = ({
  selectedOptions,
  dependencies,
}: {
  selectedOptions: { [partId: string]: string };
  dependencies: OptionsDependencies[];
}) => string[];

const getDisallowedOptions: getDisallowedOptionsTypes = ({ selectedOptions, dependencies }) => {
  const selectedOptionIds = Object.values(selectedOptions);

  const disallowedOptionIds = dependencies.reduce<string[]>((acc, dependency) => {
    if (selectedOptionIds.includes(dependency.optionId)) {
      acc.push(...dependency.disallowedOptionIds);
    }
    return acc;
  }, []);

  return disallowedOptionIds;
};

export const partOptionsService = { getDisallowedOptions };

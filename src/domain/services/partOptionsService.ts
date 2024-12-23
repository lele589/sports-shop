import { Part, PartOption } from '../entities/Product';

type getInitialPartOptionsTypes = ({ parts }: { parts: Part[] }) => {
  [partId: string]: string;
};

const getInitialPartOptions: getInitialPartOptionsTypes = ({
  parts,
}) => {
  const initialPartOptions = parts.reduce((acc, part: Part) => {
    const availableOptions = part.options.filter((option: PartOption) => option.available);

    const lessExpensiveOption = availableOptions.reduce((leastExpensive, option) => {
      return option.additionalPrice < leastExpensive.additionalPrice ? option : leastExpensive;
    }, availableOptions[0]);

    return { ...acc, [part.id]: lessExpensiveOption.id };
  }, {});

  return initialPartOptions;
};

export const partOptionsService = { getInitialPartOptions };

import { Part, PartOption } from '../entities/Product';

type getInitialPartOptionsTypes = ({ partOptions }: { partOptions: Part[] }) => {
  [partId: string]: string;
};

const getInitialPartOptions: getInitialPartOptionsTypes = ({
  partOptions,
}: {
  partOptions: Part[];
}) => {
  const initialPartOptions = partOptions.reduce((acc, part: Part) => {
    const availableOptions = part.options.filter((option: PartOption) => option.available);

    const lessExpensiveOption = availableOptions.reduce((leastExpensive, option) => {
      return option.additionalPrice < leastExpensive.additionalPrice ? option : leastExpensive;
    }, availableOptions[0]);

    return { ...acc, [part.id]: lessExpensiveOption.id };
  }, {});

  return initialPartOptions;
};

export const partOptionsService = { getInitialPartOptions };

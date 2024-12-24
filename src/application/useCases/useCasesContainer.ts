import { CalculateProductPriceUseCaseCommand } from './calculateProductPriceUseCaseCommand';
import { GetInitialPartOptionsUseCaseQuery } from './getInitialPartOptionsUseCaseQuery';

export const useCases = {
  getInitialPartOptions: GetInitialPartOptionsUseCaseQuery,
  calculateProductPrice: CalculateProductPriceUseCaseCommand,
};

import { FindProductDetailsUseCaseQuery } from './findProductDetailsUseCaseQuery';
import { UpdateProductCustomizationUseCaseCommand } from './updateProductCustomizationUseCaseCommand';

export const useCases = {
  updateProductCustomization: UpdateProductCustomizationUseCaseCommand,
  findProductDetails: FindProductDetailsUseCaseQuery,
};

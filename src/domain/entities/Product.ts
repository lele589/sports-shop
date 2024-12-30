import { Part } from './Part';

export type ProductType = 'bicycle' | 'other';

export interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  basePrice: number;
  stock: number;
  creationDate: Date;
  parts: Part[];
  imageUrl: string;
  dependencies: OptionDependency[];
}

export interface OptionDependency {
  optionId: string;
  disallowedOptionId: string;
}

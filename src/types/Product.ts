import { Part } from './Part';
import { PartOption } from './PartOption';

export type ProductType = 'bicycle' | 'other';

export interface Product {
  id: number;
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
  optionId: PartOption['id'];
  disallowedOptionId: PartOption['id'];
}

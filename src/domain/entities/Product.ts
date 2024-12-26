export type ProductType = 'bicycle' | 'skis' | 'skate';
export interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  basePrice: number;
  inStock: boolean;
  creationDate: Date;
  parts: Part[];
  imageUrl: string;
  dependencies: OptionsDependencies[];
}

export interface Part {
  id: string;
  name: string;
  options: PartOption[];
}

export interface PartOption {
  id: string;
  name: string;
  additionalPrice: number;
  available: boolean;
}

export interface OptionsDependencies {
  optionId: string;
  disallowedOptionIds: string[];
}

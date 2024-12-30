import { Product } from '../../../domain/entities/Product';

export const mockProduct: Product = {
  id: '1',
  name: 'Bicycle A-125',
  description:
    'This bicycle is designed for road riding, offering a smooth and efficient ride on paved surfaces. It features lightweight materials and aerodynamic design to enhance speed and performance, making it ideal for long-distance rides and competitive cycling.',
  type: 'bicycle',
  basePrice: 1000,
  stock: 5,
  creationDate: new Date(),
  parts: [
    {
      id: '1',
      name: 'Part 1',
      options: [
        { id: '1', name: 'Option 1', additionalPrice: 0, available: true },
        { id: '2', name: 'Option 2', additionalPrice: 10, available: true },
        { id: '3', name: 'Option 3', additionalPrice: 20, available: true },
      ],
    },
    {
      id: '2',
      name: 'Part 2',
      options: [
        { id: '4', name: 'Option 4', additionalPrice: 0, available: true },
        { id: '5', name: 'Option 5', additionalPrice: 15, available: true },
      ],
    },
  ],
  imageUrl: 'https://placehold.co/600x400',
  dependencies: [
    {
      optionId: '2',
      disallowedOptionId: '4',
    },
    {
      optionId: '5',
      disallowedOptionId: '2',
    },
  ],
};

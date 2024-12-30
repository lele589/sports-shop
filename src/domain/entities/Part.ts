import { PartOption } from './PartOption';

export interface Part {
  id: number;
  name: string;
  options: PartOption[];
}

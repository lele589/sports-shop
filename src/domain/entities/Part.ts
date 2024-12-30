import { PartOption } from './PartOption';

export interface Part {
  id: string;
  name: string;
  options: PartOption[];
}

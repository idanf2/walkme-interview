import {Position} from './position';

export interface Shape {
  id: string;
  type: string;
  position: Position;
  color: string;
  opacity: number;
  isBorderShown: boolean;
  resize: number;
}

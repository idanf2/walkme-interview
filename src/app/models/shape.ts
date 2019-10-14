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

export function getDefaultShape(id: string, type: string, position?: Position): Shape {
  return {
    id,
    type,
    position,
    color: 'black',
    opacity: 1,
    isBorderShown: false,
    resize: 1
  };
}

import {Shape} from '../models/shape';

export interface IShapeState {
  shapes: Shape[];
  selectedShapeId: string;
}

export const initialShapeState: IShapeState = {
  shapes: [],
  selectedShapeId: null
};


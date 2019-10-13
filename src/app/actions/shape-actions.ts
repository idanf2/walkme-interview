import {Action} from '@ngrx/store';
import {Shape} from '../models/shape';

export const ADD_SHAPE = 'ADD_SHAPE';
export const UPDATE_SHAPE = 'UPDATE_SHAPE';
export const UPDATE_SHAPE_POSITION = 'UPDATE_SHAPE_POSITION';

export class AddShapeAction implements Action {
  type = ADD_SHAPE;

  constructor(public payload: Shape) {
  }
}

export class UpdateShapeAction implements Action {
  type = UPDATE_SHAPE;

  constructor(public payload: Shape) {
  }
}

export class UpdateShapePositionAction implements Action {
  type = UPDATE_SHAPE_POSITION;

  constructor(public payload: {id: string, position: { x: number, y: number }}) {
  }
}

export type ShapeActions = AddShapeAction | UpdateShapeAction | UpdateShapePositionAction;

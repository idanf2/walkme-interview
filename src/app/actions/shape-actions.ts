import {Action} from '@ngrx/store';
import {Shape} from '../models/shape';

export const ADD_SHAPE = 'ADD_SHAPE';
export const UPDATE_SHAPE = 'UPDATE_SHAPE';
export const UPDATE_SHAPE_POSITION = 'UPDATE_SHAPE_POSITION';
export const UPDATE_SELECTED_SHAPE = 'UPDATE_SELECTED_SHAPE';

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
export class UpdateSelectedShapeAction implements Action {
  type = UPDATE_SELECTED_SHAPE;

  constructor(public payload: string) {
  }
}

export type ShapeActions = AddShapeAction | UpdateShapeAction | UpdateShapePositionAction | UpdateSelectedShapeAction;

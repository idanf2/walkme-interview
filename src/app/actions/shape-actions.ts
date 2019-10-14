import {Action} from '@ngrx/store';
import {Shape} from '../models/shape';
import {Position} from '../models/position';

export const ADD_SHAPE = 'ADD_SHAPE';
export const UPDATE_SHAPE = 'UPDATE_SHAPE';
export const UPDATE_SHAPE_POSITION = 'UPDATE_SHAPE_POSITION';
export const UPDATE_SELECTED_SHAPE = 'UPDATE_SELECTED_SHAPE';
export const RESET_SHAPES = 'RESET_SHAPES';

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

  constructor(public payload: {id: string, position: Position}) {
  }
}
export class UpdateSelectedShapeAction implements Action {
  type = UPDATE_SELECTED_SHAPE;

  constructor(public payload: string) {
  }
}

export class ResetShapesAction implements Action {
  type = RESET_SHAPES;

  constructor(public payload: boolean) {
  }
}

export type ShapeActions = AddShapeAction | UpdateShapeAction | UpdateShapePositionAction | UpdateSelectedShapeAction | ResetShapesAction;

import {ADD_SHAPE, ShapeActions, UPDATE_SHAPE, UPDATE_SHAPE_POSITION} from '../actions/shape-actions';
import {initialShapeState, IShapeState} from '../state/shape.state';
import {Shape} from '../models/shape';

export const shapeReducers = (state: IShapeState = initialShapeState, action: ShapeActions): IShapeState => {
  switch (action.type) {
    case ADD_SHAPE: {
      return {
        ...state,
        shapes: [...state.shapes, action.payload as Shape]
      };
    }
    case UPDATE_SHAPE: {
      const updatedShape: Shape = action.payload as Shape;
      const oldShapeIndex: number = state.shapes.findIndex((shape) => shape.id === updatedShape.id);

      if (oldShapeIndex > -1) {
        const newShapeArray: Shape[] = [...state.shapes];
        newShapeArray[oldShapeIndex] = {...updatedShape};
        return {
          ...state,
          shapes: newShapeArray
        };
      } else {
        return state;
      }
    }
    case UPDATE_SHAPE_POSITION: {
      const updatedPosition: {x: number, y: number} = action.payload.position as {x: number, y: number};
      const oldShapeIndex: number = state.shapes.findIndex((shape) => shape.id === action.payload.id);

      if (oldShapeIndex > -1) {
        const newShapeArray: Shape[] = [...state.shapes];
        newShapeArray[oldShapeIndex] = {...newShapeArray[oldShapeIndex], position: updatedPosition};
        return {
          ...state,
          shapes: newShapeArray
        };
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
};


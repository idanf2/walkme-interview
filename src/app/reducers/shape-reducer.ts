import {ADD_SHAPE, ShapeActions, UPDATE_SHAPE, UPDATE_SHAPE_POSITION, UPDATE_SELECTED_SHAPE} from '../actions/shape-actions';
import {initialShapeState, IShapeState} from '../state/shape.state';
import {Shape} from '../models/shape';

export const shapeReducers = (state: IShapeState = initialShapeState, action: ShapeActions): IShapeState => {
  switch (action.type) {
    case ADD_SHAPE: {
      return {
        ...state,
        selectedShapeId: (action.payload as Shape).id,
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
      const payload = (action.payload as {id: string, position: {x: number, y: number}});
      const updatedPosition: {x: number, y: number} = payload.position;
      const oldShapeIndex: number = state.shapes.findIndex((shape) => shape.id === payload.id);

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
    case UPDATE_SELECTED_SHAPE: {
      if (action.payload) {
        return {...state, selectedShapeId: action.payload as string};
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
};


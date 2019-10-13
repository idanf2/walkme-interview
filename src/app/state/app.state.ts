import {initialShapeState, IShapeState} from './shape.state';

export interface IAppState {
  shapes: IShapeState;
}

export const initialAppState: IAppState = {
  shapes: initialShapeState
};

export function getInitialState(): IAppState {
  return initialAppState;
}

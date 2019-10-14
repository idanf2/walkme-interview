import {Component, Input} from '@angular/core';
import {Shape} from '../../models/shape';
import {Store} from '@ngrx/store';
import {IAppState} from '../../state/app.state';
import {UpdateShapeAction, UpdateShapePositionAction} from '../../actions/shape-actions';
import {Position} from '../../models/position';

@Component({
  selector: 'shape-style',
  templateUrl: './shape-style.component.html',
  styleUrls: ['./shape-style.component.css']
})
export class ShapeStyleComponent {
  @Input() selectedShape: Shape;
  constructor(private store: Store<IAppState>) { }

  changeColor(color) {
    this.store.dispatch(new UpdateShapeAction({...this.selectedShape, color}));
  }
  resize(event) {
    this.store.dispatch(new UpdateShapeAction({...this.selectedShape, resize: +event.target.value}));
  }
  changeOpacity(event) {
    this.store.dispatch(new UpdateShapeAction({...this.selectedShape, opacity: event.target.value / 100}));
  }
  changeBorderShown(event) {
    this.store.dispatch(new UpdateShapeAction({...this.selectedShape, isBorderShown: event.target.checked}));
  }

  changePosition(position: Position) {
    this.store.dispatch(new UpdateShapePositionAction({id: this.selectedShape.id, position}));
  }
}

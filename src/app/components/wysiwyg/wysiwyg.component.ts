import {Component, Input} from '@angular/core';
import {Shape} from '../../models/shape';
import {Store} from '@ngrx/store';
import {IAppState} from '../../state/app.state';
import {ResetShapesAction} from '../../actions/shape-actions';
import {ShapeManagerService} from '../../services/shape-manager.service';

@Component({
  selector: 'wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent {
  @Input() shapes: Shape[];
  @Input() selectedShape: Shape;

  constructor(private store: Store<IAppState>, private shapesManagerService: ShapeManagerService) {
  }

  clearShapes() {
    this.store.dispatch(new ResetShapesAction(true));
  }

  saveShapes() {
    this.shapesManagerService.saveShapes(this.shapes).then(() => {
      // User dialog saved shapes.
    });
  }
}

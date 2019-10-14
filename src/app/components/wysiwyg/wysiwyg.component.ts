import {Component, Input} from '@angular/core';
import {Shape} from '../../models/shape';
import {Store} from '@ngrx/store';
import {IAppState} from '../../state/app.state';
import {ResetShapesAction} from '../../actions/shape-actions';

@Component({
  selector: 'wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent {
  @Input() shapes: Shape[];
  @Input() selectedShape: Shape;

  constructor(private store: Store<IAppState>) { }

  clearShapes() {
    this.store.dispatch(new ResetShapesAction(true));
  }
}

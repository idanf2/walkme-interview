import {Component, Input, OnInit} from '@angular/core';
import {Shape} from '../../models/shape';
import {Store} from '@ngrx/store';
import {IAppState} from '../../state/app.state';
import {ResetShapesAction} from '../../actions/shape-actions';
import {ShapeManagerService} from '../../services/shape-manager.service';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent implements OnInit {
  shapes: Observable<Shape[]>;
  selectedShapeId: Observable<string>;
  selectedShape: Observable<Shape>;
  currentShapes: Shape[];

  constructor(private store: Store<IAppState>, private shapesManagerService: ShapeManagerService) {}

  ngOnInit(): void {
    this.shapes = this.store.select((state) => state.shapes.shapes);
    this.currentShapes = [];
    this.shapes.subscribe((shapes: Shape[]) => {
      this.currentShapes = shapes;
    });
    this.selectedShapeId = this.store.select((state) => state.shapes.selectedShapeId);

    const connectStream = combineLatest(this.shapes, this.selectedShapeId);
    this.selectedShape = connectStream.pipe(map((results) => {
      const shapes: Shape[] = results[0];
      const selectedShapeId: string = results[1];

      if (selectedShapeId) {
        return shapes.find(shape => shape.id === selectedShapeId);
      } else {
        return null;
      }
    }));

    this.selectedShape.subscribe(() => {

    });
  }

  clearShapes() {
    this.store.dispatch(new ResetShapesAction(true));
  }

  saveShapes() {
    this.shapesManagerService.saveShapes(this.currentShapes).then(() => {
      // User dialog saved shapes.
    });
  }
}

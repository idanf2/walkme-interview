import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {Shape} from '../models/shape';
import {IAppState} from '../state/app.state';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  shapes: Observable<Shape[]>;
  selectedShapeId: Observable<string>;
  selectedShape: Observable<Shape>;
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.shapes = this.store.select((state) => state.shapes.shapes);
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
}

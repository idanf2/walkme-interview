import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Shape} from '../models/shape';
import {IAppState} from '../state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'walkme-interview';
  shapes: Observable<Shape[]>;
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.shapes = this.store.select((state) => state.shapes.shapes);
  }
}

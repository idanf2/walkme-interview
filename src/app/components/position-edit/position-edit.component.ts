import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Shape} from '../../models/shape';
import {Position} from '../../models/position';

@Component({
  selector: 'position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['./position-edit.component.css']
})
export class PositionEditComponent {
  @Input() shape: Shape;
  @Input() longOrAlt: string;
  @Input() title: string;
  @Output() positionChanged: EventEmitter<Position>;

  constructor() {
    this.positionChanged = new EventEmitter();
  }

  changePosition(event) {
    const position = {...this.shape.position};
    position[this.longOrAlt] = event.target.value;
    this.positionChanged.emit(position);
  }
}

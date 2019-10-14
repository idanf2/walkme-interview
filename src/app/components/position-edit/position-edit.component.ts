import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Shape} from '../../models/shape';

@Component({
  selector: 'position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['./position-edit.component.css']
})
export class PositionEditComponent {
  @Input() shape: Shape;
  @Input() longOrAlt: string;
  @Input() title: string;
  @Output() positionChanged: EventEmitter<{ x: number, y: number }>;

  constructor() {
    this.positionChanged = new EventEmitter();
  }

  changePosition(event) {
    const position = {...this.shape.position};
    position[this.longOrAlt] = event.target.value;
    this.positionChanged.emit(position);
  }
}

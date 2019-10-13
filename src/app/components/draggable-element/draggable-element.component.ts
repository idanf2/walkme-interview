import {Component, Input} from '@angular/core';
import {ShapeType} from '../../enums/shape-type.enum';

@Component({
  selector: 'draggable-element',
  templateUrl: './draggable-element.component.html',
  styleUrls: ['./draggable-element.component.css']
})
export class DraggableElementComponent {
  @Input() shapeName: string;
  @Input() shapeType: ShapeType;
  private allShapeTypes: typeof ShapeType;

  constructor() {
    this.allShapeTypes = ShapeType;
  }
}

import { Component } from '@angular/core';
import {ShapeType} from '../../enums/shape-type.enum';

@Component({
  selector: 'elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.css']
})
export class ElementsListComponent {
  private allShapeTypes: typeof ShapeType;

  constructor() {
    this.allShapeTypes = ShapeType;
  }
}

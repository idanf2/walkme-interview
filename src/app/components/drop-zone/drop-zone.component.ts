import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Shape} from '../../models/shape';
import {ShapeType} from '../../enums/shape-type.enum';

@Component({
  selector: 'drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent implements OnChanges {
  @Input() shapes: Shape[];
  private allShapeTypes: typeof ShapeType;
  constructor() {
    this.allShapeTypes = ShapeType;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

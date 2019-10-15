import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Shape} from '../../models/shape';
import {ShapeType} from '../../enums/shape-type.enum';

@Component({
  selector: 'drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropZoneComponent {
  @Input() shapes: Shape[];
  private allShapeTypes: typeof ShapeType;

  constructor() {
    this.allShapeTypes = ShapeType;
  }
}

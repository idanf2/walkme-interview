import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Shape} from '../../models/shape';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent {
  @Input() selectedShape: Shape;
  constructor() { }
}

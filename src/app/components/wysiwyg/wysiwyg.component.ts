import {Component, Input} from '@angular/core';
import {Shape} from '../../models/shape';

@Component({
  selector: 'wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent {
  @Input() shapes: Shape[];
  constructor() { }
}

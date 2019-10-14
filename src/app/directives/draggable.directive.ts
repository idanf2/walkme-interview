import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {SVGService} from '../services/svg.service';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {
  @Input('shapeType') shapeType: string;

  constructor(private el: ElementRef, private svgService: SVGService) {
    this.el.nativeElement.setAttribute('draggable', true);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    const elementToBeDragged = event.target.getElementsByClassName('shape')[0];
    event.dataTransfer.setData('id', elementToBeDragged.id);
    event.dataTransfer.setData('offset', JSON.stringify(this.svgService.getOffset(elementToBeDragged, event)));
    event.dataTransfer.setData('type', this.shapeType);
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }
}

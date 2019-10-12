import { Directive, HostListener } from '@angular/core';
import {SVGService} from '../services/svg.service';
import * as uuid from 'uuid/v1';

@Directive({
  selector: '[droppable]'
})
export class DroppableDirective {
  private draggingElement: any;

  constructor(private svgService: SVGService) {}

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const dropzone = event.target;
    const originalElementId = event.dataTransfer.getData('text');
    const originalElement = document.getElementById(originalElementId) as any;
    const droppedElement = originalElement.cloneNode(true);
    droppedElement.id = uuid();
    dropzone.appendChild(droppedElement);

    droppedElement.setAttribute('draggable', true);

    const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
    this.setPosition(droppedElement, { x: svgPoint.x, y: svgPoint.y  });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.setPosition(this.draggingElement, { x: svgPoint.x, y: svgPoint.y  });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    this.draggingElement = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    this.draggingElement = null;
  }

  private setPosition(element, coord: { x, y }) {
    element.setAttribute('cx', coord.x);
    element.setAttribute('cy', coord.y);
  }
}

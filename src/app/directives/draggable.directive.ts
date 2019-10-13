import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {SVGService} from '../services/svg.service';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {
  @Input('shapeType') shapeType: string;
  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('draggable', true);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    const elementToBeDragged = event.target.getElementsByClassName('shape')[0];
    event.dataTransfer.setData('id', elementToBeDragged.id);
    event.dataTransfer.setData('offset', JSON.stringify(this.getOffset(elementToBeDragged, event)));
    event.dataTransfer.setData('type', this.shapeType);
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  getOffset(selectedElement, event): { x, y } {
    const offset = this.getMousePosition(event, selectedElement);
    // Get all the transforms currently on this element
    const transforms = selectedElement.transform.baseVal;
    // Ensure the first transform is a translate transform
    if (transforms.length === 0 ||
      transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      // Create an transform that translates by (0, 0)
      const translate = selectedElement.parentNode.createSVGTransform();
      translate.setTranslate(0, 0);
      // Add the translation to the front of the transforms list
      selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }
    // Get initial translation amount
    const transform = transforms.getItem(0);
    offset.x -= transform.matrix.e;
    offset.y -= transform.matrix.f;

    return offset;
  }

  getMousePosition(evt, svg) {
    const CTM = svg.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }
}

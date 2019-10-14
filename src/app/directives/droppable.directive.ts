import {Directive, HostListener} from '@angular/core';
import {SVGService} from '../services/svg.service';
import * as uuid from 'uuid/v1';
import {Shape} from '../models/shape';
import {Store} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {AddShapeAction, UpdateSelectedShapeAction, UpdateShapePositionAction} from '../actions/shape-actions';

@Directive({
  selector: '[droppable]'
})
export class DroppableDirective {
  private draggingElement: any;
  private offset: any;

  constructor(private svgService: SVGService, private store: Store<IAppState>) {
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const dropzone = event.target;
    const originalElementId = event.dataTransfer.getData('id');
    const type = event.dataTransfer.getData('type');
    const offset = JSON.parse(event.dataTransfer.getData('offset'));
    const originalElement = document.getElementById(originalElementId) as any;
    const droppedElement = originalElement.cloneNode(true);
    droppedElement.setAttribute('draggable', true);
    droppedElement.id = uuid();
    dropzone.appendChild(droppedElement);
    const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
    dropzone.removeChild(droppedElement);
    const position = this.getPosition({x: svgPoint.x, y: svgPoint.y}, offset);
    const newShape: Shape = {
      id: droppedElement.id,
      type,
      position,
      color: 'black',
      opacity: 1,
      isBorderShown: false,
      resize: 1
    };

    this.store.dispatch(new AddShapeAction(newShape));
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.setPosition(this.draggingElement, {x: svgPoint.x, y: svgPoint.y}, this.offset);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
      this.offset = this.getOffset(this.draggingElement, event);
      this.store.dispatch(new UpdateSelectedShapeAction(this.draggingElement.id));
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    if (event.target.getAttribute('draggable')) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      const position: { x: number, y: number } = this.getPosition({x: svgPoint.x, y: svgPoint.y}, this.offset);
      this.store.dispatch(new UpdateShapePositionAction({id: this.draggingElement.id, position}));
    }
    this.draggingElement = null;
    this.offset = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    if (event.target.getAttribute('draggable')) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      const position: { x: number, y: number } = this.getPosition({x: svgPoint.x, y: svgPoint.y}, this.offset);
      this.store.dispatch(new UpdateShapePositionAction({id: this.draggingElement.id, position}));
    }
    this.draggingElement = null;
    this.offset = null;
  }

  private setPosition(element, coord: { x, y }, offset?: { x, y }) {
    // element.setAttribute('transform', `translate(${coord.x - offset.x},${coord.y - offset.y})`);
    const transforms = element.transform.baseVal;
    if (transforms.length === 0 ||
      transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      const translate = element.parentNode.createSVGTransform();
      translate.setTranslate(coord.x - offset.x, coord.y - offset.y);
      element.transform.baseVal.insertItemBefore(translate, 0);
    } else if (transforms.length !== 0) {
      transforms.getItem(0).setTranslate(coord.x - offset.x, coord.y - offset.y);
    }
  }

  private getPosition(coord: { x, y }, offset: { x, y }): { x: number, y: number } {
    return {x: coord.x - offset.x, y: coord.y - offset.y};
  }

  getOffset(selectedElement, event): { x, y } {
    const offset = this.svgService.getSVGPoint(event, selectedElement);
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
}

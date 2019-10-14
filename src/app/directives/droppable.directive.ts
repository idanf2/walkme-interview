import {Directive, HostListener} from '@angular/core';
import {SVGService} from '../services/svg.service';
import * as uuid from 'uuid/v1';
import {getDefaultShape} from '../models/shape';
import {Store} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {AddShapeAction, UpdateSelectedShapeAction, UpdateShapePositionAction} from '../actions/shape-actions';
import {Position} from '../models/position';

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
    const originalElementId: string = event.dataTransfer.getData('id');
    const shapeType: string = event.dataTransfer.getData('type');
    const offset: Position = JSON.parse(event.dataTransfer.getData('offset'));
    const originalElement = document.getElementById(originalElementId) as any;
    const droppedElement = originalElement.cloneNode(true);
    droppedElement.setAttribute('draggable', true);
    this.createNewShape(droppedElement, event.target, event, offset, shapeType);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.svgService.setPosition(this.draggingElement, {x: svgPoint.x, y: svgPoint.y}, this.offset);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
      this.offset = this.svgService.getOffset(this.draggingElement, event);
      this.store.dispatch(new UpdateSelectedShapeAction(this.draggingElement.id));
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    this.updatePositionAndDetach(event);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    this.updatePositionAndDetach(event);
  }

  private createNewShape(droppedElement, dropZone, event, offset, shapeType): void {
    // Generate unique id
    droppedElement.id = uuid();

    // Append to the dom and remove to knwo the position in the svg
    dropZone.appendChild(droppedElement);
    const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
    dropZone.removeChild(droppedElement);
    const position = this.getPositionWithOffset(svgPoint, offset);

    this.store.dispatch(new AddShapeAction(getDefaultShape(droppedElement.id, shapeType, position)));
  }

  private updatePositionAndDetach(event) {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      const position: Position = this.getPositionWithOffset(svgPoint, this.offset);
      this.store.dispatch(new UpdateShapePositionAction({id: this.draggingElement.id, position}));
    }

    this.draggingElement = null;
    this.offset = null;
  }

  private getPositionWithOffset(coordinates: Position, offset: Position): Position {
    return {x: coordinates.x - offset.x, y: coordinates.y - offset.y};
  }
}

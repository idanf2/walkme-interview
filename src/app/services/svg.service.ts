import {Injectable} from '@angular/core';
import {Position} from '../models/position';

@Injectable()
export class SVGService {
  constructor() {
  }

  getSVGPoint(event, element): Position {
    const CTM = element.viewportElement.getScreenCTM();
    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d
    };
  }

  getOffset(selectedElement, event): Position {
    const offset = this.getSVGPoint(event, selectedElement);
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

  setPosition(element, coord: Position, offset: Position) {
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
}

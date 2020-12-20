import {Injectable} from '@angular/core';

@Injectable()
export class MdlTooltipPositionService {

  public calcStyle(offsetWidth: number, offsetHeight: number, props: ClientRect, position: string): { [propName: string]: unknown } {

    const result: { [propName: string]: unknown } = {};
    const left = props.left + (props.width / 2);
    const top = props.top + (props.height / 2);
    const marginLeft = -1 * (offsetWidth / 2);
    const marginTop = -1 * (offsetHeight / 2);

    if (position === 'left' || position === 'right') {
      if (top + marginTop < 0) {
        result.top = '0';
        result.marginTop = '0';
      } else {
        result.top = top + 'px';
        result.marginTop = marginTop + 'px';
      }
    } else {
      if (left + marginLeft < 0) {
        result.left = '0';
        result.marginLeft = '0';
      } else {
        result.left = left + 'px';
        result.marginLeft = marginLeft + 'px';
      }
    }

    if (position === 'top') {
      result.top = props.top - offsetHeight - 10 + 'px';
    } else if (position === 'right') {
      result.left = props.left + props.width + 10 + 'px';
    } else if (position === 'left') {
      result.left = props.left - offsetWidth - 10 + 'px';
    } else {
      result.top = props.top + props.height + 10 + 'px';
    }

    return result;
  }
}

import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEntryMetadata // needs to be here to avoid compilation errors:(
} from '@angular/core';

export const flyInOutTrigger = trigger('flyInOut', [
  state('*', style({})),
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate(300)
  ]),
  transition(':leave', animate(300, style({transform: 'translateX(100%)'})))
]);

export const hostConfig: {[key: string]: string} = {
  '[@flyInOut]': 'true',
  '[style.display]': "'block'"
};

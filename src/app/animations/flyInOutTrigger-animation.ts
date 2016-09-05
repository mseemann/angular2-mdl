import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEntryMetadata // needs to be here to avoid compilation errors:(
} from '@angular/core';

export const flyInOutTrigger = trigger('flyInOut', [
  state('*', style({transform: 'translateX(0)', opacity: 1})),
  transition('void => *', [
    style({transform: 'translateX(-100%)', opacity: 0}),
    animate(300)
  ]),
  transition('* => void', animate(300, style({transform: 'translateX(100%)', opacity: 0})))
]);

export const hostConfig: {[key: string]: string} = {
  '[@flyInOut]': 'true',
  '[style.display]': "'block'"
};

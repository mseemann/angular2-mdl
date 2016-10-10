import {
  Component,
  ViewEncapsulation,
  ViewContainerRef, Directive, TemplateRef, Inject, forwardRef, ViewChild
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  state
} from '@angular/core';

import {
  MIN_DIALOG_Z_INDEX, MdlDialogService
} from './mdl-dialog.service';
import { selector } from 'rxjs/operator/publish';


// @experimental
@Component({
  selector: 'mdl-dialog-host-component',
  host: {
    '[class.mdl-dialog]': 'true',
    '[class.open]': 'true',
    '[class.fixed]': 'true',
    '[style.zIndex]': 'zIndex',
    '[@flyInOut]': 'animateState'
  },
  animations: [
    trigger('flyInOut', [
      transition('void => animate', [
        style({
          // the animation behaves different with native animate and polyfill :(((
          //transform: 'translate(0, -70%)',
          opacity: 0.4
        }),
        animate(200)
      ]),
      transition('animate => void', animate(150, style({
        transform: 'translate(0, -30%)',
        opacity: 0
      })))
    ])
  ],
  template: `<div #dialogTarget></div>`,
  styles: [
    `
    mdl-dialog-host-component {
      position: absolute;
      left: 0; right: 0;
      width: -moz-fit-content;
      width: -webkit-fit-content;
      width: fit-content;
      height: -moz-fit-content;
      height: -webkit-fit-content;
      height: fit-content;
      margin: auto;
      border: solid;
      padding: 1em;
      background: white;
      color: black;
      display: none;
      z-index: 1;
      opacity: 1;
    }
    
    mdl-dialog-host-component.open {
      display: block;
    }
    
    mdl-dialog-host-component.fixed {
      position: fixed;
      top: 50%;
      transform: translate(0, -50%);
    }

    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class MdlDialogHostComponent {

  @ViewChild('dialogTarget', {read: ViewContainerRef}) public dialogTarget;

  public zIndex: number = MIN_DIALOG_Z_INDEX + 1;

  get animateState(){
    return this.animate ? 'animate' : '';
  }
  // open for later extensions - animate or not
  public animate = true;

}

import {
  Component,
  ViewEncapsulation,
  ViewContainerRef, Directive, TemplateRef, Inject, forwardRef, ViewChild, HostBinding, Renderer, ElementRef, OnInit
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  state
} from '@angular/core';

import {
  MIN_DIALOG_Z_INDEX, MdlDialogService, MDL_CONFIGUARTION
} from './mdl-dialog.service';
import { selector } from 'rxjs/operator/publish';
import { IMdlDialogConfiguration } from './mdl-dialog-configuration';


// @experimental
@Component({
  selector: 'mdl-dialog-host-component',
  host: {
    '[class]': 'classes',
    '[class.mdl-dialog]': 'true',
    '[class.open]': 'true',
    '[class.fixed]': 'true',
    '[style.zIndex]': 'zIndex',
    '[@flyInOut]': 'animateState',
    '(@flyInOut.start)': 'animationStarted($event)',
    '(@flyInOut.done)': 'animationDone($event)'
  },
  animations: [
    trigger('flyInOut', [
      transition('void => animate', [
        style({
          top: '38%',
          opacity: 0.9
        }),
        animate(200)
      ]),
      transition('animate => void', animate(150, style({
        top: '63%',
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
export class MdlDialogHostComponent implements OnInit {

  @ViewChild('dialogTarget', {read: ViewContainerRef}) public dialogTarget;

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) private config: IMdlDialogConfiguration){
  }

  public zIndex: number = MIN_DIALOG_Z_INDEX + 1;

  get animateState(){
    // not present assume it is true.
    if (!this.config.animate){
      return 'animate'
    }
    return this.config.animate ? 'animate' : '';
  }

  get classes() {
    return this.config.classes ? this.config.classes : ''
  }


  public animationStarted($event){
    // something like
    // {fromState: "void", toState: "animate", totalTime: 200}
    // {fromState: "animate", toState: "void", totalTime: 150}
  }

  public animationDone($event){}


  public ngOnInit() {
    // apply the styles
    let styles = this.config.styles;
    if (styles) {
      for (let style in styles){
        this.renderer.setElementStyle(this.elementRef.nativeElement, style, styles[style]);
      }
    }
  }

}

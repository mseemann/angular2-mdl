import {
  Component,
  ViewEncapsulation,
  ViewContainerRef,
  Inject,
  forwardRef,
  ViewChild,
  Renderer,
  ElementRef,
  OnInit
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  state
} from '@angular/core';

import {
  MIN_DIALOG_Z_INDEX, MDL_CONFIGUARTION
} from './mdl-dialog.service';
import { IMdlDialogConfiguration } from './mdl-dialog-configuration';

const enterTransitionDuration = 300;
const leaveTransitionDuration = 300;

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
      transition('void => animate', animate(enterTransitionDuration)),
      transition('animate => void', animate(leaveTransitionDuration))
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
      transition-property: top opacity transform;
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

  private beforeShowStyles = {
    opacity: '0.8',
    top: '38%',
    //transform: 'translate(0, -50%) scale(0.5, 0.5)'
    transform: 'translate(0, -50%)',
    transitionDuration: `${enterTransitionDuration/1000}s`
  };

  private showAnimationEndStyle = {
    transitionTimingFunction: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    top: '50%',
    opacity: '1',
    transform: 'translate(0px, -50%) scale(1.0, 1.0)',
  };

  private beforeAnimationEndStyles = {
    transitionDuration: `${leaveTransitionDuration/1000}s`
  };

  private hideAnimationEndStyles = {
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 1, 1)',
    top: '63%',
    opacity: '0',
    //transform: 'scale(0.5, 0.5)'
  };

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) private config: IMdlDialogConfiguration){

  }

  public zIndex: number = MIN_DIALOG_Z_INDEX + 1;

  get animateState(){
    // not present assume it is true.
    if (typeof this.config.animate === 'undefined'){
      return 'animate'
    }
    return this.config.animate ? 'animate' : '';
  }

  get classes() {
    return this.config.classes ? this.config.classes : ''
  }


  public animationStarted($event){
    console.log('start', $event);
    if ($event.fromState === 'void' && $event.toState == 'animate'){
      setTimeout( ()=> { this.applyStyle(this.showAnimationEndStyle);})
    }

    if ($event.fromState === 'animate' && $event.toState == 'void'){
      setTimeout( ()=> { this.applyStyle(this.hideAnimationEndStyles); });
    }
  }

  public animationDone($event){
    if ($event.fromState === 'void' && $event.toState == 'animate'){
      setTimeout( ()=> { this.applyStyle(this.beforeAnimationEndStyles) })
    }
  }


  public ngOnInit() {

    this.applyStyle(this.config.styles);

    this.applyStyle(this.beforeShowStyles);
  }

  private applyStyle(styles: {[key: string]: string}) {
    if (styles) {
      for (let style in styles){
        this.renderer.setElementStyle(this.elementRef.nativeElement, style, styles[style]);
      }
    }
  }
}

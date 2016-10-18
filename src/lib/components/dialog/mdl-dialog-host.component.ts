import {
  Component,
  ViewEncapsulation,
  ViewContainerRef,
  Inject,
  forwardRef,
  ViewChild,
  Renderer,
  ElementRef,
  OnInit,
  AnimationTransitionEvent, ComponentRef
} from '@angular/core';

import {
  MIN_DIALOG_Z_INDEX,
  MDL_CONFIGUARTION
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
    '[class.open]': 'visible',
    '[style.zIndex]': 'zIndex',
  },
  template: `<div #dialogTarget></div>`,
  styles: [
    `
    mdl-dialog-host-component {
      left: 0; right: 0;
      width: -moz-fit-content;
      width: -webkit-fit-content;
      width: fit-content;
      height: -moz-fit-content;
      height: -webkit-fit-content;
      height: fit-content;
      margin: auto;
      padding: 1em;
      background: white;
      color: black;
      opacity: 1;
      visibility: hidden;
      display: block;
      position: fixed;
      top: 50%;
      transform: translate(0, -50%);
    }
    
    mdl-dialog-host-component.open {
      visibility: visible;
    }
    
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class MdlDialogHostComponent implements OnInit {

  @ViewChild('dialogTarget', {read: ViewContainerRef}) public dialogTarget;

  public visible = false;

  private beforeShowStyles = {
    opacity: '0.8',
    visibility: 'visible'
  };

  private beforeShowDefaultPosition = {
    top: '38%',
    transform: 'translate(0, -50%)'
  }

  private showAnimationEndStyle = {
    transitionTimingFunction: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    top: '50%',
    opacity: '1',
    transform: 'translate(0px, -50%) scale(1.0, 1.0)',
    transitionDuration: `${enterTransitionDuration/1000}s`
  };

  private hideAnimationEndStyles = {
    transitionDuration: `${leaveTransitionDuration/1000}s`,
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 1, 1)',
    top: '63%',
    opacity: '0'
  };

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) private config: IMdlDialogConfiguration){

  }

  public zIndex: number = MIN_DIALOG_Z_INDEX + 1;

  get classes() {
    return this.config.classes ? this.config.classes : ''
  }


  public show() {

    if (this.isAnimateEnabled()){
      if (this.config.openFrom){
        const evt: MouseEvent = this.config.openFrom as MouseEvent;
        console.log(evt.srcElement.getBoundingClientRect());
        console.log(this.elementRef.nativeElement.getBoundingClientRect());
      }

      this.applyStyle(this.beforeShowStyles);
      this.applyStyle(this.beforeShowDefaultPosition);

      setTimeout( ()=> {
        this.applyStyle(this.showAnimationEndStyle);
      })
    } else {
      this.visible = true;
    }
  }

  public hide(selfComponentRef: ComponentRef<MdlDialogHostComponent>){
    if (this.isAnimateEnabled()){
      let l = this.renderer.listen(this.elementRef.nativeElement, 'transitionend', (e) => {
        if(e.target === this.elementRef.nativeElement){
          l();
          selfComponentRef.destroy();
        }
      });
      setTimeout(()=> {
        this.applyStyle(this.hideAnimationEndStyles);
      });
    } else {
      selfComponentRef.destroy();
    }
  }

  public ngOnInit() {
    this.applyStyle(this.config.styles);
  }

  private applyStyle(styles: {[key: string]: string}) {
    if (styles) {
      for (let style in styles){
        this.renderer.setElementStyle(this.elementRef.nativeElement, style, styles[style]);
      }
    }
  }

  private isAnimateEnabled() {
   // not present?  assume it is true.
    if (typeof this.config.animate === 'undefined'){
      return true;
    }
    return this.config.animate;
  }
}

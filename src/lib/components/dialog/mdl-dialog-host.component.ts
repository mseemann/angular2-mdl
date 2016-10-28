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
  ComponentRef,
  NgZone
} from '@angular/core';

import {
  MIN_DIALOG_Z_INDEX,
  MDL_CONFIGUARTION
} from './mdl-dialog.service';
import { IMdlDialogConfiguration } from './mdl-dialog-configuration';
import { MdlButtonComponent } from '../button/mdl-button.component';
import { InternalMdlDialogReference } from './internal-dialog-reference';

const enterTransitionDuration = 300;
const leaveTransitionDuration = 250;

// @experimental
@Component({
  selector: 'mdl-dialog-host-component',
  host: {
    '[class.mdl-dialog]': 'true',
    '[class.open]': 'visible',
    '[style.zIndex]': 'zIndex',
  },
  template: `<div #dialogTarget></div>`,
  styles: [
    `
    mdl-dialog-host-component {
      width: -moz-fit-content;
      width: -webkit-fit-content;
      width: fit-content;
      height: -moz-fit-content;
      height: -webkit-fit-content;
      height: fit-content;
      padding: 1em;
      background: white;
      color: black;
      opacity: 1;
      visibility: hidden;
      display: block;
      position: fixed;
      margin: auto;
      left: 0;
      right: 0;
      transition: all;
      top: 50%;
      transform: translate(0, -50%) scale(1.0);
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

  private beforeShowDefaultPosition: {[key: string]: string} = {
    top: '38%',
    opacity: '0',
    visibility: 'visible',
    transform: 'translate(0, -50%)',
  }

  private showAnimationEndStyle: {[key: string]: string} = {
    top: '50%',
    opacity: '1',
    visibility: 'visible',
    transform: 'translate(0, -50%) scale(1.0)'
  };

  private hideAnimationEndStyles:  {[key: string]: string} = {
    top: '50%',
    opacity: '0',
    visibility: 'visible',
    transform: 'translate(0, -50%) scale(1.0)'
  };

  private hideAnimationEndPosition: {[key: string]: string} = {
    top: '63%',
    opacity: '0',
    visibility: 'visible',
    transform: 'translate(0, -50%) scale(1.0)'
  }

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer,
    private elementRef: ElementRef,
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) private config: IMdlDialogConfiguration,
    private internalDialogRef: InternalMdlDialogReference){
  }

  public zIndex: number = MIN_DIALOG_Z_INDEX + 1;

  public show() {

    if (!this.isAnimateEnabled()) {
      this.visible = true;
      // give the dialogs time to draw so that a focus can be set
      setTimeout( () => {
        this.internalDialogRef.visible();
      })

    } else {
      if (this.config.openFrom || this.config.closeTo) {

        const targetClientRect = this.elementRef.nativeElement.getBoundingClientRect();

        const openFromRect = this.getClientRect(this.config.openFrom);
        const closeToRect = this.config.closeTo ? this.getClientRect(this.config.closeTo) : openFromRect;

        const centerTarget = this.getCenterInScreen(targetClientRect);
        const centerFrom = this.getCenterInScreen(openFromRect);

        const translationFrom = {
          x: Math.round(centerFrom.cx - centerTarget.cx),
          y: Math.round(centerFrom.cy - centerTarget.cy),
          scaleX: Math.round(100 * Math.min(0.25, openFromRect.width / targetClientRect.width)) / 100,
          scaleY: Math.round(100 * Math.min(0.25, openFromRect.height / targetClientRect.height)) / 100
        }

        this.beforeShowDefaultPosition = {
          top: `${targetClientRect.top}px`,
          opacity: '0',
          visibility: 'visible',
          transform: `translate(${translationFrom.x}px, ${translationFrom.y}px) scale(${translationFrom.scaleX}, ${translationFrom.scaleY})`
        }
        // openfrom = closeTo
        this.hideAnimationEndPosition = this.beforeShowDefaultPosition;
      }

      var animation = this.elementRef.nativeElement.animate([
        this.beforeShowDefaultPosition,
        this.showAnimationEndStyle
      ], {
        fill: 'forwards',
        easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        duration: enterTransitionDuration,
      });

      animation.onfinish = ()=>{
        this.ngZone.run( () => {
          this.visible = true;
        });
      };

      this.internalDialogRef.visible();


      // let player = this.animator.animate(this.elementRef.nativeElement, {styles: []}, [kf], 10000, 0, 'cubic-bezier(0.0, 0.0, 0.2, 1)');
      //   player.onStart(() => {
      //     console.log('start');
      //   })
      //   player.onDone(() => {
      //     console.log('done');
      //     this.applyStyle(this.showAnimationEndStyle);
      //     this.internalDialogRef.visible();
      //   })
      // player.play();
    }
  }

  public hide(selfComponentRef: ComponentRef<MdlDialogHostComponent>){
    if (this.isAnimateEnabled()){
      var animation = this.elementRef.nativeElement.animate([
        this.showAnimationEndStyle,
        this.hideAnimationEndPosition
      ], {
        fill: 'forwards',
        easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        duration: leaveTransitionDuration,
      });

      animation.onfinish = ()=>{
        this.ngZone.run( () => {
          selfComponentRef.destroy();
        });
      };

    } else {
      selfComponentRef.destroy();
    }
  }

  public ngOnInit() {
    this.applyStyle(this.config.styles);
    this.applyClasses(this.config.classes ? this.config.classes : '');
  }

  private applyStyle(styles: {[key: string]: string}) {
    if (styles) {
      for (let style in styles){
        this.renderer.setElementStyle(this.elementRef.nativeElement, style, styles[style]);
      }
    }
  }

  private applyClasses(classes: string){
    classes.split(' ').filter( (cssClass) => { return !!cssClass }).forEach( ( cssClass )=> {
      this.renderer.setElementClass(this.elementRef.nativeElement, cssClass, true);
    });
  }

  private isAnimateEnabled() {
   // not present?  assume it is true.
    if (typeof this.config.animate === 'undefined'){
      return true;
    }
    return this.config.animate;
  }

  private getClientRect(input: MdlButtonComponent | MouseEvent): ClientRect {

    if(input instanceof MdlButtonComponent){

      const elRef = (this.config.openFrom as MdlButtonComponent).elementRef;
      return elRef.nativeElement.getBoundingClientRect();

    } else if(input instanceof MouseEvent){

      const evt: MouseEvent = this.config.openFrom as MouseEvent;
      return (evt.target as HTMLElement).getBoundingClientRect();

    }

    return null;
  }

  private getCenterInScreen(rect: ClientRect) {
    if (!rect){
      return {cx:0, cy:0};
    }
    return {
      cx: Math.round(rect.left + (rect.width / 2)),
      cy: Math.round(rect.top + (rect.height / 2))
    };
  }


}

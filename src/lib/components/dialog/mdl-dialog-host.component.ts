import {
  Component,
  ViewEncapsulation,
  ViewContainerRef,
  Inject,
  forwardRef,
  ViewChild,
  ElementRef,
  OnInit,
  ComponentRef,
  NgZone, Renderer2
} from '@angular/core';

import {
  MIN_DIALOG_Z_INDEX,
  MDL_CONFIGUARTION
} from './mdl-dialog.service';
import { IMdlDialogConfiguration, IOpenCloseRect } from './mdl-dialog-configuration';
import { MdlButtonComponent } from '../button/mdl-button.component';
import { InternalMdlDialogReference } from './internal-dialog-reference';
import { Animations } from '../common/animations';

const enterTransitionDuration = 300;
const leaveTransitionDuration = 250;

const enterTransitionEasingCurve = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
const leaveTransitionEasingCurve = 'cubic-bezier(0.0, 0.0, 0.2, 1)';

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

  private showAnimationStartStyle: {[key: string]: string} = {
    top: '38%',
    opacity: '0'
  };

  private showStyle: {[key: string]: string} = {
    top: '50%',
    opacity: '1'
  };

  private hideAnimationEndStyle: {[key: string]: string} = {
    top: '63%',
    opacity: '0'
  };

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private animations: Animations,
    private elementRef: ElementRef,
    @Inject(forwardRef( () => MDL_CONFIGUARTION)) private config: IMdlDialogConfiguration,
    private internalDialogRef: InternalMdlDialogReference){
  }

  public zIndex: number = MIN_DIALOG_Z_INDEX + 1;

  public show() {

    this.visible = true;
    // give the dialogs time to draw so that a focus can be set
    setTimeout( () => {
      this.internalDialogRef.visible();
    });

    if (this.isAnimateEnabled()) {
      if (this.config.openFrom || this.config.closeTo) {

        // transform is modified during anmiation and must be part of each animation keyframe.
        this.showStyle['transform'] = 'translate(0, -50%) scale(1.0)';

        const targetClientRect = this.elementRef.nativeElement.getBoundingClientRect();

        const openFromRect = this.getClientRect(this.config.openFrom);
        const closeToRect = this.config.closeTo ? this.getClientRect(this.config.closeTo) : openFromRect;

        const centerTarget = this.getCenterInScreen(targetClientRect);
        const centerFrom = this.getCenterInScreen(openFromRect);
        const centerTo = this.getCenterInScreen(closeToRect);

        const translationFrom = {
          x: Math.round(centerFrom.cx - centerTarget.cx),
          y: Math.round(centerFrom.cy - centerTarget.cy),
          scaleX: Math.round(100 * Math.min(0.25, openFromRect.width / targetClientRect.width)) / 100,
          scaleY: Math.round(100 * Math.min(0.25, openFromRect.height / targetClientRect.height)) / 100
        };

        this.showAnimationStartStyle = {
          top: `${targetClientRect.top}px`,
          opacity: '0',
          transform: `translate(${translationFrom.x}px, ${translationFrom.y}px) scale(${translationFrom.scaleX}, ${translationFrom.scaleY})`
        };

        const translationTo = {
          x: Math.round(centerTo.cx - centerTarget.cx),
          y: Math.round(centerTo.cy - centerTarget.cy),
          scaleX: Math.round(100 * Math.min(0.25, closeToRect.width / targetClientRect.width)) / 100,
          scaleY: Math.round(100 * Math.min(0.25, closeToRect.height / targetClientRect.height)) / 100
        };

        this.hideAnimationEndStyle  = {
          top: `${targetClientRect.top}px`,
          opacity: '0',
          transform: `translate(${translationTo.x}px, ${translationTo.y}px) scale(${translationTo.scaleX}, ${translationTo.scaleY})`
        }
      }


      let animation: any = this.animations.animate(
        this.elementRef.nativeElement,
        [
          this.showAnimationStartStyle,
          this.showStyle
        ],
        this.config.enterTransitionDuration || enterTransitionDuration,
        this.config.enterTransitionEasingCurve || enterTransitionEasingCurve);

      animation.play();

    }
  }

  public hide(selfComponentRef: ComponentRef<MdlDialogHostComponent>){
    if (this.isAnimateEnabled()){

      let animation: any = this.animations.animate(
        this.elementRef.nativeElement,
        [
          this.showStyle,
          this.hideAnimationEndStyle
        ],
        this.config.leaveTransitionDuration || leaveTransitionDuration,
        this.config.leaveTransitionEasingCurve || leaveTransitionEasingCurve);

      animation.onDone( () => {
        this.ngZone.run( () => {
          selfComponentRef.destroy();
        });
      });

      animation.play();

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
        this.renderer.setStyle(this.elementRef.nativeElement, style, styles[style]);
      }
    }
  }

  private applyClasses(classes: string){
    classes.split(' ').filter( (cssClass) => { return !!cssClass }).forEach( ( cssClass )=> {
      this.renderer.addClass(this.elementRef.nativeElement, cssClass);
    });
  }

  private isAnimateEnabled() {
   // not present?  assume it is true.
    if (typeof this.config.animate === 'undefined'){
      return true;
    }
    return this.config.animate;
  }

  private getClientRect(input: MdlButtonComponent | MouseEvent | IOpenCloseRect): IOpenCloseRect {

    if(input instanceof MdlButtonComponent){

      const elRef = (input as MdlButtonComponent).elementRef;
      const rect: ClientRect = elRef.nativeElement.getBoundingClientRect();
      return this.createOpenCloseRect(rect);

    } else if (input instanceof MouseEvent) {

      const evt: MouseEvent = input as MouseEvent;
      // just to make it possible to test this code with a fake event - target is
      // readonly and con not be mutated.
      const htmlElement = (evt.target || evt['testtarget']) as HTMLElement;
      const rect: ClientRect = htmlElement.getBoundingClientRect();
      return this.createOpenCloseRect(rect);

    }
    return input as IOpenCloseRect;
  }

  private createOpenCloseRect(rect: ClientRect) : IOpenCloseRect {
    return {
      height: rect.top - rect.bottom,
      left: rect.left,
      top: rect.top,
      width: rect.right-rect.left
    }
  }

  private getCenterInScreen(rect: IOpenCloseRect) {
    return {
      cx: Math.round(rect.left + (rect.width / 2)),
      cy: Math.round(rect.top + (rect.height / 2))
    };
  }


}

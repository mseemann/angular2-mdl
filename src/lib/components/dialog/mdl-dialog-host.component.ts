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
import { IMdlDialogConfiguration, IOpenCloseRect } from './mdl-dialog-configuration';
import { MdlButtonComponent } from '../button/mdl-button.component';
import { InternalMdlDialogReference } from './internal-dialog-reference';

const enterTransitionDuration = 300;
const leaveTransitionDuration = 250;

// helper defintions - these classes are private in angular
// but render.animate is public and uses theese defintions

declare abstract class AnimationPlayer {
  abstract onDone(fn: () => void): void;
  abstract onStart(fn: () => void): void;
  abstract init(): void;
  abstract hasStarted(): boolean;
  abstract play(): void;
  abstract pause(): void;
  abstract restart(): void;
  abstract finish(): void;
  abstract destroy(): void;
  abstract reset(): void;
  abstract setPosition(p: any): void;
  abstract getPosition(): number;
  parentPlayer: AnimationPlayer;
}

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
    opacity: '0',
    visibility: 'visible'
  }

  private showStyle: {[key: string]: string} = {
    top: '50%',
    opacity: '1',
    visibility: 'visible'
  };

  private hideAnimationEndStyle: {[key: string]: string} = {
    top: '63%',
    opacity: '0',
    visibility: 'visible'
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
        }

        this.showAnimationStartStyle = {
          top: `${targetClientRect.top}px`,
          opacity: '0',
          visibility: 'visible',
          transform: `translate(${translationFrom.x}px, ${translationFrom.y}px) scale(${translationFrom.scaleX}, ${translationFrom.scaleY})`
        }

        const translationTo = {
          x: Math.round(centerTo.cx - centerTarget.cx),
          y: Math.round(centerTo.cy - centerTarget.cy),
          scaleX: Math.round(100 * Math.min(0.25, closeToRect.width / targetClientRect.width)) / 100,
          scaleY: Math.round(100 * Math.min(0.25, closeToRect.height / targetClientRect.height)) / 100
        }

        this.hideAnimationEndStyle  = {
          top: `${targetClientRect.top}px`,
          opacity: '0',
          visibility: 'visible',
          transform: `translate(${translationTo.x}px, ${translationTo.y}px) scale(${translationTo.scaleX}, ${translationTo.scaleY})`
        }
      }

      let animation: AnimationPlayer = this.renderer.animate(
        this.elementRef.nativeElement, null,
        [
          {offset:0, styles: { styles: [this.showAnimationStartStyle]}},
          {offset:1, styles: { styles: [this.showStyle]}}
        ],
        enterTransitionDuration, 0, 'cubic-bezier(0.0, 0.0, 0.2, 1)');

      animation.onDone( () => {
        this.ngZone.run( () => {
          this.visible = true;
        });
      });

      animation.play();

      this.internalDialogRef.visible();

    }
  }

  public hide(selfComponentRef: ComponentRef<MdlDialogHostComponent>){
    if (this.isAnimateEnabled()){

      let animation: AnimationPlayer = this.renderer.animate(
        this.elementRef.nativeElement, null,
        [
          {offset:0, styles: { styles: [this.showStyle]}},
          {offset:1, styles: { styles: [this.hideAnimationEndStyle]}}
        ],
        leaveTransitionDuration, 0, 'cubic-bezier(0.0, 0.0, 0.2, 1)');

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

import {
  Component,
  Injectable,
  ElementRef,
  DynamicComponentLoader,
  ComponentResolver,
  Injector,
  ViewContainerRef
} from '@angular/core';


const ANIMATION_TIME = 250;

@Component({
  selector:'mdl-snackbar-component',
  template: `
    <div id="demo-toast-example" class=" mdl-snackbar" [ngClass]="{'mdl-snackbar--active': showIt }">
      <div class="mdl-snackbar__text">{{message}}</div>
      <button *ngIf="onAction" class="mdl-snackbar__action" type="button" (click)="onClick()" >{{actionText}}</button>
    </div>
  `
})
export class MdlSnackbarComponent{
  message:string;
  actionText:string;
  private showIt = false;
  onAction:() => void;

  onClick(){
    this.onAction();
  }

  isActive(){
    return this.showIt;
  }

  show():Promise<void>{

    return new Promise<void>((resolve, reject) => {
      // wait unit the dom is in place - then showIt will change the css class
      setTimeout(()=>{
        this.showIt = true;
        // fire after the view animation is done
        setTimeout(()=>{
          resolve();
        }, ANIMATION_TIME)
      }, 1);
    });

  }

  hide():Promise<void>{
    this.showIt = false;
    return new Promise<void>(function(resolve, reject) {
      // fire after the view animation is done
      setTimeout(()=>{
        resolve();
      }, ANIMATION_TIME)
    });
  }
}

export interface IMdlSnackbarMessage {
  message:string;
  timeout?:number;
  actionHandler?:() => void;
  actionText?:string;
  vcRef?:ViewContainerRef;
}

@Injectable()
export class MdlSnackbarService {

  private defaultViewContainerRef:ViewContainerRef;
  constructor(
    private componentResolver: ComponentResolver,
    private injector:Injector,
    private dynamicComponentLoader:DynamicComponentLoader){
  }

  setDefaultViewContainerRef(vcRef:ViewContainerRef){
    this.defaultViewContainerRef = vcRef;
  }

  showToast(message:string, timeout?:number):Promise<MdlSnackbarComponent>{
    return this.showSnackbar({
      message: message,
      timeout: timeout
    });
  }

  showSnackbar(snackbarMessage:IMdlSnackbarMessage):Promise<MdlSnackbarComponent>{

    let optTimeout        = snackbarMessage.timeout || 2750;
    let viewContainerRef  = snackbarMessage.vcRef || this.defaultViewContainerRef;

    // TODO viewContainerRef must be set
    // TODO if actionHandler then acitonText is required


    let c = this.componentResolver.resolveComponent(MdlSnackbarComponent);
    return c.then( (cFactory)=>{

      let cRef = viewContainerRef.createComponent(cFactory);
      let mdlSnackbarComponent = cRef.instance;
      mdlSnackbarComponent.message = snackbarMessage.message;
      mdlSnackbarComponent.actionText = snackbarMessage.actionText;

      // TODO make sure only one snackbar is visible at one time
      // observable? push the configured instance and consume one after another?

      if (snackbarMessage.actionHandler){
        mdlSnackbarComponent.onAction = () =>{
          mdlSnackbarComponent.hide().then(() => {
            cRef.destroy();
            snackbarMessage.actionHandler();
          });
        }
      } else {
        setTimeout( ()=> {
          mdlSnackbarComponent.hide().then(() => {cRef.destroy()});
        }, optTimeout);
      }


      return mdlSnackbarComponent.show().then( () => {
        return mdlSnackbarComponent;
      });

    });

  }
}

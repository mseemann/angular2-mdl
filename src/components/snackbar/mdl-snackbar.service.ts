import {
  Component,
  Injectable,
  Injector,
  ViewContainerRef,
  Compiler,
  ModuleWithComponentFactories,
  ComponentFactory,
  ComponentRef,
  NgModule
} from '@angular/core';
import { MdlError } from '../common/mdl-error';
import { CommonModule } from '@angular/common';

export class MdlSnackbarError extends MdlError {
  constructor(message: string) {
    super(`${message}`);
  }
}


const ANIMATION_TIME = 250;

@Component({
  selector: 'mdl-snackbar-component',
  template: `
    <div id="demo-toast-example" class=" mdl-snackbar" [ngClass]="{'mdl-snackbar--active': showIt }">
      <div class="mdl-snackbar__text">{{message}}</div>
      <button *ngIf="onAction" class="mdl-snackbar__action" type="button" (click)="onClick()" >{{actionText}}</button>
    </div>
  `,
})
export class MdlSnackbarComponent {
  public message: string;
  public actionText: string;
  private showIt = false;
  public onAction: () => void;

  public onClick() {
    this.onAction();
  }

  public isActive() {
    return this.showIt;
  }

  public show(): Promise<void> {

    return new Promise<void>((resolve, reject) => {
      // wait unit the dom is in place - then showIt will change the css class
      setTimeout(() => {
        this.showIt = true;
        // fire after the view animation is done
        setTimeout(() => {
          resolve();
        }, ANIMATION_TIME);
      }, 1);
    });

  }

  public hide(): Promise<void> {
    this.showIt = false;
    return new Promise<void>(function(resolve, reject) {
      // fire after the view animation is done
      setTimeout(() => {
        resolve();
      }, ANIMATION_TIME);
    });
  }
}

export interface IMdlSnackbarMessage {
  message: string;
  timeout?: number;
  action?: {
    handler: () => void;
    text: string;
  };
  vcRef?: ViewContainerRef;
}

@Injectable()
export class MdlSnackbarService {

  private defaultViewContainerRef: ViewContainerRef;
  constructor(
    private injector: Injector,
    private compiler: Compiler) {
  }

  public setDefaultViewContainerRef(vcRef: ViewContainerRef) {
    this.defaultViewContainerRef = vcRef;
  }

  public showToast(message: string, timeout?: number, vcRef?: ViewContainerRef): Promise<MdlSnackbarComponent> {
    return this.showSnackbar({
      message: message,
      timeout: timeout,
      vcRef: vcRef
    });
  }

  public showSnackbar(snackbarMessage: IMdlSnackbarMessage): Promise<MdlSnackbarComponent> {

    let optTimeout        = snackbarMessage.timeout || 2750;
    let viewContainerRef  = snackbarMessage.vcRef || this.defaultViewContainerRef;

    if (!viewContainerRef) {
      throw new MdlSnackbarError('A viewContainerRef must be present. ' +
        'Wether as by setDefaultViewContainerRef or as IMdlSnackbarMessage param.');
    }

    let moduleFactories: ModuleWithComponentFactories<MdlSnackbaModule> = this.compiler
      .compileModuleAndAllComponentsSync(MdlSnackbaModule);
    let cRef: ComponentRef<MdlSnackbarComponent> = null;
    moduleFactories.componentFactories.forEach( ( cFactory: ComponentFactory<any> ) =>  {
       cRef = viewContainerRef.createComponent(cFactory);
    });

    let mdlSnackbarComponent = <MdlSnackbarComponent> cRef.instance;
    mdlSnackbarComponent.message = snackbarMessage.message;


    // TODO make sure only one snackbar is visible at one time
    // observable? push the configured instance and consume one after another?

    if (snackbarMessage.action) {
      mdlSnackbarComponent.actionText = snackbarMessage.action.text;
      mdlSnackbarComponent.onAction = () => {
        mdlSnackbarComponent.hide().then(() => {
          cRef.destroy();
          snackbarMessage.action.handler();
        });
      };
    } else {
      setTimeout( () => {
        mdlSnackbarComponent.hide().then(() => {cRef.destroy(); });
      }, optTimeout);
    }


    return mdlSnackbarComponent.show().then( () => {
      return mdlSnackbarComponent;
    });

  }
}

@NgModule({
  imports: [CommonModule],
  exports: [MdlSnackbarComponent],
  declarations: [MdlSnackbarComponent],
  providers: [MdlSnackbarService]
})
export class MdlSnackbaModule {}

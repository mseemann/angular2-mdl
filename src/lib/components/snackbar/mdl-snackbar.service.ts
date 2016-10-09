import {
  Component,
  Injectable,
  Injector,
  ViewContainerRef,
  ComponentFactoryResolver,
  NgModule,
  ViewEncapsulation,
  ModuleWithProviders, ComponentFactory
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlDialogOutletService } from '../dialog-outlet/mdl-dialog-outlet.service';
import { MdlDialogOutletModule } from '../dialog-outlet/index';


const ANIMATION_TIME = 250;

@Component({
  selector: 'mdl-snackbar-component',
  template: `
    <div id="demo-toast-example" class=" mdl-snackbar" [ngClass]="{'mdl-snackbar--active': showIt }">
      <div class="mdl-snackbar__text">{{message}}</div>
      <button *ngIf="onAction" class="mdl-snackbar__action" type="button" (click)="onClick()" >{{actionText}}</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
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
      }, 10);
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
}

@Injectable()
export class MdlSnackbarService {

  private cFactory: ComponentFactory<any>;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialogOutletService: MdlDialogOutletService) {

    this.cFactory  = this.componentFactoryResolver.resolveComponentFactory(MdlSnackbarComponent);
  }


  public showToast(message: string, timeout?: number, vcRef?: ViewContainerRef): Promise<MdlSnackbarComponent> {
    return this.showSnackbar({
      message: message,
      timeout: timeout
    });
  }

  public showSnackbar(snackbarMessage: IMdlSnackbarMessage): Promise<MdlSnackbarComponent> {

    let optTimeout        = snackbarMessage.timeout || 2750;
    let viewContainerRef  = this.dialogOutletService.viewContainerRef;

    if (!viewContainerRef) {
      throw new Error('You did not provide a ViewContainerRef. ' +
        'Please see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService');
    }


    let cRef = viewContainerRef.createComponent(this.cFactory, viewContainerRef.length);

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
  imports: [CommonModule, MdlDialogOutletModule.forRoot()],
  exports: [MdlSnackbarComponent],
  declarations: [MdlSnackbarComponent],
  entryComponents: [MdlSnackbarComponent]
})
export class MdlSnackbaModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlSnackbaModule,
      providers: [MdlSnackbarService]
    };
  }
}

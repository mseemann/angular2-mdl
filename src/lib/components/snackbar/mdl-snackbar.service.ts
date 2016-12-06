import {
  Component,
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  NgModule,
  ViewEncapsulation,
  ModuleWithProviders, ComponentFactory
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlDialogOutletService } from '../dialog-outlet/mdl-dialog-outlet.service';
import { MdlDialogOutletModule } from '../dialog-outlet/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


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

  constructor(){}

  public onClick() {
    this.onAction();
  }

  public isActive() {
    return this.showIt;
  }

  public show(): Observable<void> {
    let result: Subject<any> = new Subject();
    // wait unit the dom is in place - then showIt will change the css class
    setTimeout(() => {
      this.showIt = true;
      // fire after the view animation is done
      setTimeout(() => {
        result.next(null);
        result.complete();
      }, ANIMATION_TIME);
    }, ANIMATION_TIME);


    return result.asObservable();
  }

  public hide(): Observable<void> {
    this.showIt = false;

    let result: Subject<any> = new Subject();

    // fire after the view animation is done
    setTimeout(() => {
      result.next(null);
      result.complete();
    }, ANIMATION_TIME);


    return result.asObservable();
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
  static previousSnack: {component: MdlSnackbarComponent, cRef: ComponentRef<any>};

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialogOutletService: MdlDialogOutletService) {

    this.cFactory  = this.componentFactoryResolver.resolveComponentFactory(MdlSnackbarComponent);
  }


  public showToast(message: string, timeout?: number): Observable<MdlSnackbarComponent> {
    return this.showSnackbar({
      message: message,
      timeout: timeout
    });
  }

  public showSnackbar(snackbarMessage: IMdlSnackbarMessage): Observable<MdlSnackbarComponent> {

    let optTimeout        = snackbarMessage.timeout || 2750;
    let viewContainerRef  = this.dialogOutletService.viewContainerRef;

    if (!viewContainerRef) {
      throw new Error('You did not provide a ViewContainerRef. ' +
        'Please see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService');
    }

    let cRef = viewContainerRef.createComponent(this.cFactory, viewContainerRef.length);

    let mdlSnackbarComponent = <MdlSnackbarComponent> cRef.instance;
    mdlSnackbarComponent.message = snackbarMessage.message;

    if(MdlSnackbarService.previousSnack) {
      let previousSnack = MdlSnackbarService.previousSnack;
      let subscription = previousSnack['component'].hide()
        .subscribe(() => {
          previousSnack['cRef'].destroy();
          subscription.unsubscribe();
        });
    }

    MdlSnackbarService.previousSnack = {
      component: mdlSnackbarComponent,
      cRef: cRef
    };

    if (snackbarMessage.action) {
      mdlSnackbarComponent.actionText = snackbarMessage.action.text;
      mdlSnackbarComponent.onAction = () => {
        mdlSnackbarComponent.hide().subscribe(() => {
          cRef.destroy();
          snackbarMessage.action.handler();
        });
      };
    }
    setTimeout( () => {
      mdlSnackbarComponent.hide()
        .subscribe(() => {
          cRef.destroy();
        });
    }, optTimeout);

    let result: Subject<MdlSnackbarComponent> = new Subject<MdlSnackbarComponent>();

    mdlSnackbarComponent.show().subscribe( () => {
      result.next(mdlSnackbarComponent);
      result.complete();
    });

    return result.asObservable();
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

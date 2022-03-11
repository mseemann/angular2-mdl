import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewEncapsulation,
} from "@angular/core";
import { MdlDialogOutletService } from "../dialog-outlet/mdl-dialog-outlet.service";
import { Observable, Subject } from "rxjs";

const ANIMATION_TIME = 250;

@Component({
  selector: "mdl-snackbar-component",
  template: `
    <div
      id="demo-toast-example"
      class=" mdl-snackbar"
      [ngClass]="{ 'mdl-snackbar--active': showIt }"
    >
      <div class="mdl-snackbar__text">{{ message }}</div>
      <button
        *ngIf="onAction"
        class="mdl-snackbar__action"
        type="button"
        (click)="onClick()"
      >
        {{ actionText }}
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MdlSnackbarComponent {
  message: string | undefined;
  actionText: string | undefined;
  showIt = false;
  onAction: (() => void) | undefined;

  onClick(): void {
    this.onAction?.();
  }

  isActive(): boolean {
    return this.showIt;
  }

  show(): Observable<void> {
    const result: Subject<void> = new Subject();
    // wait unit the dom is in place - then showIt will change the css class
    setTimeout(() => {
      this.showIt = true;
      // fire after the view animation is done
      setTimeout(() => {
        result.next();
        result.complete();
      }, ANIMATION_TIME);
    }, ANIMATION_TIME);

    return result.asObservable();
  }

  hide(): Observable<void> {
    this.showIt = false;

    const result: Subject<void> = new Subject();

    // fire after the view animation is done
    setTimeout(() => {
      result.next();
      result.complete();
    }, ANIMATION_TIME);

    return result.asObservable();
  }
}

export interface IMdlSnackbarMessage {
  message: string;
  timeout?: number;
  closeAfterTimeout?: boolean;
  action?: {
    handler: () => void;
    text: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class MdlSnackbarService {
  private readonly cFactory: ComponentFactory<MdlSnackbarComponent>;
  private previousSnack:
    | {
        component: MdlSnackbarComponent;
        cRef: ComponentRef<MdlSnackbarComponent>;
      }
    | undefined;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialogOutletService: MdlDialogOutletService
  ) {
    this.cFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        MdlSnackbarComponent
      );
  }

  showToast(
    message: string,
    timeout?: number
  ): Observable<MdlSnackbarComponent> {
    return this.showSnackbar({
      message,
      timeout,
    });
  }

  showSnackbar(
    snackbarMessage: IMdlSnackbarMessage
  ): Observable<MdlSnackbarComponent> {
    const optTimeout = snackbarMessage.timeout || 2750;
    const closeAfterTimeout = !!snackbarMessage.closeAfterTimeout;
    const viewContainerRef = this.dialogOutletService.viewContainerRef;

    if (!viewContainerRef) {
      throw new Error(
        "You did not provide a ViewContainerRef. " +
          "Please see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService"
      );
    }

    const cRef = viewContainerRef.createComponent(
      this.cFactory,
      viewContainerRef.length
    );

    const mdlSnackbarComponent = cRef.instance as MdlSnackbarComponent;
    mdlSnackbarComponent.message = snackbarMessage.message;

    if (this.previousSnack) {
      const previousSnack = this.previousSnack;
      const subscription = previousSnack.component.hide().subscribe(() => {
        previousSnack.cRef.destroy();
        subscription.unsubscribe();
      });
    }

    this.previousSnack = {
      component: mdlSnackbarComponent,
      cRef,
    };

    if (snackbarMessage.action) {
      if (closeAfterTimeout) {
        this.hideAndDestroySnack(mdlSnackbarComponent, cRef, optTimeout);
      }
      mdlSnackbarComponent.actionText = snackbarMessage.action.text;
      mdlSnackbarComponent.onAction = () => {
        mdlSnackbarComponent.hide().subscribe(() => {
          cRef.destroy();
          snackbarMessage.action?.handler();
        });
      };
    } else {
      this.hideAndDestroySnack(mdlSnackbarComponent, cRef, optTimeout);
    }

    const result: Subject<MdlSnackbarComponent> =
      new Subject<MdlSnackbarComponent>();

    mdlSnackbarComponent.show().subscribe(() => {
      result.next(mdlSnackbarComponent);
      result.complete();
    });

    return result.asObservable();
  }

  private hideAndDestroySnack(
    component: MdlSnackbarComponent,
    componentRef: ComponentRef<MdlSnackbarComponent>,
    timeOut: number
  ) {
    setTimeout(() => {
      component.hide().subscribe(() => {
        componentRef.destroy();
      });
    }, timeOut);
  }
}

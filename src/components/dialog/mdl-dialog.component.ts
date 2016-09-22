import {
  Component,
  ViewEncapsulation,
  HostListener,
  forwardRef,
  Inject,
  ViewContainerRef,
} from '@angular/core';
import {
  IMdlDialogAction,
  MdlDialogReference,
  IMdlDialogConfiguration
} from './mdl-dialog.service';

// @experimental
@Component({
  selector: 'mdl-dialog-component',
  host: {
    '[class.mdl-dialog]': 'true',
    '[class.open]': 'true',
    '[class.fixed]': 'true'
  },
  template: `
      <div 
        *ngIf="customDialogViewContainerRef" 
        [append-view-container-ref]="customDialogViewContainerRef"></div>
      <div *ngIf="!customDialogViewContainerRef">
        <h3 class="mdl-dialog__title" *ngIf="dialogConfiguration?.title">{{dialogConfiguration?.title}}</h3>
        <div class="mdl-dialog__content">
          <p>
            {{dialogConfiguration?.message}}
          </p>
        </div>
        <div 
          class="mdl-dialog__actions" 
          [ngClass]="{'mdl-dialog__actions--full-width': dialogConfiguration?.fullWidthAction}">
          <button 
            type="button" 
            class="mdl-button mdl-color-text--primary" 
            *ngFor="let action of dialogConfiguration?.actions" 
            (click)="actionClicked(action)"
            [ngClass]="{'close': action.isClosingAction}">{{action.text}}</button>
        </div>
      </div>
  `,
  styles: [
    `
    mdl-dialog-component {
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
    }
    
    mdl-dialog-component.open {
      display: block;
    }
    
    mdl-dialog-component.fixed {
      position: fixed;
      top: 50%;
      transform: translate(0, -50%);
    }
    
    .dialog-backdrop {
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      background: rgba(0,0,0,0.1);
    }

    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class MdlDialogComponent {

  public dialogConfiguration: IMdlDialogConfiguration;
  public customDialogViewContainerRef: ViewContainerRef;

  // why do i need forwardRef at this point, the demo LoginDialog dosn't need this!?!?
  constructor(
    @Inject(forwardRef( () => MdlDialogReference)) private dialog: MdlDialogReference) {}


  public actionClicked(action: IMdlDialogAction) {
    action.handler();
    this.dialog.hide();
  }

  // TODO this will only work if the dialog has the focus
  // TODO Docu: of you create a custom dialog you need to implement this functionality by yourself.
  @HostListener('keydown.esc')
  protected onEsc(): void {
    // TODO really bas design - may be two different dialog components?
    let actions: [IMdlDialogAction] = (<any>this.dialogConfiguration).actions;
    // run the first aciton that is marked as closing action
    if ( actions ) {
      let closeAction = actions.find( action => action.isClosingAction);
      if (closeAction) {
        closeAction.handler();
      }
      this.dialog.hide();
    }
  }

}

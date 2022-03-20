import {
  Component,
  forwardRef,
  HostListener,
  Inject,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import { MDL_CONFIGUARTION } from "./config";
import {
  IMdlDialogAction,
  IMdlSimpleDialogConfiguration,
} from "./mdl-dialog-configuration";
import { MdlButtonComponent } from "../button/mdl-button.component";
import { MdlDialogReference } from "./mdl-dialog-reference";

@Component({
  selector: "mdl-dialog-component",
  template: `
    <h3 class="mdl-dialog__title" *ngIf="dialogConfiguration?.title">
      {{ dialogConfiguration?.title }}
    </h3>
    <div
      class="mdl-dialog__content"
      [innerHTML]="dialogConfiguration?.message"
    ></div>
    <div
      class="mdl-dialog__actions"
      [ngClass]="{
        'mdl-dialog__actions--full-width': dialogConfiguration?.fullWidthAction
      }"
    >
      <button
        mdl-button
        mdl-colored="primary"
        type="button"
        *ngFor="let action of dialogConfiguration?.actions"
        (click)="actionClicked(action)"
        [ngClass]="{ close: action.isClosingAction }"
      >
        {{ action.text }}
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MdlSimpleDialogComponent {
  @ViewChildren(MdlButtonComponent)
  buttons: QueryList<MdlButtonComponent> | undefined;

  // why do i need forwardRef at this point, the demo LoginDialog dosn't need this!?!?
  constructor(
    @Inject(forwardRef(() => MDL_CONFIGUARTION))
    public dialogConfiguration: IMdlSimpleDialogConfiguration,
    @Inject(forwardRef(() => MdlDialogReference))
    public dialog: MdlDialogReference
  ) {
    this.dialog = dialog;

    dialog.onVisible().subscribe(() => {
      if (this.buttons) {
        this.buttons.first.elementRef.nativeElement.focus();
      }
    });
  }

  @HostListener("keydown.esc")
  onEsc(): void {
    // run the first action that is marked as closing action
    const closeAction = this.dialogConfiguration.actions.find(
      (action) => action.isClosingAction
    );
    if (closeAction) {
      closeAction.handler();
      this.dialog.hide();
    }
  }

  actionClicked(action: IMdlDialogAction): void {
    action.handler();
    this.dialog.hide();
  }
}

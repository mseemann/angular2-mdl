import {
  Component,
  Directive,
  HostBinding,
  OnInit,
  Optional,
  ViewEncapsulation,
} from "@angular/core";
import { MdlStructureError } from "../common/mdl-error";

@Component({
  selector: "mdl-card",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlCardComponent {
  @HostBinding("class.mdl-card") isCard = true;
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MdlCardChildStructure implements OnInit {
  constructor(
    private mdlCardComponent: MdlCardComponent,
    private childComponentName: string
  ) {}

  ngOnInit(): void {
    if (this.mdlCardComponent === null) {
      throw new MdlStructureError(this.childComponentName, "mdl-card");
    }
  }
}

@Component({
  selector: "mdl-card-title",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlCardTitleComponent extends MdlCardChildStructure {
  @HostBinding("class.mdl-card__title")
  isCardTitle = true;

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, "mdl-card-title");
  }
}

@Component({
  selector: "mdl-card-supporting-text",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlCardSupportingTextComponent extends MdlCardChildStructure {
  @HostBinding("class.mdl-card__supporting-text")
  isSupportingText = true;

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, "mdl-card-supporting-text");
  }
}

@Component({
  selector: "mdl-card-media",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlCardMediaComponent extends MdlCardChildStructure {
  @HostBinding("class.mdl-card__media")
  isCardMedia = true;

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, "mdl-card-media");
  }
}

@Component({
  selector: "mdl-card-actions",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlCardActionsComponent extends MdlCardChildStructure {
  @HostBinding("class.mdl-card__actions")
  isCardAction = true;

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, "mdl-card-actions");
  }
}

@Component({
  selector: "mdl-card-menu",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlCardMenuComponent extends MdlCardChildStructure {
  @HostBinding("class.mdl-card__menu")
  isCardMenu = true;

  constructor(@Optional() mdlCardComponent: MdlCardComponent) {
    super(mdlCardComponent, "mdl-card-menu");
  }
}

@Directive({
  // eslint-disable-next-line
  selector: '[mdl-card-title-text]'
})
export class MdlCardTitleTextDirective {
  @HostBinding("class.mdl-card__title-text")
  isCardTitleText = true;
}

@Directive({
  // eslint-disable-next-line
  selector: '[mdl-card-border]'
})
export class MdlCardBorderDirective {
  @HostBinding("class.mdl-card--border")
  isCardBorder = true;
}

@Directive({
  // eslint-disable-next-line
  selector: '[mdl-card-expand]'
})
export class MdlCardExpandDirective {
  @HostBinding("class.mdl-card--expand")
  isCardExpand = true;
}

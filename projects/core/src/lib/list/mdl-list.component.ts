import {
  Component,
  Directive,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Optional,
  ViewEncapsulation,
} from "@angular/core";
import { MdlError, MdlStructureError } from "../common/mdl-error";
import { toNumber } from "../common/number.property";

export class MdlUnsupportedCountOfListItemLinesError extends MdlError {
  constructor(lines: number | string) {
    /* istanbul ignore next */
    super(`"${lines}" is not supported - max 3 lines please.`);
  }
}

@Component({
  selector: "mdl-list",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlListComponent {
  @HostBinding("class.mdl-list")
  isMdlList = true;
}

@Component({
  selector: "mdl-list-item",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlListItemComponent implements OnChanges {
  @HostBinding("class.mdl-list__item")
  isMdlListItem = true;

  private linesIntern = 1;

  @Input()
  get lines(): number {
    return this.linesIntern;
  }

  set lines(value: number) {
    this.linesIntern = toNumber(value);
  }

  @HostBinding("class.mdl-list__item--two-line") get lines2(): boolean {
    return this.lines === 2;
  }

  @HostBinding("class.mdl-list__item--three-line") get lines3(): boolean {
    return this.lines === 3;
  }

  ngOnChanges(): void {
    if (this.lines && this.lines > 3) {
      throw new MdlUnsupportedCountOfListItemLinesError(this.lines);
    }
  }
}

@Component({
  selector: "mdl-list-item-primary-content",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlListItemPrimaryContentComponent implements OnInit {
  @HostBinding("class.mdl-list__item-primary-content")
  isPrimaryContent = true;

  constructor(@Optional() private mdlListItemComponent: MdlListItemComponent) {}

  ngOnInit(): void {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError(
        "mdl-list-item-primary-content",
        "mdl-list-item"
      );
    }
  }
}

@Component({
  selector: "mdl-list-item-secondary-content",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlListItemSecondaryContentComponent implements OnInit {
  @HostBinding("class.mdl-list__item-secondary-content")
  isSecondaryContent = true;

  constructor(@Optional() private mdlListItemComponent: MdlListItemComponent) {}

  ngOnInit(): void {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError(
        "mdl-list-item-secondary-content",
        "mdl-list-item"
      );
    }
  }
}

@Component({
  selector: "mdl-list-item-secondary-action",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlListItemSecondaryActionComponent implements OnInit {
  @HostBinding("class.mdl-list__item-secondary-action")
  isSecondaryAction = true;

  constructor(@Optional() private mdlListItemComponent: MdlListItemComponent) {}

  ngOnInit(): void {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError(
        "mdl-list-item-secondary-action",
        "mdl-list-item"
      );
    }
  }
}

@Component({
  selector: "mdl-list-item-sub-title",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlListItemSubTitleComponent implements OnInit {
  @HostBinding("class.mdl-list__item-sub-title")
  isSubTitle = true;

  constructor(
    @Optional() private mdlListItemComponent: MdlListItemPrimaryContentComponent
  ) {}

  ngOnInit(): void {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError(
        "mdl-list-item-sub-title",
        "mdl-list-item-primary-content"
      );
    }
  }
}

@Component({
  selector: "mdl-list-item-secondary-info",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlListItemSecondaryInfoComponent implements OnInit {
  @HostBinding("class.mdl-list__item-secondary-info")
  isSecondaryInfo = true;

  constructor(
    @Optional()
    private mdlListItemComponent: MdlListItemSecondaryContentComponent
  ) {}

  ngOnInit(): void {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError(
        "mdl-list-item-secondary-info",
        "mdl-list-item-secondary-content"
      );
    }
  }
}

@Component({
  selector: "mdl-list-item-text-body",
  template: "<ng-content></ng-content>",
  encapsulation: ViewEncapsulation.None,
})
export class MdlListItemTextBodyComponent implements OnInit {
  @HostBinding("class.mdl-list__item-text-body")
  isTextBody = true;

  constructor(@Optional() private mdlListItemComponent: MdlListItemComponent) {}

  ngOnInit(): void {
    if (this.mdlListItemComponent === null) {
      throw new MdlStructureError("mdl-list-item-text-body", "mdl-list-item");
    }
  }
}

@Directive({
  // eslint-disable-next-line
  selector: 'mdl-icon[mdl-list-item-icon]'
})
export class MdlListItemIconDirective {
  @HostBinding("class.mdl-list__item-icon")
  isItemIcon = true;
}

@Directive({
  // eslint-disable-next-line
  selector: 'mdl-icon[mdl-list-item-avatar]'
})
export class MdlListItemAvatarDirective {
  @HostBinding("class.mdl-list__item-avatar")
  isItemAvatar = true;
}

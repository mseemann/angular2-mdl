import {Component, ElementRef, forwardRef, HostBinding, Renderer2, ViewEncapsulation} from '@angular/core';

import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {MdlCheckboxComponent} from '../checkbox/mdl-checkbox.component';

@Component({
  selector: 'mdl-switch',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdlSwitchComponent),
    multi: true
  }],
  template: `
    <input type="checkbox" class="mdl-switch__input"
           (focus)="onFocus()"
           (blur)="onBlur()"
           [disabled]="disabled"
           [(ngModel)]="value">
    <span class="mdl-switch__label"><ng-content></ng-content></span>
    <div class="mdl-switch__track"></div>
    <div class="mdl-switch__thumb"><span class="mdl-switch__focus-helper"></span></div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlSwitchComponent extends MdlCheckboxComponent {

  @HostBinding('class.mdl-switch') isSwitch = true;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(elementRef, renderer);
    this.isCheckbox = false;
  }

}


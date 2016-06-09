import { Component, ViewEncapsulation } from '@angular/core';
import { MDL_DIRECTIVES } from 'angular2-mdl';
import { FORM_DIRECTIVES } from "@angular/common";
import { Prism } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'button-demo',
  templateUrl: 'button.component.html',
  directives: [
    MDL_DIRECTIVES,
    Prism
  ],
})
export class ButtonDemo {
  public buttonType = 'raised';
}

import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'list-demo',
  templateUrl: 'list.component.html',
  styles: [
`
  mdl-list {
    width: 300px;
  }
  
  mdl-radio, mdl-checkbox, mdl-switch {
    display: inline;
  }
`
  ]
})
export class ListDemo {}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mdl-fab-menu',
  templateUrl: 'fab-menu.component.html',
  styleUrls: ['fab-menu.component.scss']
})
export class MdlFabMenuComponent implements OnInit {

  @Input()
  alwaysShowTooltips: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}

import {Component} from '@angular/core';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractDemoComponent} from '../abstract-demo.component';

@Component({
  selector: 'demo-menu-demo',
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'menu.component.html',
  styles: [
    `
      :host {
        flex-grow: 1;
      }

      .container {
        width: 200px;
        height: 212px;
        position: relative;
        margin: auto;
      }

      .bar {
        box-sizing: border-box;
        color: white;
        width: 100%;
        padding: 16px;
        height: 64px;
      }

      .top-right {
        position: absolute;
        box-sizing: border-box;
        right: 16px;
      }

      .background {
        background: white;
        height: 148px;
        width: 100%;
      }
    `
  ]
})
export class MenuDemoComponent extends AbstractDemoComponent {

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public action(): void {
    console.log('action clicked');
  }
}

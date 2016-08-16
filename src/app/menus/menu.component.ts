import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'menu-demo',
  templateUrl: 'menu.component.html',
  styles: [
    `
     :host {
        flex-grow: 1;
     }
     .container {
        width:200px;
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
     .top-right{
        position:absolute;
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
export class MenuDemo {
  public action() {
    console.log('action clicked');
  }
}

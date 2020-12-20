import { Component } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";

@Component({
  selector: "demo-list",
  animations: [flyInOutTrigger],
  templateUrl: "list.component.html",
  styles: [
    `
      mdl-list {
        width: 300px;
      }

      mdl-radio,
      mdl-checkbox,
      mdl-switch {
        display: inline;
      }
    `,
  ],
})
export class ListDemoComponent extends AbstractDemoComponent {
  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}

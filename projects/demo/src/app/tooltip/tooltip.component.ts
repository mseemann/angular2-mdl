import { Component } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";

@Component({
  selector: "demo-tooltip",
  animations: [flyInOutTrigger],
  templateUrl: "tooltip.component.html",
  styles: [
    `
      .tooltip-demo-container {
        text-align: center;
      }
    `,
  ],
})
export class TooltipDemoComponent extends AbstractDemoComponent {
  tt1 = "Follow";

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}

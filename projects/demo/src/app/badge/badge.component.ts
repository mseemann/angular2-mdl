import { Component } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";

@Component({
  selector: "demo-badge",
  animations: [flyInOutTrigger],
  templateUrl: "badge.component.html",
})
export class BadgeDemoComponent extends AbstractDemoComponent {
  badgeCount = 1;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}

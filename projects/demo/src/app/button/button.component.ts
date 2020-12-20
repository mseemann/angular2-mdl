import { Component } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";

@Component({
  selector: "demo-button",
  animations: [flyInOutTrigger],
  templateUrl: "button.component.html",
})
export class ButtonDemoComponent extends AbstractDemoComponent {
  public buttonType = "raised";
  public doRipple = false;
  public colored = "";
  public btnDisabled = false;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }
}

import { Component, ViewEncapsulation } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";
import { MdlScreenSizeService } from "@angular-mdl/core";

@Component({
  selector: "demo-layout",
  animations: [flyInOutTrigger],
  templateUrl: "layout.component.html",
  styleUrls: ["layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutDemoComponent extends AbstractDemoComponent {
  public activeIndex = 0;

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title,
    mdlScreenSizeService: MdlScreenSizeService
  ) {
    super(router, route, titleService);

    mdlScreenSizeService.sizes().subscribe((isSmall) => {
      console.log(`is ${isSmall ? "small" : "large"} screen`);
    });
  }

  public tabChanged({ index }: { index: number }): void {
    this.activeIndex = index;
    console.log(`tabChanged: ${index}`);
  }

  public tabMouseover({ index }: { index: number }): void {
    console.log(`mouseover: ${index}`);
  }

  public tabMouseout({ index }: { index: number }): void {
    console.log(`mouseout: ${index}`);
  }
}

@Component({
  selector: "demo-layout-0",
  template: "",
})
export class Layout0DemoComponent {}

@Component({
  selector: "demo-layout-1",
  template: "<div>Link 1 content</div>",
})
export class Layout1DemoComponent {}

@Component({
  selector: "demo-layout-2",
  template: "<div>Link 2 content</div>",
})
export class Layout2DemoComponent {}

@Component({
  selector: "demo-layout-3",
  template: "<div>Link 3 content</div>",
})
export class Layout3DemoComponent {}

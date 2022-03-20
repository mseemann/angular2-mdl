import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { flyInOutTrigger } from "../animations/flyInOutTrigger-animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AbstractDemoComponent } from "../abstract-demo.component";

@Component({
  selector: "demo-tabs",
  animations: [flyInOutTrigger],
  templateUrl: "tabs.component.html",
  styles: [
    `
      .demo-tab-container {
        display: inline-block;
      }

      mdl-icon {
        vertical-align: middle;
      }

      .mdl-tabs__tab {
        cursor: pointer;
      }

      .demo-toggle-disabled-container mdl-switch {
        margin: 5px 0;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TabsDemoComponent extends AbstractDemoComponent implements OnInit {
  disableTargaryens = false;
  disableBaratheon = false;

  public activeIndex = 0;
  public myArray: string[] = [];

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public tabChanged({ index }: { index: number }): void {
    this.activeIndex = index;
  }

  override ngOnInit(): void {
    // Simulates a later change of tabs
    setTimeout(() => {
      this.myArray = ["a", "b", "c"];
    }, 1000);
  }
}

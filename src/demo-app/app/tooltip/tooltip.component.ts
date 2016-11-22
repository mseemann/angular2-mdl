import { Component, ViewChild, ElementRef } from '@angular/core';
import { flyInOutTrigger, hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';
import { MdlTooltipComponent } from '../../../lib/components/tooltip/mdl-tooltip.component';

@Component({
  selector: 'tooltip-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'tooltip.component.html',
  styles: [
    `
    .tooltip-demo-container {
      text-align: center;
    }
    `
  ]
})
export class TooltipDemo extends AbstractDemoComponent {
  protected tt1 = 'Follow';

  @ViewChild('tipTarget', {read: ElementRef}) tipTarget;

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  public toggleTooltip(tooltip: MdlTooltipComponent){
    tooltip.position = 'right';
    if ( tooltip.isActive() ){
      tooltip.hide();
    } else {
      tooltip.show(this.tipTarget.nativeElement);
    }
  }
}

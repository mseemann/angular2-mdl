import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Directive, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Directive()
// eslint-disable-next-line
export class AbstractDemoComponent implements OnInit, OnDestroy {
  @HostBinding("style.display") style = "block";
  private sub: Subscription;
  private windowTitle = "angular2-mdl";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  @HostBinding("@flyInOut")
  private get slideIn(): boolean {
    return true;
  }

  public ngOnInit(): void {
    this.titleService.setTitle(this.windowTitle);
    this.sub = this.router.events.subscribe(() => {
      if (this.route.snapshot.data && this.route.snapshot.data.title) {
        const title = this.windowTitle + " - " + this.route.snapshot.data.title;
        this.titleService.setTitle(title);
      } else {
        this.titleService.setTitle(this.windowTitle);
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

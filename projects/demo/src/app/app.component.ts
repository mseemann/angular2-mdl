import { Component, ViewEncapsulation } from "@angular/core";
import { MdlLayoutComponent } from "@angular-mdl/core";

@Component({
  selector: "demo-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "Angular - Material Design Lite";

  componentSelected(mainLayout: MdlLayoutComponent): void {
    mainLayout.closeDrawerOnSmallScreens();
  }
}

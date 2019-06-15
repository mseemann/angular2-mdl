import {Injectable} from '@angular/core';
import {MdlLayoutTabPanelComponent} from './mdl-layout-tab-panel.component';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MdlLayoutMediatorService {

  private tabMouseoverSubject = new Subject<MdlLayoutTabPanelComponent>();
  private tabMouseoutSubject = new Subject<MdlLayoutTabPanelComponent>();
  private tabSelectedSubject = new Subject<MdlLayoutTabPanelComponent>();

  onTabMouseover() {
    return this.tabMouseoverSubject.asObservable();
  }

  tabMouseover(tab: MdlLayoutTabPanelComponent) {
    this.tabMouseoverSubject.next(tab);
  }

  onTabMouseOut() {
    return this.tabMouseoutSubject.asObservable();
  }

  tabMouseout(tab: MdlLayoutTabPanelComponent) {
    this.tabMouseoutSubject.next(tab);
  }

  onTabSelected() {
    return this.tabSelectedSubject.asObservable();
  }

  tabSelected(tab: MdlLayoutTabPanelComponent) {
    this.tabSelectedSubject.next(tab);
  }
}

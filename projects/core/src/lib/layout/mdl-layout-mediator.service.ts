import {Injectable} from '@angular/core';
import {MdlLayoutTabPanelComponent} from './mdl-layout-tab-panel.component';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MdlLayoutMediatorService {

  private tabMouseoverSubject = new Subject<MdlLayoutTabPanelComponent>();
  private tabMouseoutSubject = new Subject<MdlLayoutTabPanelComponent>();
  private tabSelectedSubject = new Subject<MdlLayoutTabPanelComponent>();

  onTabMouseover(): Observable<MdlLayoutTabPanelComponent> {
    return this.tabMouseoverSubject.asObservable();
  }

  tabMouseover(tab: MdlLayoutTabPanelComponent): void {
    this.tabMouseoverSubject.next(tab);
  }

  onTabMouseOut(): Observable<MdlLayoutTabPanelComponent> {
    return this.tabMouseoutSubject.asObservable();
  }

  tabMouseout(tab: MdlLayoutTabPanelComponent): void {
    this.tabMouseoutSubject.next(tab);
  }

  onTabSelected(): Observable<MdlLayoutTabPanelComponent> {
    return this.tabSelectedSubject.asObservable();
  }

  tabSelected(tab: MdlLayoutTabPanelComponent): void {
    this.tabSelectedSubject.next(tab);
  }
}

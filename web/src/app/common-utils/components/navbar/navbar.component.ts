import { Component } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { Observable } from 'rxjs';
import { UiState } from '../../../models/ui.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  collapsedObservable$!: Observable<UiState>;

  constructor(private uiSrv: UiService) {
    this.collapsedObservable$ = uiSrv.menuCollapsedSubject$
  }

  toggleMenu(): void {
    this.uiSrv.toggleMenu();
  }

}

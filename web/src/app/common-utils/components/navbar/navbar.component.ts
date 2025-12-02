import { Component, OnDestroy } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { Subscription } from 'rxjs';
import { UiState } from '../../../models/ui.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent implements OnDestroy {

  navbarStatus: UiState = UiState.full;

  collapsedStatusSubscription?: Subscription;

  constructor(private uiSrv: UiService) {
    this.collapsedStatusSubscription = this.uiSrv.menuCollapsedSubject$.subscribe({
      next: (state) => {
        this.navbarStatus = state;
      }
    })
  }

  toggleMenu(): void {
    this.uiSrv.toggleMenu();
  }

  ngOnDestroy(): void {
      this.collapsedStatusSubscription?.unsubscribe();
  }

}

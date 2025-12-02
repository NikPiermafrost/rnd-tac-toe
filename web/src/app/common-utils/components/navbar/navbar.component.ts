import { Component, OnDestroy, inject } from '@angular/core';
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
  private uiSrv = inject(UiService);


  navbarStatus: UiState = UiState.full;

  collapsedStatusSubscription?: Subscription;

  constructor() {
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

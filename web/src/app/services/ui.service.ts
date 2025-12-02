import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UiState } from '../models/ui.model';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isMenuCollapsed: UiState = UiState.full;
  menuCollapsedSubject$ : BehaviorSubject<UiState> = new BehaviorSubject<UiState>(this.isMenuCollapsed);

  constructor() { }

  toggleMenu(): void {
    if (this.isMenuCollapsed === UiState.collapsed) {
      this.isMenuCollapsed = UiState.full;
    } else {
      this.isMenuCollapsed = UiState.collapsed;
    }
    this.menuCollapsedSubject$.next(this.isMenuCollapsed);
  }
}

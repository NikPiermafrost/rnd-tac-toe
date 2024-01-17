import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainLayoutComponent],
  template: '<app-main-layout><router-outlet></router-outlet></app-main-layout>',
  styles: []
})
export class AppComponent {
  title = 'client';
}

import { Component, inject } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  template: `
    <main class="h-screen">
    <div class="flex lg:justify-start justify-center">
      <app-navbar></app-navbar>
      <section id="content" class="w-full">
        <header class="flex justify-center my-4">
          <div class="p-4 text-center" (click)="goToHome()">
            <h1 class="text-5xl mb-1">Rnd Tac Toe</h1>
          </div>
        </header>
        <section id="body">
          <ng-content></ng-content>
        </section>
        <app-footer></app-footer>
      </section>
    </div>
  </main>
  `,
  styles: ``
})
export class MainLayoutComponent {
  private router = inject(Router);

  goToHome() {
    this.router.navigate(['/']);
  }
}

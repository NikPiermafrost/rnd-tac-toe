import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../config/oauth.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1 class="text-5xl">Tailwind!</h1>
    <router-outlet />
    <button class="rounded bg-black text-white px-4 py-2 cursor-pointer" (click)="login()">Login?</button>
  `,
  styles: ``
})
export class AppComponent {
  title = 'client';
  oauthService = inject(OAuthService);

  constructor() {
    this.oauthService.configure(authCodeFlowConfig);
    // this.oauthService.setupAutomaticSilentRefresh();
  }

  login() {
    this.oauthService.initLoginFlow();
  }
}

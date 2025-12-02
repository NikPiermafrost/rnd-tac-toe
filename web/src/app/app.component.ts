import { Component } from '@angular/core';
import { LayoutComponent } from './common-utils/components/layout/layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [LayoutComponent, RouterOutlet]
})
export class AppComponent {
  title = 'web';
}

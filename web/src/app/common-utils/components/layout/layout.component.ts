import { Component, OnInit, inject } from '@angular/core';
import {Router} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [NavbarComponent, FooterComponent]
})
export class LayoutComponent implements OnInit {
  private router = inject(Router);


  motd: string = '';

  private readonly messages: string[] = [
    'Bruh',
    'Oopsie woopsie u did a f*cky wucky OwO',
    'CANNOT >;))',
    'F*CK THIS.',
    'OBJECTION!',
    'PRANK\'D',
    '>Implying it does what you asked',
    'Oh no',
  ]

  ngOnInit(): void {
    this.motd = this.messages[this.getMotd()];
  }

  getMotd(): number {
    return Math.floor(Math.random() * this.messages.length);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

}

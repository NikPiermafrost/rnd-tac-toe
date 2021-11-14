import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    this.motd = this.messages[this.getMotd()];
  }

  getMotd(): number {
    return Math.floor(Math.random() * this.messages.length);
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="p-4 text-center mb-28">
    <a class="cursor-pointer text-2xl underline" href="https://github.com/NikPiermafrost/rnd-tac-toe">Github</a><br />
    <a class="cursor-pointer text-2xl underline" routerLink="/about">About this project</a><br />
    <a class="cursor-pointer text-2xl underline" href="https://nicolapiermattei.net">Personal Site</a><br />
    <a class="cursor-pointer text-2xl underline" href="https://www.linkedin.com/in/nicola-piermattei-9ba4a41a1/">Linkedin</a><br />
    <span>©2021 Nicola Piermattei</span>
  </footer>
  `,
  styles: ``
})
export class FooterComponent {

}

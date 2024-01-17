import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  template: `
    <nav class="min-w-max h-screen shadow-lg shadow-gray-800 hidden lg:block bg-darkBlue">
      <div class="p-3 w-44" >
        <a class="rounded-lg border-2 border-blue mb-4 px-3 py-2 hover:border-yellow hover:border-2 cursor-pointer block" routerLink="home">
          <i class="fas fa-home mr-1"></i> Home
        </a>
        <a class="rounded-lg border-2 border-blue mb-4 px-3 py-2 hover:border-yellow hover:border-2 cursor-pointer block" routerLink="new-game">
          <i class="fas fa-plus-circle mr-1"></i> New Game
        </a>
        <a class="rounded-lg border-2 border-blue mb-4 px-3 py-2 hover:border-yellow hover:border-2 cursor-pointer block" routerLink="join-game">
          <i class="fas fa-play-circle mr-1"></i> Join Game
        </a>
      </div>
    </nav>
    <nav class="lg:hidden flex justify-between fixed bottom-0 w-screen border-t-yellow border-t-2 p-3 bg-darkBlue">
      <a routerLink="home" class="rounded-lg border-2 border-blue text-xl px-3 py-2 cursor-pointer">
        <i class="fas fa-home"></i>
      </a>
      <a routerLink="new-game" class="rounded-lg border-2 border-blue text-xl px-3 py-2 cursor-pointer">
        <i class="fas fa-plus-circle"></i>
      </a>
      <a routerLink="join-game" class="rounded-lg border-2 border-blue text-xl px-3 py-2 cursor-pointer">
        <i class="fas fa-play-circle"></i>
      </a>
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinGameRoutingModule } from './join-game-routing.module';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [JoinGameComponent],
  imports: [
    CommonModule,
    JoinGameRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JoinGameModule { }

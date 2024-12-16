import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewGameRoutingModule } from './new-game-routing.module';
import { NewGameComponent } from './components/new-game/new-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewGameComponent
  ],
  imports: [
    CommonModule,
    NewGameRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewGameModule { }

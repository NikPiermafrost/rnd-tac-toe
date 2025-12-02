import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinGameRoutingModule } from './join-game-routing.module';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        JoinGameRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        JoinGameComponent
    ]
})
export class JoinGameModule { }
